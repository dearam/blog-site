import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-new',
  templateUrl: './blog-new.component.html',
  styleUrls: ['./blog-new.component.css']
})
export class BlogNewComponent {
  title: string = "";
  content: string = "";
  tags: string[] = [];
  categories: string[] = [];
  button: string = "Choose image";
  selectedFile: File | null = null;
  quotes: string = "";
  imageUrl: string = "";
  successVisible = false;
  sectionOpacity = '100%';

  isBlurred = true;

  titlemsg = "";
  titlecond = false;
  contentmsg = "";
  contentcond = false;
  tagsmsg = "";
  tagcond = false;
  categoriesmsg = "";
  categoriescond = false;
  selectedFilemsg = "";
  selectedFilecond = false;
  quotesmsg = "";
  quotescond = false;
  userData: any;
  titleLengthCond = false;

  @ViewChild('contenteditable', { static: false }) contenteditableRef!: ElementRef;

  constructor(private blogservice: BlogService, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userinfo().subscribe({
      next: (res) => {
        this.userData = res._id;
        console.log(typeof(this.userData));
      },
      error: (err) => console.log(err)
    });
  }

  onUpload(event: any) {
    const fileInput = event.target as HTMLInputElement;

    if (event.target.files.length > 0) {
      if (fileInput.files) {
        this.button = fileInput.files[0].name;
        this.selectedFile = fileInput.files[0];
        this.uploadFileBackend();
      }
    }
  }

  uploadFileBackend() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile);

      this.blogservice.upload(formData).subscribe({
        next: (res) => {
          console.log("success", res);
          this.viewFile(res.filename);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  viewFile(filename: string) {
    if (this.selectedFile) {
      console.log(this.selectedFile.name);
      this.imageUrl = `http://localhost:3000/uploads/${this.button}`;
    }
  }

  onContentChange() {
    if (this.contenteditableRef) {
      this.content = this.contenteditableRef.nativeElement.innerText;
    }
  }

  async blogSubmit() {
    this.resetErrors();
    if (!this.validateAll()) return;

    if (this.selectedFile) {
      this.imageUrl = `http://localhost:3000/uploads/${this.button}`;
    }

    try {
      // Wait for the blog creation to complete
      await this.blogservice.newBlog({
        title: this.title,
        content: this.content,
        tags: this.tags,
        categories: this.categories,
        quotes: this.quotes,
        image: this.imageUrl,
        userId: this.userData
      }).toPromise();

      // Show the success message and wait for the transition to complete
      await this.showSuccessMessage();

      // Navigate to the home route
      this.router.navigate(['/home']);
    } catch (error) {
      console.error(error);
    }
  }

  private async showSuccessMessage(): Promise<void> {
    this.sectionOpacity = '20%';
    this.successVisible = true;

    // Wait for the blur transition to complete
    await new Promise<void>(resolve => {
      setTimeout(() => {
        this.isBlurred = false;
      }, 1000); // Duration of the blur transition
      setTimeout(() => {
        resolve()
      }, 3500); 
    });
  }

  private resetErrors() {
    this.titlemsg = "";
    this.titlecond = false;
    this.contentmsg = "";
    this.contentcond = false;
    this.tagsmsg = "";
    this.tagcond = false;
    this.categoriesmsg = "";
    this.categoriescond = false;
    this.selectedFilemsg = "";
    this.selectedFilecond = false;
    this.quotesmsg = "";
    this.quotescond = false;
  }

  validateAll(): boolean {
    this.titlecond = !this.title;
    this.contentcond = !this.content;
    this.selectedFilecond = !this.selectedFile;
    this.tagcond = this.tags.length === 0;
    this.categoriescond = this.categories.length === 0;
    this.quotescond = !this.quotes;

    // Add title length validation
    this.titleLengthCond = this.title.length < 35;

    this.titlemsg = this.titlecond ? 'Title required!' : this.titleLengthCond ? 'Title must be 35 characters or less!' : '';
    this.contentmsg = this.contentcond ? 'Content required!' : '';
    this.selectedFilemsg = this.selectedFilecond ? 'Image required!' : '';
    this.tagsmsg = this.tagcond ? 'Tags required!' : '';
    this.categoriesmsg = this.categoriescond ? 'Categories required!' : '';
    this.quotesmsg = this.quotescond ? 'Quotes required!' : '';

    return !(this.titlecond || this.contentcond || this.selectedFilecond || this.tagcond || this.categoriescond || this.quotescond);
  }
}
