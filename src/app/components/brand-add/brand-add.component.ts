import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-add',
  templateUrl: './brand-add.component.html',
  styleUrls: ['./brand-add.component.css']
})
export class BrandAddComponent implements OnInit {

  brandAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private brandService:BrandService,
              private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.createBrandAddForm();
  }

  createBrandAddForm(){
    this.brandAddForm = this.formBuilder.group({
      brandName : ["",Validators.required]
    })
  }

  addBrand(){
    if(this.brandAddForm.valid){
      let brandModel = Object.assign({},this.brandAddForm.value);
      brandModel.brandName = String(brandModel.brandName).toLocaleUpperCase();
      this.Add(brandModel);
      console.log(brandModel);
    }
    else{
      this.toastrService.error("From is missing","Error");
    }
  }

  Add(brand:Brand){
    this.brandService.Add(brand).subscribe((response)=>{
      this.toastrService.success(response.message,"Success");
    },(responseError)=>{
      this.toastrService.error(responseError.message,"Error");
    })
  }

}
