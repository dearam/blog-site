import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { BlogService } from 'src/app/service/blog.service';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.scss']
})
export class BlogViewComponent {

  blogId:string|null=null;
  blogData:any;
  // content="Angular is a comprehensive, open-source framework developed by Google for building dynamic, single-page applications (SPAs). It leverages TypeScript, a superset of JavaScript, to bring strong typing and modern object-oriented programming capabilities to front-end development. Angular's core features include a powerful dependency injection system, which simplifies the management of application components and services, and a sophisticated data binding mechanism that keeps the model and view synchronized effortlessly. The framework's modular architecture allows developers to create reusable components and manage application state efficiently. Angular's CLI (Command Line Interface) streamlines development workflows by automating common tasks such as project setup, testing, and deployment. It also includes a set of built-in tools for code generation, which helps maintain consistency and reduces manual coding errors. With Angular, developers can create scalable applications that are maintainable and testable, thanks to its support for unit testing and end-to-end testing. The framework is designed to handle complex applications with ease, providing features like routing, forms, and HTTP client services that integrate seamlessly with backend systems. Additionally, Angular’s ecosystem is supported by a rich set of libraries and community tools, further enhancing its capabilities. The framework’s two-way data binding ensures that changes in the user interface are reflected in the application data model and vice versa, facilitating a responsive and interactive user experience. Angular also promotes best practices through its strong emphasis on modularity and component-based architecture, which helps developers build maintainable codebases that can evolve with application requirements. Overall, Angular provides a robust foundation for developing sophisticated web applications and is well-suited for enterprise-level projects where performance, scalability, and maintainability are critical.";
  content:string="";
  contents:string[]=[];
  userProfile:string="";
  userName:string="";


  constructor(private router:ActivatedRoute,private blogService:BlogService,private authService:AuthService){
    this.router.queryParamMap.subscribe(params=>{
      this.blogId=params.get('id');
    })
  }

  ngOnInit() {
    console.log(this.blogId);
    if (this.blogId) {
      this.blogService.getBlog(this.blogId).subscribe({
        next: (res) => {
          this.blogData = res.blog;
          this.authService.getUser(this.blogData.userId).subscribe({
            next: (res) => {
              this.userName = res.data.name;
              this.userProfile = res.data.profile;
              this.content = this.blogData.content;
              console.log(this.content.length);
              this.contentSplitting(); // Call after content is set
              console.log(this.contents); // Check contents array
            },
            error: (err) => {
              console.log(err);
            }
          });
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
  

  contentSplitting() {
    // Initialize contents array
    this.contents = [];
    
    // Check if the content length exceeds 1900 characters
    if (this.content.length > 1900) {
        let dotone = 0;
        let splitIndex = 550;
        
        // Find the first period after the initial split index
        for (let i = splitIndex; i < this.content.length; i++) {
            if (this.content.charAt(i) === '.') {
                dotone = i;
                break;
            }
        }
        
        // Store the first part
        this.contents[0] = this.content.substring(0, dotone + 1);
        
        // Update the starting index for the next part
        splitIndex = dotone + 1;
        for (let i = splitIndex + 550; i < this.content.length; i++) {
            if (this.content.charAt(i) === '.') {
                this.contents[1] = this.content.substring(splitIndex, i + 1);
                dotone = i;
                splitIndex = i + 1; // Update the start index for the next part
                break;
            }
        }
        
        // Store the remaining part
        this.contents[2] = this.content.substring(splitIndex);
      }
  }

}
