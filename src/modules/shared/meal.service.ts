import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, shareReplay, Subject, takeUntil } from 'rxjs';
import { RestaurantModel } from './models/restaurant.model';
import { MealPlansModel } from './models/meal-plan.model';

@Injectable()
export class MealService implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  private readonly _restaurants$: Observable<RestaurantModel[]>;

  constructor(private http: HttpClient) {
    this._restaurants$ = this.http
      .get<RestaurantModel[]>('https://svmeal.pegnu.dev/api/restaurant')
      .pipe(shareReplay(1), takeUntil(this._destroy$));
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get restaurants$(): Observable<RestaurantModel[]> {
    return this._restaurants$;
  }

  public getMealPlans$(restaurant: string): Observable<MealPlansModel> {
    return this.http.get<MealPlansModel>(
      `https://svmeal.pegnu.dev/api/restaurant/${restaurant}/meal`
    );
  }
}
