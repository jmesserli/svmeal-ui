import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealplanComponent } from './mealplan.component';
import { ActivatedRoute } from '@angular/router';
import { instance, mock } from 'ts-mockito';
import { MealService } from '../../shared/meal.service';
import { EMPTY } from 'rxjs';

describe('MealplanComponent', () => {
  let component: MealplanComponent;
  let fixture: ComponentFixture<MealplanComponent>;

  beforeEach(async () => {
    const mealServiceMock = mock(MealService);

    await TestBed.configureTestingModule({
      declarations: [MealplanComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { paramMap: EMPTY },
        },
        { provide: MealService, useFactory: () => instance(mealServiceMock) },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MealplanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
