import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { Recipe } from '../models/recette';
import { MatDialog } from '@angular/material';
import { ConfirmDeleteComponent } from '../confirm-delete/confirm-delete.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Recipe[] = [];
  nom = new FormControl('');
  linkImage = '../../assets/link.png';
  constructor(private service: RecipeService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(r => {
      this.list = r;
    });
  }

  search() {
    this.service.search(this.nom.value).subscribe(r => {
      this.list = r;
    });
  }

  reset() {
    this.nom.setValue('');
    this.getAll();
  }

  delete(id): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.service.delete(id).subscribe(r => {
          this.getAll();
        });
      }
    });
  }

}
