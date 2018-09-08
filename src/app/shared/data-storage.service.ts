import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {RecipeService} from "../recipes/recipeService";
import {Response} from "@angular/http";
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";

@Injectable()
export class DataStorageService {
  constructor(private http: Http,
              private recipeService: RecipeService,
              private auth: AuthService) {
  }

  private URL = 'https://angular-back.firebaseio.com/';

  storeRecipes() {
    const token = this.auth.getToken();
      return this.http.put(this.URL + 'recipes.json?auth=' + token, this.recipeService.getRecipes())
  }

  fetchRecipes() {
    const token = this.auth.getToken();
    debugger;
    return this.http.get(this.URL + 'recipes.json?auth=' + token)
      .map(
        (response: Response) => {
          const recipes: Recipe[] = response.json();
          for(let recipe of recipes){
            if(!recipe['ingredients']){
              recipe.ingredients = [];
            }
          }
          return recipes;
        }
      )
      .subscribe(
      (recipes: Recipe[]) =>{
        this.recipeService.setRecipes(recipes);
      }
    )
  }
}
