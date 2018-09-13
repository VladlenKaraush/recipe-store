import {Injectable} from "@angular/core";
import {RecipeService} from "../recipes/recipeService";
import {Recipe} from "../recipes/recipe.model";
import 'rxjs/Rx';
import {AuthService} from "../auth/auth.service";
import {HttpClient, HttpParams} from "@angular/common/http";

@Injectable()
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService,
              private auth: AuthService) {
  }

  private URL = 'https://angular-back.firebaseio.com/';
  private fileName = 'recipes.json';
  private params = new HttpParams().set('auth', this.auth.getToken());

  storeRecipes() {
      return this.http.put(this.URL + this.fileName, this.recipeService.getRecipes(),{
        params: this.params
      })
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(this.URL + this.fileName,{
      params: this.params
    })
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
