

export class Ingredient {
  ingredientId = null;
  quantity = 0;
  // unit = '';
}

export class Instruction {
  content = '';
}

export class Detail {
  ingredients: Ingredient[] = [new Ingredient()];
  instructions: Instruction[] = [new Instruction()];
}


export class Recipe {
  _id = null;
  name = '';
  type = 'details' || 'link';
  details = new Detail();
  url = '';
  duration = 10;
  serving = 1;
  createdAt = '';
  updatedAt = '';
}
