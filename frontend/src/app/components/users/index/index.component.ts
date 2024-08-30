import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { User } from './users.model';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  users: User[] = [];
  displayDialog:boolean=false;
  selectedUser:User|null=null;
  labelname:string="";
  messages: Message[]=[];

  constructor(private authservice: AuthService) {}

  ngOnInit() {
    this.authservice.users().subscribe({
      next: (response) => { // Log the API response
        this.users = response; // Assign the response to users
        console.log(this.users); // Log the users after assignment to verify it has data
      },
      error: (err) => console.log(err),
    });
  }

  deleteUser(id:number) {
    console.log(id);
    // Implement delete logic here
    this.authservice.deleteUser(id).subscribe({
      next:(res)=>{
        this.messages=[
          { severity: 'success', detail: 'User Deleted successfully' },
        ]
        setTimeout(()=>{
          this.messages=[];
        },5000);
        console.log(res);
      },
      error:(err)=>console.log(err)
    })
  }

  editUser(user: any) {
    console.log('Editing user:', user);
  }

  openViewDialog(user:User,label:string){
    this.labelname=label;
    this.selectedUser=user;
    this.displayDialog=true;
  }
}
