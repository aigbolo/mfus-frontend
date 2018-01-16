import { Observable } from 'rxjs/Observable';
import { FamilyAndAddressForm } from './../../forms/family-and-address-form';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';

@Injectable()
export class M020103FamilyAndAddressService {

  constructor(private config: ConfigurationService) { }


  doInsert(form:FamilyAndAddressForm){
    let message: Observable<any>;
    let values: Array<number> = [];
    console.log('doInsert')


    return message = new Observable(observer => {

      setTimeout(() => {
        this.config.requestMethodPOST('parents-insert',form.acParent).subscribe(
              data=>{
                observer.next({'status':'completed','detail':''});
              },
              err=>{
                console.log(err);
                observer.next({'status':'error','detail':err});
              }
            )
      }, 500);
      setTimeout(() => {
        this.config.requestMethodPOST('sibling-insert',form.siblingList).subscribe(
              data=>{
                observer.next({'status':'completed','detail':''});
              },
              err=>{
                console.log(err);
                observer.next({'status':'error','detail':err});
              }
            )
      }, 1000);
      setTimeout(() => {
        this.config.requestMethodPOST('address-insert',form.acAddress).subscribe(
              data=>{
                observer.next({'status':'completed','detail':''});
              },
              err=>{
                console.log(err);
                observer.next({'status':'error','detail':err});
              }
            )
      }, 1500);
      setTimeout(() => {
        observer.complete();

    }, 2000);
    });


  }

  doUpdate(form:FamilyAndAddressForm){
    console.log('doUpdate')
    return this.config.requestMethodPUT('sponsors',form)
  }


}

