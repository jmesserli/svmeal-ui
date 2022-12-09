import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SharedModule } from '../shared/shared.module';
import { MealplanComponent } from './mealplan/mealplan.component';

@NgModule({
  declarations: [RestaurantComponent, MealplanComponent],
  imports: [SharedModule],
})
export class MealModule {}
