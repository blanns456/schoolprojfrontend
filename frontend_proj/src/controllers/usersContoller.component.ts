import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
// import { Observable } from "rxjs";



@Injectable({providedIn:"root"})
export class UserController{

  readonly Root_URL = 'http://127.0.0.1:8000/api/';
  token: any;

  // alertmessage: string | undefined;
  // alertmessag: Object;
  // static createuser: any;
  constructor(private http: HttpClient) {

  }

  public getusers() {
    return this.http.get(this.Root_URL + 'users');
  }

  public createuser(user: { name: string, password: string, email: string }) {
   return this.http.post(this.Root_URL + 'adduser', user);
  }

  public removeuser(id: number) {
    return this.http.delete(this.Root_URL + "destroy/" + id.toString());
  }

  public getUserInfo(id: number) {
     return this.http.get(this.Root_URL + "show/" + id.toString());
  }

  public updateUser(user: { name: string, email: string, id: string }) {
    return this.http.put(this.Root_URL + 'update', user);
  }
}

