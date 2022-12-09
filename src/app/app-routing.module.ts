import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimetableComponent } from '../modules/timetable/timetable/timetable.component';

const routes: Routes = [
  { path: '', redirectTo: '/timetable', pathMatch: 'full' },
  {
    path: 'timetable',
    loadChildren: () => import('../modules/timetable/timetable.module').then(m => m.TimetableModule),
    component: TimetableComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
