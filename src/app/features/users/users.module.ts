import {NgModule} from "@angular/core";

// Components
import { UsersComponent } from "./containers";
import {UsersRoutingModule} from "./users-routing.module";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {usersReducers} from "./store";
import {
  MatTableModule
} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {UppercaseCapitalLettersPipe} from "../../shared/pipes";

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    MatPaginatorModule,
    StoreModule.forFeature('users', usersReducers),
    MatTableModule,
    UppercaseCapitalLettersPipe
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
