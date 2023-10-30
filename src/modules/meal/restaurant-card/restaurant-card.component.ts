import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RestaurantModel} from "../../shared/models/restaurant.model";

@Component({
  selector: 'app-restaurant-card',
  templateUrl: './restaurant-card.component.html',
  styleUrls: ['./restaurant-card.component.scss']
})
export class RestaurantCardComponent {
  @Input() restaurant?: RestaurantModel;
  @Output() selected: EventEmitter<RestaurantModel> = new EventEmitter<RestaurantModel>();
}
