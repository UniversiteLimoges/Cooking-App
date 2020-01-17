export class Ingredient {
  ingredientId = null;
  quantity = 0;
  // unit = '';
}

export class Instruction {
  content = '';
}

export class Recipe {
  _id = null;
  duration = 10;
  serving = 1;
  name = '';
  type = 'details' || 'link';
  url = '';
  details = new Detail();
  createdAt = '';
  updatedAt = '';
}

export class Detail {
  ingredients: Ingredient[] = [new Ingredient()];
  instructions: Instruction[] = [new Instruction()];
}
