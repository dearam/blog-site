import { Component, ViewChild,ElementRef } from '@angular/core';
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
  title:string="";
  content:string="";
  tags:string[]=[];
  categories:string[]=[];
  imageUrl:string="";
  button:string="Choose image";
  selectedFile:File|null=null;
  quotes:string="";

  titlemsg="";
  titlecond=false;
  contentmsg="";
  contentcond=false;
  tagsmsg="";
  tagcond=false;
  categoriesmsg="";
  categoriescond=false;
  selectedFilemsg="";
  selectedFilecond=false;
  quotesmsg="";
  quotescond=false;

  @ViewChild('contenteditable',{static:false}) contenteditableRef!:ElementRef;

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

  onContentChange(){
    if(this.contenteditableRef){
      this.content=this.contenteditableRef.nativeElement.innerText;
    }
  }

  blogSubmit(){
    this.resetErrors();
    if(!this.validateAll()) return;
  }

  private resetErrors() {
    this.titlemsg="";
    this.titlecond=false;
    this.contentmsg="";
    this.contentcond=false;
    this.tagsmsg="";
    this.tagcond=false;
    this.categoriesmsg="";
    this.categoriescond=false;
    this.selectedFilemsg="";
    this.selectedFilecond=false;
    this.quotesmsg="";
    this.quotescond=false;
  }

  validateAll():boolean{
    this.titlecond = !this.title;
    this.contentcond = !this.content;
    this.selectedFilecond = !this.selectedFile;
    this.tagcond = !this.tags;
    this.categoriescond = !this.categories;
    this.quotescond = !this.quotes;

    this.titlemsg = this.titlecond ? 'Title required!' : '';
    this.contentmsg = this.contentcond ? 'Content required!' : '';
    this.selectedFilemsg = this.selectedFilecond ? 'Image required!' : '';
    this.tagsmsg = this.tagcond ? 'Tags required!':'';
    this.categoriesmsg = this.categoriescond ? 'Categories required!':'';
    this.quotesmsg = this.quotescond ? 'Quotes required!':'';

    return !(this.titlecond || this.contentcond || this.selectedFilecond || this.tagcond || this.categoriescond || this.quotescond);
  }
}
