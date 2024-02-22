import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {states} from "./users-routes";
import {EffectsModule} from "@ngrx/effects";
import {UsersEffects} from "./store/effects/users.effects";

@NgModule({
  imports: [RouterModule.forChild(states), EffectsModule.forFeature(UsersEffects)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
