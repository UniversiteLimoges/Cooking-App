import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recette } from '../models/recette';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  o = new Recette();
  constructor(private route: ActivatedRoute, private service: ApiService) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');

    this.service.getById(id).subscribe(r => {
      this.o = r;
    });
  }

}
