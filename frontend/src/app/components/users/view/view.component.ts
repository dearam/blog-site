import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { User } from '../index/users.model';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnChanges {
  @Input() user: User | null = null;
  @Input() label: string | null = null;
  @Input()
  copyUser: User | null = null;
  password:string="";

  updateStatus = false;

  constructor(private authService: AuthService) {}

  ngOnChanges(changes: SimpleChanges) {
    // Ensure copyUser is updated when the input user changes
    if (changes['user'] && changes['user'].currentValue) {
      this.copyUser = { ...changes['user'].currentValue }; // Create a deep copy of the user object
    }
  }

  isView(): boolean {
    return this.label === 'view';
  }

  cancel() {
    // Handle the cancel action, e.g., reset fields or navigate away
    if (this.user) {
      this.copyUser = { ...this.user }; // Reset to the original user data
    }
  }

  save(id: number) {
    console.log('Current user:', this.user);
    console.log('Copy user:', this.copyUser);
    if(this.password){
      if(this.user){
        this.user.password=this.password;
      }
    }
  
    if (this.copyUser && this.user) {
      const hasChanges = this.hasChanges(this.copyUser, this.user);

      if (hasChanges) {
        this.authService.editUser(id, this.user).subscribe({
          next: (res) => {
            console.log('Updated successfully');
            this.updated(); // Update the status to reflect the changes
          },
          error: (error) => this.handleError(error)
        });
      } else {
        console.log('No changes detected');
      }
    }
  }

  private hasChanges(copyUser: User, originalUser: User): boolean {
    return copyUser.name !== originalUser.name || copyUser.email !== originalUser.email;
  }

  private handleError(error: any) {
    const errorMessage = error?.error?.message || 'An error occurred';
    // Ideally, show the error message to the user
    console.error(errorMessage);
  }

  private updated() {
    this.updateStatus = true;
    // Additional actions can be performed here to reflect the update status in the UI
  }
}
