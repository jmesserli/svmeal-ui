export interface MealPlansModel {
  plans: Record<string, MealPlanModel>;
}

export interface MealPlanModel {
  date: string;

  offers: OfferModel[];
}

export interface OfferModel {
  title: string;
  trimmings: string[];
  price: {
    internalPrice: number;
    externalPrice: number;
  };
  provenance: string;
  dietaryRestriction: 'VEGETARIAN' | 'VEGAN';
}
