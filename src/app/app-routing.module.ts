import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarComponent } from './components/car/car.component';
import { ColorComponent } from './components/color/color.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  {path:"", pathMatch:"full",  component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/rental",component:RentalComponent},
  {path:"cars/brand", component:BrandComponent},
  {path:"cars/color", component:ColorComponent},
  {path:"cars/rentcar/:carId",component:RentCarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/carDetails/:carId",component:CarDetailsComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
