import {NgModule} from "@angular/core";
import {RecipesComponent} from "./recipes.component";
import {RecipeDetailComponent} from "./recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "./recipe-edit/recipe-edit.component";
import {RecipeItemComponent} from "./recipe-list/recipe-item/recipe-item.component";
import {RecipeListComponent} from "./recipe-list/recipe-list.component";
import {DefaultRecipeComponent} from "./default-recipe/default-recipe.component";
import {DropdownDirective} from "../shared/dropdown.directive";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {RecipeRoutesModule} from "./recipe-routes.module";

@NgModule({
  declarations:[
    RecipesComponent,
    RecipeDetailComponent,
    RecipeEditComponent,
    RecipeItemComponent,
    RecipeListComponent,
    DefaultRecipeComponent,
    DropdownDirective
  ],
  imports:[
    CommonModule,
    ReactiveFormsModule,
    RecipeRoutesModule,
  ]
})
export class RecipesModule{

}
