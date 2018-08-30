import {
  Component, OnDestroy,
  OnInit, ViewChild
} from '@angular/core';

import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from "../shoppingListService";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') slForm: NgForm;
  editIndex: number;
  editMode = false;
  editIngredient: Ingredient;
  subscription: Subscription;

  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
    this.subscription = this.shoppingListService.startEdit.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editIndex = index;
        this.editIngredient = this.shoppingListService.getIngredientByIndex(index);
        this.slForm.setValue({
          name: this.editIngredient.name,
          amount: this.editIngredient.amount
        })
      });

  }

  onSubmit(form: NgForm) {
    const ingName = form.value.name;
    const ingAmount = form.value.amount;
    const newIngredient = new Ingredient(ingName, ingAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editIndex, newIngredient);
    }
    else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.clear();
  }

  clear(){
    this.slForm.resetForm();
    this.editMode = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete(){
    this.shoppingListService.deleteIngredientByIndex(this.editIndex);
    this.clear();
  }


}
