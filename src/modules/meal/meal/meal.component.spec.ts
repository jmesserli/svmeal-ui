import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MealComponent } from './meal.component';

describe('TimetableComponent', () => {
  let component: MealComponent;
  let fixture: ComponentFixture<MealComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MealComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
