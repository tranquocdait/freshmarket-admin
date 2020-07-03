import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommentPost } from '../model/comment.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../../services/endpoint-factory.service';

@Component({
    selector: 'app-list-comment',
    templateUrl: './list-comment.component.html',
    styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
    dataSource: MatTableDataSource<CommentPost>;
    dataList: CommentPost[] = null;
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    displayedColumns: string[] = ['commentId', 'postID', 'username', 'content', 'edit', 'delete'];
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
        this.endpointFactory.getEndPoint('posts/getAllComment').subscribe(data => {
            if (data.status === 'success') {
                const temp = [];
                data.data.forEach((element, index) => {
                    const comment = new CommentPost();
                    comment.id = element.id;
                    comment.user = element.user;
                    comment.post = element.post;
                    comment.content = element.content;
                    temp.push(comment);
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
        // const modalRef = this.modalService.open(DeleteItemComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
        // modalRef.componentInstance.data = { data: element }
        // modalRef.componentInstance.output.subscribe((res) => {
        //   if (res === 'success') {
        //     this.setData();
        //   }
        // });
    }

    editItem(element: any) {
        // const modalRef = this.modalService.open(EditItemComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
        // modalRef.componentInstance.data = { data: element, type: 'edit' };
        // modalRef.componentInstance.output.subscribe((res) => {
        //   if (res === 'success') {
        //     this.setData();
        //   }
        // });
    }

    searchComment(search: string) {
        this.endpointFactory.getEndPoint('purchases/search?keySearch=' + search).subscribe(data => {
            if (data.status === 'success') {
                const temp = [];
                data.data.forEach((element, index) => {
                    const comment = new CommentPost();
                    comment.id = element.id;
                    comment.user = element.user;
                    comment.post = element.post;
                    comment.content = element.content;
                    temp.push(comment);
                });
                this.dataList = temp;
                this.setDataSource();
            }
        }
        );
    }
}
