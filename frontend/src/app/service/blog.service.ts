import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'http://localhost:3000/blog/upload';

  constructor(private http:HttpClient,private router:Router) { }

  upload(formData:FormData):Observable<any>{
    return this.http.post<any>(this.baseUrl,formData);
  }

}
