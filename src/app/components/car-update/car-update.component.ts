import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';
import { Car } from 'src/app/models/car';
import { CarUpdate } from 'src/app/models/carUpdate';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  carUpdateForm : FormGroup;

  //Car for Table
  carDetail : Car;

  //Select List Data

  brands:Brand [];

  colors:Color [];
  

  //Current Select Items

  currentBrand:Brand;

  currentColor:Color;


  constructor(private formBuilder:FormBuilder,
              private carService:CarService,
              private colorService:ColorService,
              private brandService:BrandService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
    this.getCarDetails();
    this.createCarUpdateForm();

  }

  createCarUpdateForm(){
    this.carUpdateForm = this.formBuilder.group({
      brandId:["",Validators.required],
      colorId:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required],
      modelYear:["",Validators.required]
    })
  }

  UpdateCar(){

    if(this.carUpdateForm.valid){
      
      let carUpdateModel = Object.assign({},this.carUpdateForm.value);
      
      this.activatedRoute.params.subscribe((params)=>{
        carUpdateModel.carId = Number(params["carId"]);
      })

      this.carService.Update(carUpdateModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Success");
      },(responseError)=>{
        this.toastrService.error(responseError.message,"Error");
      });
    }
    else{
      this.toastrService.error("Form is not filled","Error");
    }


  }

  getBrands(){
    this.brandService.getBrands().subscribe((response)=>{
      this.brands = response.data;
    });
  }

  getColors(){
    this.colorService.getColors().subscribe((response)=>{
      this.colors = response.data;
    })
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    console.log(this.currentBrand);
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
    console.log(this.currentColor);
  }

  getCarDetails(){
    this.activatedRoute.params.subscribe((params)=>{
      if(params["carId"]){
        this.carService.getCarDetailsByCarId(Number(params["carId"])).subscribe((response)=>{
          this.carDetail = response.data[0];
        })
      }
    })
  }
}
