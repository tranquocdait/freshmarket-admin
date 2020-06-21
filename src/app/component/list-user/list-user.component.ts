import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UserElement } from '../model/user.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { EndpointFactory } from '../../services/endpoint-factory.service';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.scss']
})
export class ListUserComponent implements OnInit {
  dataSource: MatTableDataSource<UserElement>;
  dataList: UserElement[] = null;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  displayedColumns: string[] = ['avatar', 'userId', 'userName', 'role', 'fullName', 'phoneNumber', 'email', 'edit', 'delete'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  currentRate = 1.5;
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
    this.endpointFactory.getEndPoint("users").subscribe(data => {
      if (data.status === "success") {
        const temp = [];
        data.data.forEach((element, index) => {
          const user = new UserElement();
          user.userId = element.userID;
          user.userName = element.userName;
          user.role = element.roleUser;
          user.avatarURL = element.avatar.url;
          user.fullName = element.fullName;
          user.phoneNumber = element.phoneNumber;
          user.email = element.email;
          temp.push(user);

        });
        this.dataList = temp;
      }
    }
    );
  }
  setDataSource() {
    setTimeout(() => {
      this.dataSource = new MatTableDataSource(this.dataList);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }, 1000);

  }
  deleteUser(element: any) {
    const modalRef = this.modalService.open(DeleteUserComponent, { size: 'lg', windowClass: 'delete-modal', centered: true });
    modalRef.componentInstance.data = { data: element }
    modalRef.componentInstance.output.subscribe((res) => {
      if (res === "success") {
        this.setData();
      }
    });
  }

  editUser(element: any) {
    const modalRef = this.modalService.open(EditUserComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
    modalRef.componentInstance.data = { data: element, type: 'edit' };
    modalRef.componentInstance.output.subscribe((res) => {
      if (res === "success") {
        this.setData();
      }
    });
  }
  addUser() {
    const modalRef = this.modalService.open(EditUserComponent, { size: 'lg', windowClass: 'edit-modal', centered: true });
    modalRef.componentInstance.data = { type: 'add' };
    modalRef.componentInstance.output.subscribe((res) => {
      if (res === "success") {
        this.setData();
      }
    });
  }

  searchUser(search: string) {
    this.endpointFactory.getEndPoint("users/search?keySearch=" + search).subscribe(data => {
      if (data.status === "success") {
        const temp = [];
        data.data.forEach((element, index) => {
          let user = new UserElement();
          user.userId = element.userID;
          user.userName = element.userName;
          user.role = element.roleUser;
          user.avatarURL = element.avatar.url;
          user.fullName = element.fullName;
          user.phoneNumber = element.phoneNumber;
          user.email = element.email;
          temp.push(user);

        });
        this.dataList = temp;
        this.setDataSource();
      };
    }
    );
  }
}
