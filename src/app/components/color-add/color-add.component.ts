import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder, FormControl, Validators} from "@angular/forms";
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder,
              private toastrService:ToastrService,
              private colorService:ColorService) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required]
    })
  }

  addColor(){
    if(this.colorAddForm.valid){
      let colorModel = Object.assign({},this.colorAddForm.value);
      colorModel.colorName = String(colorModel.colorName).toLocaleUpperCase();
      this.Add(colorModel);
      console.log(colorModel);
    }
  }

  Add(color:Color){
    this.colorService.Add(color).subscribe((response)=>{
      this.toastrService.success(response.message,"Success");
    },(responseError)=>{
      this.toastrService.error(responseError.message,"Error");
    })
  }

}
