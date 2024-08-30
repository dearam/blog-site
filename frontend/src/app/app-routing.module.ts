import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guard/auth.guard';
import { IndexComponent } from './components/users/index/index.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ViewComponent } from './components/users/view/view.component';
import { BlogNewComponent } from './components/blog/blog-new/blog-new.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { 
        path: 'blog',
        canActivate:[AuthGuard],
        children:[
          {path:'write',component:BlogNewComponent}
        ]
      },
      {
        path: 'users',
        component: IndexComponent,
        canActivate: [AuthGuard], // Apply AuthGuard here if needed
        children: [
          { path: 'view', component: ViewComponent },
        ]
      },
    ]
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
