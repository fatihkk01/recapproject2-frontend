import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup,FormBuilder,FormControl,Validators} from "@angular/forms";
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { ToastrService } from 'ngx-toastr';
import { RentalControlModel } from 'src/app/models/rentalControlModel';
import { RentalService } from 'src/app/services/rental.service';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css']
})
export class RentCarComponent implements OnInit {

  carRentForm:FormGroup;
  customers:Customer[];

  rentInfo:RentalControlModel ={carId:0,rentDate:Date.now(),returnDate:Date.now(),customerId:1};

  carId:number;

  currentCustomer:Customer;


  constructor(private formBuilder:FormBuilder,
     private toastrService:ToastrService,
     private rentalService:RentalService,
     private customerService:CustomerService,
     private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getCustomers();
    this.createCarRentForm();
  }

  createCarRentForm(){
    this.carRentForm = this.formBuilder.group({
      customerId:["",Validators.required],
      rentDate:["",Validators.required],
      returnDate:["",Validators.required],
      cardNumber:["",Validators.required],
      cardExpirationMonth:["",Validators.required],
      cardExpirationYear:["",Validators.required],
      cardCvvNumber:["",Validators.required]
    })
  }

  rentCar(){
    if(this.carRentForm.valid){
      let rentCarModel = Object.assign({},this.carRentForm.value);
      this.activatedRoute.params.subscribe((params)=>{
        if(params["carId"]){
          this.rentInfo.carId = Number(params["carId"]);
          this.rentInfo.customerId = rentCarModel.customerId;
          this.rentInfo.rentDate = rentCarModel.rentDate;
          this.rentInfo.returnDate = rentCarModel.returnDate;
          this.rentalService.add(this.rentInfo).subscribe((response)=>{
            this.toastrService.success(response.message,"Success");
          },(responseError)=>{
            this.toastrService.error(responseError.error.message,"Error");
          })
        }
      })
    }
    else{
      this.toastrService.error("Form is not filled","Error");
    }
  }

  getCustomers(){
    this.customerService.getCustomers().subscribe((response)=>{
      this.customers = response.data;
    })
  }
  
  setCurrentCustomer(customer:Customer){
    this.currentCustomer = customer;
  }

}
