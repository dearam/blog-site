import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';


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

  constructor(private messageService: MessageService,) {}

  onUpload(event: any) {
    const file = event.files[0];
    // this.messageService.upload(file).subscribe(
      
    // )
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded with Basic Mode' });
  }
}
