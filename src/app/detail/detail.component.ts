import { RecipeService } from './../services/recipe.service';
import { Recipe } from './../models/recette';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  recipe = new Recipe();
  constructor(private route: ActivatedRoute, private service: RecipeService) { }
  

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    this.service.getById(id).subscribe(r => {
      console.log(r);
      this.recipe = r;
    });
  }

}
