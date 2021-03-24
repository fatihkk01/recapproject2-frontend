  
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute ,Router } from '@angular/router';
import { Brand } from 'src/app/models/brand';
import { Car } from 'src/app/models/car';
import { BrandService } from 'src/app/services/brand.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {
  cars: Car[] = [];
  brands:Brand[] = [];
  currentBrand:Brand;
  currentCar:Car;
  //[(ngModel)] ile html deki filterText id li form elemanını .ts uzantılı dosyadaki filterText değişkeni ile eşleştirdik
  filterText = ""; 

  constructor(private brandService:BrandService,private _router: Router, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getBrands();
      }
      else{
        this.getBrands();
      }
      
    })
  }

  getBrands(){
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

  routingBrand(brand:Brand){
    this._router.navigate(['/cars/brand/{{brand.brandId}}']);
  }

  setCurrentBrand(brand:Brand){
    this.currentBrand = brand;
  }


  getCurrentBrandClass(brand:Brand){
    if(brand == this.currentBrand){
      return "list-group-item active";
    }
    else{
      return "list-group-item";
    }
  }

  addToCart(car:Car){
    console.log(car);
  } 

}