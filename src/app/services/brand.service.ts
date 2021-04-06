import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  apiUrl = "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }

  getBrands():Observable<ListResponseModel<Brand>> {
    return this.httpClient.get<ListResponseModel<Brand>>(this.apiUrl+"/brands/getall");
  }

  getBrandById(id:number):Observable<ListResponseModel<Brand>>{
    let newPath = this.apiUrl+"/brands/getbyid?id="+id;
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  Add(brand:Brand){
    let newPath=this.apiUrl+"/brands/add"; 
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

  Update(brand:Brand){
    let newPath = this.apiUrl+"/brands/update";
    return this.httpClient.post<ResponseModel>(newPath,brand);
  }

}