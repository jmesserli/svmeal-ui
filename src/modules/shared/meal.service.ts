import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  catchError,
  Observable,
  of,
  shareReplay,
  Subject,
  takeUntil,
  throwError,
} from 'rxjs';
import { RestaurantModel } from './models/restaurant.model';
import { MealPlansModel } from './models/meal-plan.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class MealService implements OnDestroy {
  private readonly apiBaseUrl = 'https://svmeal.pegnu.dev/api';
  private readonly _destroy$ = new Subject<void>();

  private readonly _restaurants$: Observable<RestaurantModel[]>;

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar,
  ) {
    this._restaurants$ = this.http
      .get<RestaurantModel[]>(`${this.apiBaseUrl}/restaurant`)
      .pipe(
        shareReplay(1),
        catchError((e, c) => {
          this.snackBar.open(
            `Error loading restaurants (HTTP ${
              (e as HttpErrorResponse).status
            }), please try again later.`,
            'Close',
            { duration: 5000 },
          );
          return [];
        }),
        takeUntil(this._destroy$),
      );
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  get restaurants$(): Observable<RestaurantModel[]> {
    return this._restaurants$;
  }

  public getMealPlans$(restaurant: string): Observable<MealPlansModel> {
    return this.http
      .get<MealPlansModel>(`${this.apiBaseUrl}/restaurant/${restaurant}/meal`)
      .pipe(
        catchError((err, caught) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status == 404) {
              return of({ plans: {} } as MealPlansModel);
            }

            this.snackBar.open(
              'Error loading meal plans, please try again later. (HTTP ' +
                err.status +
                ')',
              'Close',
              { duration: 5000 },
            );
          }

          return throwError(() => err);
        }),
      );
  }
}
