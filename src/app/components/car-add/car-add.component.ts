import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-add',
  templateUrl: './car-add.component.html',
  styleUrls: ['./car-add.component.css']
})
export class CarAddComponent implements OnInit {

  carAddForm:FormGroup;

  colors:Color[] = [];
  currentColor:Color;

  brands:Brand[] = [];
  currentBrand:Brand;

  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private carService:CarService,
              private brandService:BrandService,
              private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
    this.createCarAddForm();
  }

  addCar(){
    if(this.carAddForm.valid){
      let carModel = Object.assign({},this.carAddForm.value);
      carModel.brandId = this.currentBrand.brandId;
      carModel.colorId = this.currentColor.colorId;
      this.carService.Add(carModel).subscribe((response)=>{
        
        this.toastrService.success(response.message,"Success");
      },responseError=>{
        if(responseError.error.Errors.length>0){
          for (let i = 0; i <responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage
              ,"Validation Error")
          }       
        } 
      });
    }
    else{
      this.toastrService.error("Form is missing","Error")
    }
  }

  createCarAddForm(){
    this.carAddForm = this.formBuilder.group({
      colorId:["",Validators.required],
      brandId:["",Validators.required],
      modelYear:["",Validators.required],
      dailyPrice:["",Validators.required],
      description:["",Validators.required]
    })
  }


  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  setCurrentColor(color:Color){
    this.currentColor = color;
    console.log(this.currentColor);
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
    console.log(this.currentBrand);
  }

}
