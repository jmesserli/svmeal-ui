import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable/timetable.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    TimetableComponent
  ],
  imports: [
    SharedModule
  ]
})
export class TimetableModule { }
