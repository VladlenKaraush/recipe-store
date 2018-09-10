import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "./shopping-list.component";
import {ShoppingEditComponent} from "./shopping-edit/shopping-edit.component";
import {SharedModule} from "../shared/shared.module";
import {ShoppingListRoutesModule} from "./shopping-list-routes.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ShoppingListRoutesModule,
    SharedModule,
  ]
})
export class ShoppingListModule{

}
