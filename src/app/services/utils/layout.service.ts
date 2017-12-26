import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LayoutService {

  private pageHeaderSubject = new BehaviorSubject<string>('');

  private displayName = new BehaviorSubject<string>(sessionStorage.getItem('username'));

  constructor() { }

  // Set Page Header Name
  setPageHeader(name: string) {
    this.pageHeaderSubject.next(name);
  }

  clearPageHeader() {
    this.pageHeaderSubject.next('');
  }

  getHeader(): Observable<any> {
    return this.pageHeaderSubject.asObservable();
  }
  // End

  // Set Display Name
  setDisplayName(name: string) {
    this.displayName.next(name);
  }

  clearDisplayName() {
    this.displayName.next('');
  }

  getDisplayName(): Observable<any> {
    return this.displayName.asObservable();
  }
  // End
}
