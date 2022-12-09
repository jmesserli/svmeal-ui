import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { MealService } from '../../shared/meal.service';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  startWith,
  Subject,
  tap,
} from 'rxjs';
import { RestaurantModel } from '../../shared/models/restaurant.model';

@Component({
  selector: 'app-meal',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss'],
})
export class RestaurantComponent implements OnDestroy {
  private readonly _destroy$ = new Subject<void>();

  ready$ = new BehaviorSubject(false);

  filter$ = new Subject<string>();

  restaurants$: Observable<RestaurantModel[]>;

  @ViewChild('filter', { read: ElementRef })
  private filter!: ElementRef<HTMLInputElement>;

  constructor(private mealService: MealService) {
    this.restaurants$ = combineLatest([
      this.mealService.restaurants$.pipe(
        tap(() => this.ready$.next(true)),
        map((restaurants) =>
          restaurants.sort((a, b) => a.name.localeCompare(b.name))
        )
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
      })
    );
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
      }
    }

    this.filter$.next(this.filter.nativeElement.value);
  }
}
