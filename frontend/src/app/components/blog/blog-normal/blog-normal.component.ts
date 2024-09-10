import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-blog-normal',
  templateUrl: './blog-normal.component.html',
  styleUrls: ['./blog-normal.component.scss']
})
export class BlogNormalComponent {
  @Input() blog:any;

  content:string="";

  ngOnInit(){
    if(this.blog && this.blog.content){
      this.content=this.blog.content.substring(0,100)+"...";
    }
  }
}
