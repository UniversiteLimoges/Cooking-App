import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recette';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];

  constructor(private service: RecipeService) { }

  ngOnInit() {
    this.getAll();
    // this.service2.getAll().subscribe(r => {
    //   console.log(r)
    // });

    this.service.search('as').subscribe(r => {
      console.log('teast search reslut => ');
      console.log(r);
    });
  }

  getAll() {
    this.service.getAll().subscribe(r => {
      console.log(r);
      this.list = r;
    });
  }

  delete(id) {
    this.service.delete(id).subscribe(r => {
      this.getAll();
    });
  }

}
