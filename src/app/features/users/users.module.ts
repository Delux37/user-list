import {NgModule} from "@angular/core";

// Components
import {UserListFiltersComponent, UsersComponent} from "./containers";

// Modules
import {UsersRoutingModule} from "./users-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {usersReducers} from "./store";
import {
  MatTableModule
} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UppercaseCapitalLettersPipe} from "../../shared/pipes";
import {AppInputComponent} from "../../shared/components/input/app-input.component";
import {MatIcon} from "@angular/material/icon";
import {MatMiniFabButton} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    MatPaginatorModule,
    StoreModule.forFeature('users', usersReducers),
    MatTableModule,
    UppercaseCapitalLettersPipe,
    AppInputComponent,
    ReactiveFormsModule,
    MatIcon,
    MatMiniFabButton
  ],
  declarations: [UsersComponent, UserListFiltersComponent]
})
export class UsersModule { }
