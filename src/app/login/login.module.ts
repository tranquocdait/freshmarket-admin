import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { LoginComponent } from './login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Login',
            urls: [
                { title: 'Login', url: '/login' },
                { title: 'Login' }
            ]
        },
        component: LoginComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule,ReactiveFormsModule,NgbModule],
    declarations: [LoginComponent]
})
export class LoginModule { }
