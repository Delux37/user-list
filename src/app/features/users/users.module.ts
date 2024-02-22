import {NgModule} from "@angular/core";

// Components
import { UsersComponent } from "./containers";
import {UsersRoutingModule} from "./users-routing.module";
import {CommonModule} from "@angular/common";
import {StoreModule} from "@ngrx/store";
import {usersReducers} from "./store/reducers/users.reducers";

@NgModule({
  imports: [
    UsersRoutingModule,
    CommonModule,
    StoreModule.forFeature('users', usersReducers)
  ],
  declarations: [UsersComponent]
})
export class UsersModule { }
