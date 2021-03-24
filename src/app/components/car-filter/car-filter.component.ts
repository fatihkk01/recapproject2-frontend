import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';
import {ActivatedRoute , Router} from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[] = [];
  colors:Color[] = [];

  currentColor:Color;
  currentBrand:Brand;

  constructor(private brandService:BrandService,
    private colorService:ColorService,
    private _router:Router,
    private toastrService:ToastrService) { }

  ngOnInit(): void {
    this.getColors();
    this.getBrands();
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

  doToFilter(){
    if(this.currentBrand!=null && this.currentColor!=null){
      this._router.navigate(["/cars/brand/"+this.currentBrand.brandId+"/color/"+this.currentColor.colorId]);
      this.toastrService.success("Cars listed","Success");
    }
    else if(this.currentBrand!=null){
      this._router.navigate(["/cars/brand/"+this.currentBrand.brandId]);
      this.toastrService.success("Cars listed","Success");
    }
    else if(this.currentColor!=null){
      this._router.navigate(["/cars/color/"+this.currentColor.colorId]);
      this.toastrService.success("Cars listed","Success");
    }

  }


  removeFilter(){
    this._router.navigate(["/cars"]);
    this.toastrService.success("Filter removed","Success")
  }

}
