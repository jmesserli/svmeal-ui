import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { MealService } from './meal.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [],
  providers: [MealService],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ],
  exports: [
    CommonModule,
    HttpClientModule,
    MaterialModule
  ]
})
export class SharedModule {
}
