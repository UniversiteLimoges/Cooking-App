import { Instruction } from './../models/recette';
import { RecipeService } from './../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe, Ingredient } from '../models/recette';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  id = '';
  recip = new Recipe();
  titre = 'Ajout';
  types = ['link', 'details'];
  isEdit = false;
  constructor(private fb: FormBuilder, private route: ActivatedRoute
    , private service: RecipeService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.id = this.route.snapshot.paramMap.get('id');
    // because admin can update this, and we dont want his name in this recip
    if (this.id !== 'new') {
      this.isEdit = true,
      this.titre = 'Modification';
      this.service.getById(this.id).subscribe(r => {
        this.recip = r;
        this.createForm();
      });
    }
  }


  createForm() {
    this.myForm = this.fb.group({
      _id: this.recip._id,
      name: [this.recip.name, [Validators.required]],
      type: [this.recip.type, [Validators.required]],
      url: [this.recip.url, [Validators.required]],
      duration: [this.recip.duration, [Validators.required]],
      serving: [this.recip.serving, [Validators.required]],
      details: this.fb.group({
        ingredients: this.fb.array(this.recip.details.ingredients.map(i => this.fb.group(i))),
        instructions: this.fb.array(this.recip.details.instructions.map(i => this.fb.group(i))),
      }),
    });
  }

  get type() {
    return this.myForm.get('type') as FormControl;
  }

  get getIngredients(): FormArray {
    return this.myForm.get('details').get('ingredients') as FormArray;
  }

  get getInstructions(): FormArray {
    return this.myForm.get('details').get('instructions') as FormArray;
  }

  addIngredients() {
    this.getIngredients.push(this.fb.group(new Ingredient()));
  }

  addInstructions() {
    this.getInstructions.push(this.fb.group(new Instruction()));
  }

  deleteIngredient(i: number) {
    this.getIngredients.removeAt(i);
  }

  deleteInstructions(i: number) {
    this.getInstructions.removeAt(i);
  }

  submit(o: Recipe) {
    if (!this.isEdit) {
      this.service.post(o).subscribe(r => {
        console.log(o);
        this.router.navigate(['/list']);
      });
    } else {
      this.service.put(o._id, o).subscribe(r => {
        this.router.navigate(['/list']);
      });
    }
  }

}
