import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { UserDetails } from "../models/user-details";
import { ResourcesDetails } from '../models/resources-details';
import { RegisterComponent } from '../pages/register/register.component';
import { UserLoginDetails } from '../models/user-login-details';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = "https://reqres.in/api";

  private userSubject: BehaviorSubject<UserLoginDetails>;
  public userLogin: Observable<UserLoginDetails>;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient, private router: Router) {
    this.userSubject = new BehaviorSubject<UserLoginDetails>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.userLogin = this.userSubject.asObservable();
  }

  //custom getter that will make it easy for other components to quickly get the value of the current logged in user without having to subscribe to our observable.
  public get userValue(): UserLoginDetails {
    return this.userSubject.value;
  }

  getLoginDetails(email: string, password: string) {
    return this.httpClient.post<any>(this.apiURL + '/login', { email, password })
      .pipe(
        map(({ token }) => {
          let userLogin: UserLoginDetails = {
            email: email,
            token: token,
          };
          localStorage.setItem('currentUser', JSON.stringify(userLogin));
          this.userSubject.next(userLogin);
          return userLogin;
        })
      )
  }

  logout() {
    localStorage.removeItem('currentUser');
    //this.userSubject.next(null);
  }

  getUserDetails(): Observable<UserDetails[]> {
    return this.httpClient.get<UserDetails[]>(this.apiURL + '/users')
      .pipe(
        map((data: UserDetails[]) => {
          return data;
        }), catchError(this.errorHandler)
      )
  }

  getResourceDetails(): Observable<ResourcesDetails[]> {
    return this.httpClient.get<ResourcesDetails[]>(this.apiURL + '/unknown')
      .pipe(
        map((data: ResourcesDetails[]) => {
          return data;
        }), catchError(this.errorHandler)
      )
  }

  registerUsers(user: UserDetails[]) {
    return this.httpClient.post(this.apiURL + '/users', user).
      pipe(
        map((data: any) => {
          return data;
        }), catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
