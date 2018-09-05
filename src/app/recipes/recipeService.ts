import {Recipe} from "./recipe.model";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";


export class RecipeService{

  recipesChanged = new Subject<Recipe[]>();
  private recipeID = 0;


  private recipes: Recipe[] = [
    new Recipe(
      this.recipeID++,
      'A Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('apple', 10),
        new Ingredient('water',1)
      ]),
    new Recipe(
      this.recipeID++,
      'Another Test Recipe',
      'This is simply a test',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg',
      [
        new Ingredient('ground beef', 5),
        new Ingredient('salt',0.001)
      ])
  ];

  getRecipes(){
    return this.recipes.slice();
  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  
  getRecipeById(id: number){
    return this.recipes.find(el => el.id == id);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(id: number, recipe: Recipe){
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  getID(){
    return this.recipeID++;
  }

  deleteRecipeById(recipe: Recipe){
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
    this.recipesChanged.next(this.recipes.slice());
}


}
