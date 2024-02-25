import { filter, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { IEventBus } from '../models/event-bus.model';

@Injectable({ providedIn: 'root' })
export class EventBusService {
  private bus: Subject<IEventBus>;

  constructor() {
    this.bus = new Subject<IEventBus>();
  }

  emit(key: string, data?: unknown): void {
    this.bus.next({ key, data });
  }

  on<T>(key: string): Observable<T> {
    return this.bus.asObservable().pipe(
      filter((event: IEventBus) => event.key === key),
      map((event) => <T>event.data),
    );
  }
}
