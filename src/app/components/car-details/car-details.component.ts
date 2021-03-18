import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: Car[] = [];

  currentCar: Car;

  constructor(private carDetailService: CarDetailService,private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"]);
        console.log("carid : "+params["carId"]);
      }
      else{
        console.log("carid yok");
      }
    })
  }


  getCarDetailsById(carId:number) {
    this.carDetailService.getCarDetailsById(carId).subscribe((response) => {
      this.cars = response.data;
    });
  }
}