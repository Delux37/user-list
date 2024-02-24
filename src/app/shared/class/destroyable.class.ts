import {Subject} from "rxjs";
import {Component} from "@angular/core";

@Component({
  template: ''
})
export abstract class Destroyable {
  private $destroyed = new Subject<void>();
  protected destroyed$ = this.$destroyed.asObservable()

  public ngOnDestroy(): void {
    this.$destroyed.next();
    this.$destroyed.complete();
  }
}
