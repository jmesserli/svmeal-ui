import { Component, Input } from '@angular/core';
import { DietaryRestriction } from '../../shared/models/meal-plan.model';

@Component({
  selector: 'app-dietary-restriction',
  templateUrl: './dietary-restriction.component.html',
  styleUrls: ['./dietary-restriction.component.scss'],
})
export class DietaryRestrictionComponent {
  @Input()
  restriction?: DietaryRestriction;

  get icon(): string {
    if (!this.restriction) return '';

    return 'assets/img/' + this.restriction.toLowerCase() + '.png';
  }

  get alt(): string {
    if (!this.restriction) return '';

    return this.restriction + ' icon';
  }

  get tooltip(): string {
    switch (this.restriction) {
      case 'VEGAN':
        return 'Vegan: Auf Produkte und Zutaten tierischen Ursprungs wurde vollständig verzichtet.';
      case 'VEGETARIAN':
        return 'Vegetarisch: Dieses Menu beinhaltet weder Fleisch noch Fisch.';
      default:
        return '';
    }
  }
}
