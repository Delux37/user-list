import {Route, Routes} from "@angular/router";
import {UsersComponent} from "./containers";

export const states: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent
  }
]
