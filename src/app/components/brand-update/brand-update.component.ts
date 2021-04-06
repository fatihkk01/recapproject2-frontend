import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { ActivatedRoute } from '@angular/router'; 

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brandUpdateForm:FormGroup;
  updatedBrand : Brand;
  brandId:number;

  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute,
              private brandService:BrandService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params)=>{
      if(params["brandId"]){
        console.log("brandId var");
        this.brandIdControl(params["brandId"]);
      }
      else{
        console.log("brandId yok");
      }
    })
    this.createBrandUpdateForm();
  }

  createBrandUpdateForm(){
    this.brandUpdateForm = this.formBuilder.group({
      brandName:["",Validators.required]
    })
  }


  updateBrand(){

    if(this.brandUpdateForm.valid){
      let brandUpdateModel = Object.assign({},this.brandUpdateForm.value);
      brandUpdateModel.brandId = Number(this.brandId);
      brandUpdateModel.brandName = String(brandUpdateModel.brandName).toLocaleUpperCase();

      this.brandService.Update(brandUpdateModel).subscribe(response=>{
        this.toastrService.success(response.message,"Success");
      },responseError=>{
        this.toastrService.error(responseError.message,"Error");
      })

    }
    else{
      this.toastrService.error("Form is missing","Error")
    }

  }

  brandIdControl(id:number){
    this.brandId =  id;
    return id;
  }

}
