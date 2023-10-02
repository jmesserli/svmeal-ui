import { NgModule } from '@angular/core';
import { RestaurantComponent } from './restaurant/restaurant.component';
import { SharedModule } from '../shared/shared.module';
import { MealplanComponent } from './mealplan/mealplan.component';
import { DietaryRestrictionComponent } from './dietary-restriction/dietary-restriction.component';

@NgModule({
  declarations: [RestaurantComponent, MealplanComponent, DietaryRestrictionComponent],
  imports: [SharedModule],
})
export class MealModule {}
