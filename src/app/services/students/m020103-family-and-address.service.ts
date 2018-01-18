import { Observable } from 'rxjs/Observable';
import { FamilyAndAddressForm } from './../../forms/family-and-address-form';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { AcParent } from '../../models/ac-parent';
import { AcSibling } from '../../models/ac-sibling';
import { AcAddress } from '../../models/ac-address';

@Injectable()
export class M020103FamilyAndAddressService {

  constructor(private config: ConfigurationService) { }


  doInsertParent(parent: AcParent){
   return this.config.requestMethodPOST('parents-insert',parent)
  }

  doInsertSibling(siblings:AcSibling[]){
    return this.config.requestMethodPOST('siblings-insert',siblings)
  }

  doInsertAddress(address: AcAddress){
    return this.config.requestMethodPOST('address-insert',address)
  }

  doUpdate(form:FamilyAndAddressForm){
    console.log('doUpdate')
    return this.config.requestMethodPUT('sponsors',form)
  }


}

