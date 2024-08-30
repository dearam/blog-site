import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { ChipModule } from 'primeng/chip';
import { HeaderComponent } from './components/header/header.component';
import { IndexComponent } from './components/users/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { ViewComponent } from './components/users/view/view.component';
import { Message } from 'primeng/api';
import { MessagesModule } from 'primeng/messages';
import { HomeHeaderComponent } from './components/home-header/home-header.component';
import { BlogNavbarComponent } from './components/blog-navbar/blog-navbar.component';
import { BlogIndexComponent } from './components/blog/blog-index/blog-index.component';
import { BlogTrendComponent } from './components/blog/blog-trend/blog-trend.component';
import { CardModule } from 'primeng/card';
import { BlogNormalComponent } from './components/blog/blog-normal/blog-normal.component';
import { BlogNewComponent } from './components/blog/blog-new/blog-new.component';
import { DividerModule } from 'primeng/divider';
import { ChipsModule } from 'primeng/chips';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    HeaderComponent,
    IndexComponent,
    LayoutComponent,
    ViewComponent,
    HomeHeaderComponent,
    BlogNavbarComponent,
    BlogIndexComponent,
    BlogTrendComponent,
    BlogNormalComponent,
    BlogNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    PasswordModule,
    FormsModule,
    HttpClientModule,
    MenubarModule,
    AvatarModule,
    ChipModule,
    DataViewModule,
    TagModule,
    CommonModule,
    TableModule,
    DialogModule,
    MessagesModule,
    CardModule,
    DividerModule,
    ChipsModule,
    FileUploadModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
