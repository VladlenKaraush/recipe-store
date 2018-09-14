import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipeService";
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) {
  }

  private URL = 'https://angular-back.firebaseio.com/';
  private fileName = 'recipes.json';


  storeRecipes() {
    return this.http.put(this.URL + this.fileName, this.recipeService.getRecipes())
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL + this.fileName)
      .map(
        (recipes) => {
          for (let recipe of recipes) {
            if (!recipe['ingredients']) {
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        }
      )
  }
}
