import { Recette } from './../models/recette';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  list: Recette[] = [];

  constructor(private service: ApiService) { }

  ngOnInit() {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe(r => {
      this.list = r;
    });
  }

  delete(id) {
    this.service.delete(id).subscribe(r => {
      this.getAll();
    });
  }

}
