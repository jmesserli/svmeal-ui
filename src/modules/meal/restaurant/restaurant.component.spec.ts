import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantComponent } from './restaurant.component';
import { instance, mock, when } from 'ts-mockito';
import { MealService } from '../../shared/meal.service';
import { EMPTY } from 'rxjs';
import { MaterialModule } from '../../material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('RestaurantComponent', () => {
  let component: RestaurantComponent;
  let fixture: ComponentFixture<RestaurantComponent>;

  beforeEach(async () => {
    const mealServiceMock = mock(MealService);
    when(mealServiceMock.restaurants$).thenReturn(EMPTY);

    await TestBed.configureTestingModule({
      imports: [MaterialModule, NoopAnimationsModule],
      declarations: [RestaurantComponent],
      providers: [
        { provide: MealService, useFactory: () => instance(mealServiceMock) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
