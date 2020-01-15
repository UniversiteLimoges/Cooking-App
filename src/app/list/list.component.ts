import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recette';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];

  constructor(private service: RecipeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
    // this.service2.getAll().subscribe(r => {
    //   console.log(r)
    // });
    console.log('dzdzdzdzd')
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

  // delete(id) {
    
  // }

  delete(id): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '250px', 
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.service.delete(id).subscribe(r => {
          this.getAll();
        });
      }
    });
  }

}
