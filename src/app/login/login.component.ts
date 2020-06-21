import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStoreManager } from '../services/local-store-manager.service';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { EndpointFactory } from '../services/endpoint-factory.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    roleAdmin: string = 'Admin';
    loginStatus: boolean = false;
    @ViewChild('tt', { static: true }) ttUsername: NgbTooltip;
    constructor(private formBuilder: FormBuilder, private router: Router, private localStoreManager: LocalStoreManager, private endpointFactory: EndpointFactory) {
        // this.localStoreManager.removeToken();
        this.createForm();
    }

    loginForm: FormGroup;

    ngOnInit() {

    }

    createForm(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required],
            password: ['', Validators.required],
            memmory: [''],
        });
    }

    onSubmit(): void {
        const params: any = {
            userName: this.loginForm.value['userName'],
            password: this.loginForm.value['password']
        };
        this.endpointFactory.postEndPoint(params, 'login').subscribe(data => {
            if (data.status === 'success') {
                this.localStoreManager.setToken(data.data);
                this.endpointFactory.postByHeader(null, 'users/information').subscribe(dataInfor => {
                    if (dataInfor.status === 'success') {
                        if (dataInfor.data.roleUser.roleName === this.roleAdmin) {
                            this.router.navigateByUrl('');
                        } else {
                            this.loginFailed();
                        }
                    } else {
                        this.loginFailed();
                    }
                }
                );
            }
        }
        );
    }
    loginFailed(): void {
        this.localStoreManager.removeToken();
        this.loginStatus = true;
    }
}
