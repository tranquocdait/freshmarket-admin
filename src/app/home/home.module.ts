import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { HomeComponent } from './home.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'home',
            urls: [
                { title: 'home', url: '/home' },
                { title: 'home' }
            ]
        },
        component: HomeComponent
    }
];

@NgModule({
    imports: [FormsModule, CommonModule, RouterModule.forChild(routes), ChartsModule],
    declarations: [HomeComponent]
})
export class HomeModule { }
