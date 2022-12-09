import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantComponent } from '../modules/meal/restaurant/restaurant.component';
import { MealplanComponent } from '../modules/meal/mealplan/mealplan.component';

const routes: Routes = [
  { path: '', redirectTo: '/restaurants', pathMatch: 'full' },
  {
    path: 'restaurants',
    loadChildren: () =>
      import('../modules/meal/meal.module').then((m) => m.MealModule),
    component: RestaurantComponent,
  },
  {
    path: 'meal-plan/:restaurant',
    loadChildren: () =>
      import('../modules/meal/meal.module').then((m) => m.MealModule),
    component: MealplanComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
