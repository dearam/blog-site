import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  
  constructor(private router:Router){}
  ngOnInit(){
    this.getUserAuth();
  }

  getUserAuth(){
    // const token=this.getCookie('jwt');
    // console.log(token);
    // console.log(document.cookie);
    // if(!token){
    //   this.router.navigate(['login']);
    // }else{
    //   this.router.navigate(['home']);
    // }
    // return false;
  }

  getCookie(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    
      if (parts.length === 2) {
          return parts.pop()?.split(';').shift() || null; // Return the cookie value or null
      }
      
      return null; // Return null if cookie not found
  }
}
