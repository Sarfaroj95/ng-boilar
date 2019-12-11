import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private baseUrl = environment.url;
  private UserSignUrl = this.baseUrl + "/api/v1/user/login";
  private UserSignupUrl = this.baseUrl + "/api/v1/user/register";
  private UserDataUrl = this.baseUrl + "/api/v1/user/userdata/";

  MainLogin(val): Observable<any> {
    return this.http.post(this.UserSignUrl, val);
  }
  MainRegister(val): Observable<any> {
    return this.http.post(this.UserSignupUrl, val);
  }
  // MainUserdata(v): Observable<any> {
  //   return this.http.post(this.UserDataUrl + v);
  // }

  getToken() {
    return localStorage.getItem("token");
  }
  deleteToken() {
    return localStorage.removeItem("token");
  }
}
