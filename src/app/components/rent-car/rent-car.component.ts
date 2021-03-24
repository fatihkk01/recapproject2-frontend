import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  carRentForm : FormGroup;
  currentCar:Car[]=[];
  currentPrice = 0;

  constructor(private formBuilder:FormBuilder,
     private toastrService:ToastrService,
     private carService:CarService,
     private activatedToute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedToute.params.subscribe((params)=>{
      this.createCarRentForm();
      if(params["carId"]){
        this.getCarById(params["carId"]);
      }
      else{
        this.toastrService.error("Payment transaction unsuccess","Error")
      }
    })
  }

  createCarRentForm(){
    this.carRentForm = this.formBuilder.group({
      carId:["",Validators.required],
      customerName:["",Validators.required],
      cardExpirationMonth:["",Validators.required],
      cardExpirationYear:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
      cardNumber:["",Validators.minLength(16)],
      cvCode:["",Validators.required]
    })
  }

  pay(){
    let rentCarModel = Object.assign({},this.carRentForm.value);
    console.log(rentCarModel);
     this.toastrService.success("Payment transaction is success","Success")
  }

  getCarById(carId:number){
    this.carService.getCarById(carId).subscribe((response)=>{
      this.currentCar = response.data;
    })
  }

}
