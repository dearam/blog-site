import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { BlogService } from 'src/app/service/blog.service';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.css']
})
export class BlogNewComponent {
  values:string[]=[];
  imageUrl:string="";
  button:string="Choose image";
  constructor(private messageService: MessageService,private blogservice:BlogService) {}

  onUpload(event: any) {
    const fileInput=event.target as HTMLInputElement;
    if(event.target.files.length>0){
      if(event.target.files.length>1){
        alert("you can only upload one file");
      }
      console.log(event);
    }
  }
}
