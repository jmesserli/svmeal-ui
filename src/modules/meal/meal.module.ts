import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealComponent } from './meal/meal.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    MealComponent
  ],
  imports: [
    SharedModule
  ]
})
export class MealModule { }
