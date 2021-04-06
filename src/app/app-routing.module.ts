import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { LoginComponent } from './components/login/login.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"", pathMatch:"full",  component:CarComponent},
  {path:"cars", component:CarComponent},
  {path:"brands",component:BrandComponent},
  {path:"colors",component:ColorComponent},
  {path:"cars/add",component:CarAddComponent,canActivate:[LoginGuard]},
  {path:"brand/add",component:BrandAddComponent,canActivate:[LoginGuard]},
  {path:"color/add",component:ColorAddComponent,canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent,canActivate:[LoginGuard]},
  {path:"colors/update/:colorId",component:ColorUpdateComponent,canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent,canActivate:[LoginGuard]},
  {path:"cars/rental",component:RentalComponent},
  {path:"cars/brand", component:BrandComponent},
  {path:"cars/color", component:ColorComponent},
  {path:"cars/rentcar/:carId",component:RentCarComponent},
  {path:"cars/brand/:brandId", component:CarComponent},
  {path:"cars/color/:colorId", component:CarComponent},
  {path:"cars/carDetails/:carId",component:CarDetailsComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:CarComponent},
  {path:"login", component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
