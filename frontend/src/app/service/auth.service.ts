import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, concatAll, Observable ,throwError} from 'rxjs';
import { User } from '../components/users/index/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl="http://localhost:3000/auth";
  constructor(private http:HttpClient,private router:Router) { }

  register(name:string,email:string,password:string,profile:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/register`,{name,email,password,profile},{withCredentials:true}).pipe(
      catchError(this.handleError)
    );
  }

  login(email:string,password:string):Observable<any>{
    return this.http.post(`${this.apiUrl}/login`,{email,password},{withCredentials:true}).pipe(
      catchError(this.handleError)
    );
  }

  userinfo():Observable<any>{
    return this.http.get(`${this.apiUrl}/userinfo`,{withCredentials:true}).pipe(
      catchError(this.handleError)
    );
  }

  logout():Observable<any>{
    return this.http.get(`${this.apiUrl}/logout`,{withCredentials:true}).pipe(
      catchError(this.handleError)
    )
  }

  users():Observable<any>{
    return this.http.get(`${this.apiUrl}/alluser`,{withCredentials:true}).pipe(
      catchError(this.handleError)
    )
  }

  editUser(id:number,userData:any):Observable<any>{
    console.log(userData);
    return this.http.put(`${this.apiUrl}/user/edit/${id}`,userData,{withCredentials:true}).pipe(
      catchError(this.handleError)
    )
  }

  deleteUser(id:number):Observable<any>{
    return this.http.delete(`${this.apiUrl}/user/delete/${id}`,{withCredentials:true}).pipe(
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
