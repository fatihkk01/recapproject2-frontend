import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { RentalControlModel } from '../models/rentalControlModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

  apiUrl = "https://localhost:44340/api";

  constructor(private httpClient:HttpClient) { }


  add(rental:RentalControlModel){
    let newPath = this.apiUrl+"/rentals/add"
    return this.httpClient.post<ResponseModel>(newPath,rental);
  }

  getRentals():Observable<ListResponseModel<Rental>> {
    return this.httpClient.get<ListResponseModel<Rental>>(this.apiUrl+"/rentals/getrentaldetails");
  }

  getRentalByCarId(carId:number):Observable<ListResponseModel<RentalControlModel>>{
    let newPath = this.apiUrl+"/rentals/getrentalbycarid?carId="+carId;
    return this.httpClient.get<ListResponseModel<RentalControlModel>>(newPath);
  }

}
