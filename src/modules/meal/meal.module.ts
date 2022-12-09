import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './meal/restaurant.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RestaurantComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MealModule { }
