import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { TestKitListComponent } from './testkitlist/testkitlist.component';
import { OrderService } from './orderservice.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { TestKitEditComponent } from './test-kit-edit/test-kit-edit.component';
import { TestKitPostComponent } from './test-kit-post/test-kit-post.component';
import { TestKitViewDeleteComponent } from './test-kit-view-delete/test-kit-view-delete.component';  
import { NgxPaginationModule } from 'ngx-pagination';
@NgModule({
  declarations: [
    AppComponent,
    TestKitListComponent,
    TestKitEditComponent,
    TestKitPostComponent,
    
    TestKitViewDeleteComponent
    
  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
   CommonModule ,
   NgxPaginationModule
   ,ReactiveFormsModule
  
  ],
  providers: [OrderService],
  bootstrap: [AppComponent,TestKitListComponent,TestKitPostComponent,TestKitEditComponent,TestKitViewDeleteComponent]
})
export class AppModule { }
