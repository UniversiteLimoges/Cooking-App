import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';


const API_URL = environment.url + 'ingredients';
@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  constructor(private http: HttpClient) { }
  // http://mymenu-api-public.matthieugiraud.fr/recipes?name[$search]=fa&$limit=10$skip=2
  post(o: any) {
    return this.http.post( API_URL, o);
  }
  // updat
  put(id, model: any) {
    return this.http.put(`${API_URL}/${id}`, model);
  }
  // list
  getAll() {
  return this.http.get(API_URL);
  }

  // list
  getPage(startIndex, pageSize) {
    return this.http.get(`${API_URL}?&$skip=${startIndex}$limit=${pageSize}`);
  }
  // get recette
  get(id) {
    return this.http.get(`${API_URL}/${id}`);
  }
  // delete
  delete(id: number) {
    return this.http.delete(`${API_URL}/${id}`);
  }
}
