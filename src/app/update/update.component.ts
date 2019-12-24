import { Recette } from './../models/recette';
import { ApiService } from './../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
  myForm: FormGroup;
  id = 0;
  o = new Recette();
  titre = 'Ajout';
  constructor(private fb: FormBuilder, private route: ActivatedRoute
    , private service: ApiService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.id = +this.route.snapshot.paramMap.get('id');
    // because admin can update this, and we dont want his name in this recip
    if (this.id !== 0) {
      this.titre = 'Modification'
      this.service.getById(this.id).subscribe(r => {
        this.o = r;
        this.createForm();
      });
    }
  }


  createForm() {
    this.myForm = this.fb.group({
      id: this.o.id,
      titre: [this.o.titre, [Validators.required]],
      description: [this.o.description, [Validators.required]],
      imageUrl: [this.o.imageUrl, [Validators.required]],
      etaps: [this.o.etaps, [Validators.required]],
      ingredients: [this.o.ingredients, [Validators.required]],
    });
  }

  submit(o: Recette) {
    if (this.id === 0) {
      this.service.post(o).subscribe(r => {
        this.router.navigate(['/list']);
      });
    } else {
      this.service.put(o.id, o).subscribe(r => {
        this.router.navigate(['/list']);
      });
    }
  }

}
