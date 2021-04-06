import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms"
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router'; 
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  updatedColor:Color;
  colorId:number;
  constructor(private formBuilder:FormBuilder,
              private colorService:ColorService,
              private toastrService:ToastrService,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void { 
    this.activatedRoute.params.subscribe((params)=>{
      if(params["colorId"]){
        console.log("colorId var")
        this.colorIdControl(params["colorId"]);
      }
      else{
        console.log("colorId yok")
      }
    })
    this.createColorUpdateForm();
   
  }

  createColorUpdateForm(){
    this.colorUpdateForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  updateColor(){
    if(this.colorUpdateForm.valid){
      let colorUpdateModel = Object.assign({},this.colorUpdateForm.value);
      console.log(this.colorId)
      colorUpdateModel.colorName = String(colorUpdateModel.colorName).toLocaleUpperCase();
      colorUpdateModel.colorId = Number(this.colorId);     
      this.colorService.Update(colorUpdateModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Success");
      },(responseError)=>{
        this.toastrService.error(responseError.message,"Error");
      })

    }
    else{
      this.toastrService.error("Error")
    }
  }

  colorIdControl(id:number){
    this.colorId = id;
    return id;
  }

}
