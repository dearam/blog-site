import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-index',
  templateUrl: './blog-index.component.html',
  styleUrls: ['./blog-index.component.scss']
})
export class BlogIndexComponent {
  blogs:any=[];

  constructor(private blogService:BlogService,private router:Router){}
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

  onClickBlog(blog:any){
    this.router.navigate(['/blog/view'],{queryParams:{ id:blog._id }});
  }
}
