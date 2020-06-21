import { Routes } from '@angular/router';
import { ListItemComponent } from './list-item/list-item.component';
import { ListPostComponent } from './list-post/list-post.component';
import { ListUserComponent } from './list-user/list-user.component';
import { ListCommentComponent } from './list-comment/list-comment.component';



export const ComponentsRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: 'list-item',
				component: ListItemComponent,
				pathMatch: 'full'
			},
			{
				path: 'list-post',
				component: ListPostComponent
			},
			{
				path: 'list-user',
				component: ListUserComponent,
				pathMatch: 'full'
			}, {
				path: 'list-comment',
				component: ListCommentComponent,
				pathMatch: 'full'
			}
		]
	}
];
