import {NgModule} from "@angular/core";
import {AppComponent} from "./app.component";
import {CommonModule} from "@angular/common";
import {AppRoutingModule} from "./app-routing.module";
import {BrowserModule} from "@angular/platform-browser";
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from '@ngrx/effects';
import {MenuBarComponent} from "./features/ui/menu-bar/menu-bar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {PageNotFoundComponent} from "./features/ui/page-not-found/page-not-found.component";

@NgModule({
  imports: [CommonModule, HttpClientModule, BrowserAnimationsModule, PageNotFoundComponent, BrowserModule, AppRoutingModule, MenuBarComponent, StoreModule.forRoot({}, {
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
    },
  }), EffectsModule.forRoot([])],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
