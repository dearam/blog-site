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
  selectedFile:File|null=null;
  constructor(private blogservice:BlogService) {}

  onUpload(event: any) {
    const fileInput=event.target as HTMLInputElement;

    if(event.target.files.length>0){
      if(fileInput.files){
        this.button=fileInput.files[0].name;
        this.selectedFile=fileInput.files[0];
        this.uploadFileBackend();
      }
    }
  }
  uploadFileBackend(){
    if(this.selectedFile){
      const formData=new FormData();
      formData.append('file',this.selectedFile);

      this.blogservice.upload(formData).subscribe({
        next:(res)=>{
          console.log("success",res);
          this.viewFile(res.filename)
        },
        error:(err)=>{
          console.log(err);
        }
      })
    }
  }

  viewFile(filename:string) {
    if(this.selectedFile){
      console.log(this.selectedFile.name);
      this.imageUrl = `http://localhost:3000/uploads/${encodeURIComponent(filename)}`;
    }
  }
}
