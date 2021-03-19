import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { CarImageService } from 'src/app/services/car-image.service';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.css'],
})
export class CarDetailsComponent implements OnInit {
  cars: Car[] = [];
  carImages:CarImage[] = [];
  currentCar: Car;

  constructor(private carDetailService: CarDetailService,
              private carImageService:CarImageService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsById(params["carId"]);
        this.getCarImagePathById(params["carId"]);
        console.log(this.carImages[0])
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

  getCarImagePathById(carId:number){
      this.carImageService.getCarImageByCarId(carId).subscribe((response)=>{
        this.carImages = response.data;
      })
  }

  getCurrentImageClass(image:CarImage){
    if(image.imagePath==this.carImages[0].imagePath){
      return "carousel-item active"
    } else {
      return "carousel-item"
    }
  }

  getButtonClass(image:CarImage){
    if(image==this.carImages[0]){
      return "active"
    } else {
      return ""
    }
  }

}