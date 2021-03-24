import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarComponent } from './components/car/car.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { NaviComponent } from './components/navi/navi.component';
import { HttpClientModule } from '@angular/common/http';
import { CarDetailsComponent } from './components/car-details/car-details.component';
import { FilterPipeCarPipe } from './pipes/carPipe/filter-pipe-car.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { CarAddComponent } from './components/car-add/car-add.component';

@NgModule({
  declarations: [
    AppComponent,
    CarComponent,
    BrandComponent,
    ColorComponent,
    CustomerComponent,
    RentalComponent,
    NaviComponent,
    CarDetailsComponent,
    FilterPipeCarPipe,
    CarFilterComponent,
    RentCarComponent,
    CarAddComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut:2000,
      progressBar:true,
      positionClass:"toast-bottom-right"

    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
