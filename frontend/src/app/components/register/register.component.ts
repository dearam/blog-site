import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';
  images=[
    "https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/onyamalimba.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/ionibowcher.png",
    "https://primefaces.org/cdn/primeng/images/demo/avatar/xuxuefeng.png",
    "https://th.bing.com/th/id/OIP.-d8GY5axNJZYoXsNOUJ4iwAAAA?rs=1&pid=ImgDetMain",
    "https://th.bing.com/th/id/R.2be49bcde70816ac4561da4e77f7f6c6?rik=ZSM9B%2bELrjmqUw&riu=http%3a%2f%2fkobu.agency%2ffiles%2fuploads%2f2019%2f10%2f15_Beatriz.png&ehk=R10tNTv3suWUOt5vF%2bkGDVn20swbuzsqwwglytataKQ%3d&risl=&pid=ImgRaw&r=0",
    "https://th.bing.com/th/id/OIP.xetN7SHvp311jOFzMXpFZwHaHa?rs=1&pid=ImgDetMain",
    "https://pm1.narvii.com/6571/949d27358fb0132ee57433f0f12efab77443efd1_hq.jpg",
    "https://i.pinimg.com/originals/bd/be/a4/bdbea4a02af6901c4f7529a94df06984.jpg"
]
  selectedAvatar="";
  serror=false;
  smsg='';
  umsg = '';
  uerror = false;
  emsg = '';
  eerror = false;
  pmsg = '';
  perror = false;

  constructor(private authService: AuthService, private cookieService: CookieService, private router: Router) {}

  ngOnInit() {}

  formSubmit() {
    this.resetErrors();

    if (!this.validateInputs()) return;

    this.authService.register(this.username,this.email,this.password,this.selectedAvatar).subscribe({
      next: (response) => this.handleRegisterSuccess(response),
      error: (error) => this.handleError(error)
    });
  }

  private validateInputs(): boolean {
    this.uerror = !this.username;
    this.eerror = !this.email;
    this.perror = !this.password;
    this.serror = !this.selectedAvatar;

    this.umsg = this.uerror ? 'Username required!' : '';
    this.emsg = this.eerror ? 'Email required!' : '';
    this.pmsg = this.perror ? 'Password required!' : '';
    this.smsg = this.serror ? 'Profile Picture required!':'';

    return !(this.uerror || this.eerror || this.perror || this.serror);
  }

  private resetErrors() {
    this.uerror = false;
    this.eerror = false;
    this.perror = false;
    this.serror = false;
    this.umsg = '';
    this.emsg = '';
    this.pmsg = '';
    this.smsg = '';
  }

  private handleRegisterSuccess(response: any) {
    console.log("Registration successful", response);
    const token = this.cookieService.get('jwt');
    if (token) {
      this.router.navigate(['/home']);
    } else {
      console.error("Authentication failed");
      this.router.navigate(['/login']);
    }
  }

  private handleError(error: any) {
    const errorMessage = error?.message || 'An error occurred';
    if (errorMessage === "Email is already registered") {
      this.emsg = errorMessage;
      this.eerror = true;
    } else {
      this.pmsg = errorMessage; // If there are other errors, display them accordingly
      this.perror = true;
    }
    console.log(errorMessage);
  }

  selectAvatar(image:string){
    this.selectedAvatar=image;
    console.log(image);
  }
}
