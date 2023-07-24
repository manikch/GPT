import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestKitListComponent } from './testkitlist/testkitlist.component';
import { TestKitViewDeleteComponent } from './test-kit-view-delete/test-kit-view-delete.component';
import { TestKitEditComponent } from './test-kit-edit/test-kit-edit.component';
import { TestKitPostComponent } from './test-kit-post/test-kit-post.component';

const routes: Routes = [
  { path: '', redirectTo: '/testkits', pathMatch: 'full' },
  { path: 'testkits', component: TestKitListComponent },
  { path: 'testkits/:id/delete', component: TestKitViewDeleteComponent },
  { path: 'testkits/:id/edit', component: TestKitEditComponent },
  { path: 'testkits/post', component: TestKitPostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
