import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealComponent } from '../modules/meal/meal/meal.component';

const routes: Routes = [
  { path: '', redirectTo: '/meal-plan', pathMatch: 'full' },
  {
    path: 'meal-plan',
    loadChildren: () => import('../modules/meal/meal.module').then(m => m.MealModule),
    component: MealComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
