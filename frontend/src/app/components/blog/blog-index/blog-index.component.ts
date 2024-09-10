import { Component } from '@angular/core';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.scss']
})
export class BlogIndexComponent {
  blogs:any=[];

  constructor(private blogService:BlogService){}
  ngOnInit(){
    this.blogService.getBlogs().subscribe({
      next:(res)=>{
        this.blogs=res.blogs;
        console.log(this.blogs);
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }
}
