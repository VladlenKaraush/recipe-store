import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';
import {ShoppingListService} from "../../shopping-list/shoppingListService";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RecipeService} from "../recipeService";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService,
              private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.recipe = this.recipeService.getRecipeById(+params['id']);
      }
    );
  }

  sendToShoppingList(){
    this.shoppingListService.addIngredients(this.recipe.ingredients);
  }

  onDelete(){
    this.recipeService.deleteRecipeById(this.recipe);
    this.router.navigate(['recipes/']);
  }

}
