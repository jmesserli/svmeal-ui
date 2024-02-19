import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  Subject,
  switchMap,
  takeUntil,
} from 'rxjs';
import { RestaurantModel } from '../../shared/models/restaurant.model';
import { MealService } from '../../shared/meal.service';
import { MealPlansModel } from '../../shared/models/meal-plan.model';
import { DateTime } from 'luxon';

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
    private mealService: MealService,
  ) {}

  ngOnInit(): void {
    this.restaurantShort$ = this.route.paramMap.pipe(
      map((params) => params.get('restaurant') ?? ''),
      distinctUntilChanged(),
      takeUntil(this._destroy$),
    );

    this.restaurant$ = this.restaurantShort$.pipe(
      switchMap((rest) =>
        this.mealService.restaurants$.pipe(
          map((restaurants) => restaurants.filter((r) => r.shortcut === rest)),
          map((rests) => rests[0]),
        ),
      ),
      shareReplay(1),
      takeUntil(this._destroy$),
    );

    this.mealPlans$ = this.restaurantShort$.pipe(
      switchMap((rest) => this.mealService.getMealPlans$(rest)),
      shareReplay(1),
      takeUntil(this._destroy$),
    );

    this.sortedMealPlanDays$ = this.mealPlans$.pipe(
      map((mealPlans) => Object.keys(mealPlans.plans).sort()), // NOSONAR typescript:S2871
    );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  isToday(date: string): boolean {
    const now = DateTime.now();
    return DateTime.fromISO(date).hasSame(now, 'day');
  }
}
