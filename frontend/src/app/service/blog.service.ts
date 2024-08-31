import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'http://localhost:3000/blog';

  constructor(private http:HttpClient,private router:Router) { }

  upload(file:File):Observable<any>{
    const formData = new FormData();
    formData.append('image',file,file.name);

    return this.http.post(`${this.baseUrl}/uploadImage`,formData);
  }

}
