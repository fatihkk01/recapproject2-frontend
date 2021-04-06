import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { CarUpdate } from '../models/carUpdate';
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

  Update(car:CarUpdate){
    let newPath = this.apiUrl+"cars/update";
    return this.httpClient.post<ResponseModel>(newPath,car);
  }

  getCars():Observable<ListResponseModel<Car>> {
    let newPath = this.apiUrl+"cars/getcardetails";
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarByCarId(carId:number){
    let newPath = this.apiUrl+"cars/getbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarDetailsByCarId(carId:number){
    let newPath = this.apiUrl+"cars/getcardetailsbyid?id="+carId;
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
