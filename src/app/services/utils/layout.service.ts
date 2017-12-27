import { Message } from 'primeng/primeng';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class LayoutService {

  private pageHeaderSubject = new BehaviorSubject<string>('');

  private displayName = new BehaviorSubject<string>(localStorage.getItem('username'));

  private msgs = new BehaviorSubject<Message[]>([]);

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

  // Set Display Name
  setMsgDisplay(severity: string, title: string, desc: string) {
    this.msgs.next([{ severity: severity, summary: title, detail: desc }]);
  }

  clearMsgDisplay() {
    this.msgs.next([]);
  }

  getMsgDisplay(): Observable<any> {
    return this.msgs.asObservable();
  }
  // End
}
