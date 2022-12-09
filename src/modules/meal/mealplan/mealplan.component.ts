import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { RestaurantModel } from '../../shared/models/restaurant.model';
import { MealService } from '../../shared/meal.service';
import { MealPlansModel } from '../../shared/models/meal-plan.model';

@Component({
  selector: 'app-mealplan',
  templateUrl: './mealplan.component.html',
  styleUrls: ['./mealplan.component.scss'],
})
export class MealplanComponent implements OnInit, OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  restaurantShort$!: Observable<string>;
  restaurant$!: Observable<RestaurantModel>;
  mealPlans$!: Observable<MealPlansModel>;
  sortedMealPlanDays$!: Observable<string[]>;

  constructor(
    private route: ActivatedRoute,
    private mealService: MealService
  ) {}

  ngOnInit(): void {
    this.restaurantShort$ = this.route.paramMap.pipe(
      map((params) => params.get('restaurant') ?? ''),
      takeUntil(this._destroy$)
    );

    this.restaurant$ = this.restaurantShort$.pipe(
      switchMap((rest) =>
        this.mealService.restaurants$.pipe(
          map((restaurants) => restaurants.filter((r) => r.shortcut === rest)),
          map((rests) => rests[0])
        )
      )
    );

    this.mealPlans$ = this.restaurantShort$.pipe(
      switchMap((rest) => this.mealService.getMealPlans$(rest))
    );

    this.sortedMealPlanDays$ = this.mealPlans$.pipe(
      map((mealPlans) => Object.keys(mealPlans.plans).sort())
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
