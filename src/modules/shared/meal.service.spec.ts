import { MealService } from './meal.service';
import { anything, instance, mock, when } from 'ts-mockito';
import { HttpClient } from '@angular/common/http';
import { EMPTY } from 'rxjs';

describe('MealService', () => {
  let service: MealService;

  beforeEach(() => {
    const httpMock = mock(HttpClient);
    // @ts-ignore
    when(httpMock.get(anything())).thenReturn(EMPTY);

    service = new MealService(instance(httpMock));
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
