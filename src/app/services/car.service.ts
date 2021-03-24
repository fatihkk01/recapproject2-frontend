import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel'
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl = "https://localhost:44340/api/";

  constructor(private httpClient:HttpClient) { }

  Add(car:Car){
    let newPath=this.apiUrl+"cars/add"; 
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarById(carId:number){
    let newPath = this.apiUrl+"cars/getbyid?id="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandId(brandId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getcardetailsbybrandid?brandId="+brandId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColorId(colorId:number):Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getcardetailsbycolorid?colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number){
    let newPath = this.apiUrl+"cars/getcardetailsbybrandidandcolorid?brandId="+brandId+"&colorId="+colorId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

 


}
