import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl = "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }

  getColors():Observable<ListResponseModel<Color>> {
    let newPath = this.apiUrl+"/colors/getall";
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  getColorById(id:number):Observable<ListResponseModel<Color>>{
    let newPath = this.apiUrl+"/colors/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Color>>(newPath);
  }

  Add(color:Color){
    let newPath=this.apiUrl+"/colors/add"; 
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

  Update(color:Color):Observable<ResponseModel>{
    let newPath = this.apiUrl+"/colors/update";
    return this.httpClient.post<ResponseModel>(newPath,color);
  }

}