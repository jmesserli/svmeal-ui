import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MealService } from '../../shared/meal.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';
import { RestaurantModel } from '../../shared/models/restaurant.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-meal',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  private currentRestaurants: RestaurantModel[] = [];

  private currentFavoriteRestaurants: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);

  ready$ = new BehaviorSubject(false);

  filter$ = new Subject<string>();

  restaurants$: Observable<RestaurantModel[]>;

  favoriteRestaurants$: Observable<RestaurantModel[]>;

  @ViewChild('filter', { read: ElementRef })
  private filter!: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    mealService: MealService,
  ) {
    this.restaurants$ = combineLatest([
      mealService.restaurants$.pipe(
        tap(() => this.ready$.next(true)),
        map((restaurants) =>
          restaurants.sort((a, b) => a.name.localeCompare(b.name)),
        ),
      ),
      this.filter$.pipe(startWith('')),
    ]).pipe(
      map(([restaurants, filter]) => {
        return restaurants.filter((restaurant) => {
          return (
            restaurant.name.toLowerCase().includes(filter.toLowerCase()) ||
            restaurant.shortcut.toLowerCase().includes(filter.toLowerCase())
          );
        });
      }),
      tap((restaurants) => (this.currentRestaurants = restaurants)),
    );

    const favRestaurantIdsString = localStorage.getItem(
      'svmeal.favoriteRestaurants',
    );
    if (favRestaurantIdsString != null) {
      this.currentFavoriteRestaurants.next(JSON.parse(favRestaurantIdsString));
    }

    this.favoriteRestaurants$ = combineLatest([
      mealService.restaurants$,
      this.currentFavoriteRestaurants,
    ]).pipe(
      map(([restaurants, favoriteRestaurantIds]) => {
        const favRestaurants: RestaurantModel[] = [];

        for (const restaurantShort of favoriteRestaurantIds) {
          const restaurant = restaurants.find(
            (restaurant) => restaurant.shortcut === restaurantShort,
          );
          if (restaurant != null) {
            favRestaurants.push(restaurant);
          }
        }

        return favRestaurants;
      }),
    );

    this.currentFavoriteRestaurants
      .pipe(takeUntil(this._destroy$))
      .subscribe((favRestaurants) => {
        localStorage.setItem(
          'svmeal.favoriteRestaurants',
          JSON.stringify(favRestaurants),
        );
      });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  onFilterChanged(event?: Event) {
    if (event instanceof KeyboardEvent) {
      if (event.key === 'Escape') {
        this.filter.nativeElement.value = '';
        this.filter$.next('');

        return;
      } else if (event.key === 'Enter') {
        if (this.currentRestaurants.length === 1) {
          this.openRestaurant(this.currentRestaurants[0]);
        }
        return;
      }
    }

    this.filter$.next(this.filter.nativeElement.value);
  }

  openRestaurant(restaurant: RestaurantModel) {
    if (this.currentFavoriteRestaurants.value.includes(restaurant.shortcut)) {
      // upgrade to next higher place
      const favRestaurants = this.currentFavoriteRestaurants.value;
      const index = favRestaurants.indexOf(restaurant.shortcut);
      if (index !== 0) {
        const temp = favRestaurants[index - 1];
        favRestaurants[index - 1] = favRestaurants[index];
        favRestaurants[index] = temp;
        this.currentFavoriteRestaurants.next(favRestaurants);
      }
    } else {
      // insert at fourth, last place
      const favRestaurants = this.currentFavoriteRestaurants.value;
      favRestaurants.splice(3, 1, restaurant.shortcut);
      this.currentFavoriteRestaurants.next(favRestaurants);
    }

    this.router.navigate(['/', 'meal-plan', restaurant.shortcut]);
  }
}
