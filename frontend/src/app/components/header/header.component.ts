import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  items: MenuItem[] | undefined;
    name="";

    constructor(private authservice:AuthService,private router:Router){}
    ngOnInit() {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                routerLink: '/home'
            },
            {
                label: 'Users',
                icon: 'pi pi-users',
                routerLink: '/users',
            },
            {
                label: 'Projects',
                icon: 'pi pi-search',
                items: [
                    {
                        label: 'Components',
                        icon: 'pi pi-bolt',
                        routerLink: '/',
                    },
                    {
                        label: 'Blocks',
                        icon: 'pi pi-server',
                        routerLink: '/',
                    },
                    {
                        label: 'UI Kit',
                        icon: 'pi pi-pencil',
                        routerLink: '/',
                    },
                    {
                        label: 'Templates',
                        icon: 'pi pi-palette',
                        items: [
                            {
                                label: 'Apollo',
                                icon: 'pi pi-palette',
                                routerLink: '/',
                            },
                            {
                                label: 'Ultima',
                                icon: 'pi pi-palette',
                                routerLink: '/',
                            }
                        ]
                    }
                ]
            },
            {
                label: 'Contact',
                icon: 'pi pi-envelope',
                routerLink: '/',
            }
        ];

        console.log(this.userInfo());
    }

    userInfo(){
        this.authservice.userinfo().subscribe({
            next:(response)=>this.name=response.name,
            error:(err)=>console.log(err),
        });
    }

    onClick(){
        this.authservice.logout().subscribe({
            next:(Response)=>{
                console.log(Response);
                window.location.reload();
            },
            error:(err)=>console.log(err)
        })
    }
}
