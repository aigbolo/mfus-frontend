import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { M030101SponsorsForm } from '../../forms/sponsors-form';
@Injectable()
export class M030101SponsorsService {



  constructor(private config: ConfigurationService) { }

  doSearch(form:M030101SponsorsForm){
    console.log(form.search_criteria);
    return this.config.requestMethodPOST('sponsors',form.search_criteria);
  }

  doInsert(form:M030101SponsorsForm){
    console.log('doInsert')
    return this.config.requestMethodPOST('sponsors-insert',form.sponsors)

  }

  doUpdate(form:M030101SponsorsForm){
    console.log('doUpdate')
    return this.config.requestMethodPUT('sponsors',form.sponsors)
  }


  onRowSelect(form:M030101SponsorsForm){
    console.log('onRowSelects');
    return this.config.requestMethodPOST('sponsors-update',form.sponsors)
  }
}
