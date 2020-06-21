import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatTableModule } from '@angular/material/table';
import { ComponentsRoutes } from './component.routing';
import { ListItemComponent } from './list-item/list-item.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListPostComponent } from './list-post/list-post.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { EditUserComponent } from './list-user/edit-user/edit-user.component';
import { DeleteUserComponent } from './list-user/delete-user/delete-user.component';
import { EditPostComponent } from './list-post/edit-post/edit-post.component';
import { DeletePostComponent } from './list-post/delete-post/delete-post.component';
import { EditItemComponent } from './list-item/edit-item/edit-item.component';
import { DeleteItemComponent } from './list-item/delete-item/delete-item.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { PipeModule } from '../pipe/pipe.module';
import { ListCommentComponent } from './list-comment/list-comment.component';
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ComponentsRoutes),
        FormsModule,
        ReactiveFormsModule,
        NgbModule,
        MatTableModule,
        MatSortModule,
        MatFormFieldModule,
        MatSelectModule,
        MatInputModule,
        MatPaginatorModule,
        PipeModule
    ], exports: [
        EditUserComponent,
        EditItemComponent,
        EditPostComponent,
        DeleteItemComponent,
        DeletePostComponent,
        DeleteUserComponent
    ],
    entryComponents: [
        EditUserComponent,
        EditItemComponent,
        EditPostComponent,
        DeleteItemComponent,
        DeletePostComponent,
        DeleteUserComponent
    ],
    declarations: [
        ListItemComponent,
        ListUserComponent,
        ListPostComponent,
        EditUserComponent,
        DeleteUserComponent,
        EditPostComponent,
        DeletePostComponent,
        EditItemComponent,
        DeleteItemComponent,
        ListCommentComponent
    ]
})
export class ComponentsModule { }
