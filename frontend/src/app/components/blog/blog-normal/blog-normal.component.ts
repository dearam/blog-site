import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-blog-normal',
  templateUrl: './blog-normal.component.html',
  styleUrls: ['./blog-normal.component.scss']
})
export class BlogNormalComponent {
  @Input() blog:any;

  content:string="";
  userProfile:string="";
  userName:string="";

  constructor(private authService:AuthService){}

  ngOnInit(){
    if(this.blog && this.blog.content){
      this.content=this.blog.content.substring(0,80);
    }
    this.authService.getUser(this.blog.userId).subscribe({
      next:(res)=>{
        this.userProfile=res.data.profile;
        this.userName=res.data.name;
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
