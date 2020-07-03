import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { PostElement } from '../model/post.model';
import { DeleteItemComponent } from './delete-item/delete-item.component';
import { EditItemComponent } from './edit-item/edit-item.component';
import { PurchaseElement } from '../model/PurchaseElement.model';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-list-item',
    templateUrl: './list-item.component.html',
    styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {
    dataSource: MatTableDataSource<PostElement>;
    dataList: PostElement[] = null;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['imageURL', 'purchaseId', 'postId', 'sellerName', 'buyerName', 'unitPrice', 'purchaseNumber', 'dateOfOrder', 'statusPurchase', 'edit', 'delete'];
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    constructor(private modalService: NgbModal, private changeDetectorRefs: ChangeDetectorRef, private endpointFactory: EndpointFactory) {

    }
    ngOnInit() {
        this.setData();
    }
    setData() {
        this.loadData();
        this.setDataSource();
    }
    loadData() {
        this.endpointFactory.getEndPoint('purchases').subscribe(data => {
            if (data.status === 'success') {
                const temp = [];
                data.data.forEach((element, index) => {
                    const post = new PurchaseElement();
                    post.purchaseId = element.id;
                    post.postId = element.post.id;
                    post.postName = element.post.postName;
                    post.sellerName = element.post.user.userName;
                    post.buyerName = element.buyer.userName;
                    post.unitPrice = element.post.unitPrice;
                    post.purchaseNumber = element.purchaseNumber;
                    post.statusPurchase = element.statusPurchase;
                    post.dateOfOrder = new Date(element.dateOfOrder[0], element.dateOfOrder[1], element.dateOfOrder[2]);
                    post.imageURL = element.post.imagePosts[0].url;
                    temp.push(post);
                });
                this.dataList = temp;
            }
        });
    }
    setDataSource() {
        setTimeout(() => {
            this.dataSource = new MatTableDataSource(this.dataList);
            this.dataSource.sort = this.sort;
            this.dataSource.paginator = this.paginator;
        }, 2000);

    }
    deleteItem(element: any) {
        const modalRef = this.modalService.open(DeleteItemComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
        modalRef.componentInstance.data = { data: element }
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.setData();
            }
        });
    }

    editItem(element: any) {
        const modalRef = this.modalService.open(EditItemComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        modalRef.componentInstance.data = { data: element, type: 'edit' };
        modalRef.componentInstance.output.subscribe((res) => {
            if (res === 'success') {
                this.setData();
            }
        });
    }

    searcPost(search: string) {
        this.endpointFactory.getEndPoint('purchases/search?keySearch=' + search).subscribe(data => {
            if (data.status === 'success') {
                const temp = [];
                data.data.forEach((element, index) => {
                    const post = new PurchaseElement();
                    post.purchaseId = element.id;
                    post.postId = element.post.id;
                    post.sellerName = element.post.user.userName;
                    post.buyerName = element.buyer.userName;
                    post.unitPrice = element.post.unitPrice;
                    post.purchaseNumber = element.purchaseNumber;
                    post.statusPurchase = element.statusPurchase;
                    post.dateOfOrder = new Date(element.dateOfOrder[0], element.dateOfOrder[1], element.dateOfOrder[2]);
                    post.imageURL = element.post.imagePost.url;
                    temp.push(post);
                });
                this.dataList = temp;
                this.setDataSource();
            }
        });
    }

    searchItem(value: string): void {
        //Todo
    }
}
