import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetResponseModel } from '../models/getResponseModel';
import { TokenModel } from '../models/tokenModel';
import { Token } from '@angular/compiler';
import { LoginModel } from '../models/loginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient) {}

  apiUrl: string = 'http://localhost:32258/api';

  login(loginModel:LoginModel) : Observable<GetResponseModel<TokenModel>> {

    let newPath = this.apiUrl + "/auth/login";

    return this.httpClient.post<GetResponseModel<TokenModel>>(newPath,loginModel);
  }

  isAuthenticated(){
    if(localStorage.getItem("token")){
      return true;
    }else{
      return false;
    }
  }
}
