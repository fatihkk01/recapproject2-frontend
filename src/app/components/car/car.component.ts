import { Component, OnInit } from '@angular/core';
import { ActivatedRoute , Router } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {
  cars: Car[] = [];
  currentCar:Car;
  //[(ngModel)] ile html deki filterText id li form elemanını .ts uzantılı dosyadaki filterText değişkeni ile eşleştirdik
  filterText = ""; 

  constructor(private carService: CarService, private _router:Router, private activatedRoute:ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]&&params["colorId"]){
        this.getCarsByBrandIdAndColorId(params["brandId"],params["colorId"]);
      }
      else if(params["brandId"]){
        this.getCarsByBrandId(params["brandId"]);
      }
      else if(params["colorId"]){
        this.getCarsByColorId(params["colorId"]);
      }
      else{
        this.getCars();
      }
    })
  }

  setCurrentCar(car:Car){
    this.currentCar = car;
  }

  getCars() {
    this.carService.getCars().subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrandId(brandId:number) {
    this.carService.getCarsByBrandId(brandId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByColorId(colorId:number) {
    this.carService.getCarsByColorId(colorId).subscribe((response) => {
      this.cars = response.data;
    });
  }

  getCarsByBrandIdAndColorId(brandId:number,colorId:number){
    this.carService.getCarsByBrandIdAndColorId(brandId,colorId).subscribe((response)=>{
      this.cars = response.data;
    })
  }

 
  

}