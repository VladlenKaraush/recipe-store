import { Component} from '@angular/core';
import {DataStorageService} from "../../shared/data-storage.service";
import {AuthService} from "../../auth/auth.service";
import {HttpResponse} from "@angular/common/http";
import {Recipe} from "../../recipes/recipe.model";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private dataStorage: DataStorageService,
              public authService: AuthService){


  }

  onSave(){
    this.dataStorage.storeRecipes().subscribe(
      (value: HttpResponse<Recipe[]>) => {
        console.log(value);
      }
    );
  }

  onFetch(){
    this.dataStorage.fetchRecipes();
  }
}
