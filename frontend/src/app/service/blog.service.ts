import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable ,throwError,catchError} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl = 'http://localhost:3000/blog/';

  constructor(private http:HttpClient,private router:Router) { }

  upload(formData:FormData):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/upload`,formData);
  }

  newBlog(title:string,content:string,tags:any,categories:any,quotes:string,image:string,userId:any):Observable<any>{
    return this.http.post<any>(`${this.baseUrl}/newblog`,{title,content,tags,categories,quotes,image,userId},{withCredentials:true}).pipe(
      catchError(this.handleError)
    )
  }




  private handleError(error: any) {
    let errorMessage = 'Something went wrong; please try again later.';
  
  // Check if the error has a status code and a message
    if (error.status === 404) {
      errorMessage = error.error.message;
    } else if (error.status === 400 && error.error && error.error.message) {
      errorMessage = error.error.message; // Use backend error message if available
    } else if (error.error && error.error.message) {
      errorMessage = error.error.message; // Handle other error messages
    }

    return throwError(() => new Error(errorMessage));
  }

}
