import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [CommonModule, BrowserModule, AppRoutingModule, StoreModule.forRoot({}, {
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    },
  }), EffectsModule.forRoot([])],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }