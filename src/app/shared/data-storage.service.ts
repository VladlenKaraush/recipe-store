import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipeService";
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
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
    return this.http.get<Recipe[]>(this.URL + 'recipes.json?auth=' + token)
      .map(
        (recipes) => {
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
