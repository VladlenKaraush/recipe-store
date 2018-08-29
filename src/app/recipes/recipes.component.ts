import {Component, OnInit} from '@angular/core';

import {RecipeService} from "./recipeService";

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
  providers: [RecipeService]
})
export class RecipesComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }


}