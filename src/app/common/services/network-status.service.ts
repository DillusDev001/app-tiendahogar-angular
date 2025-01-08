import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, mapTo, merge } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkStatusService {

  private onlineSubject = new BehaviorSubject<boolean>(navigator.onLine);

  constructor() {
    const online$ = fromEvent(window, 'online').pipe(mapTo(true));
    const offline$ = fromEvent(window, 'offline').pipe(mapTo(false));

    merge(online$, offline$).subscribe(this.onlineSubject);
  }

  get isOnline$() {
    return this.onlineSubject.asObservable();
  }

  get isOnline() {
    return this.onlineSubject.value;
  }
}
