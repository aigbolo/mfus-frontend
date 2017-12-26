import { HttpHeaders } from '@angular/common/http';
import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { M030101SponsorsForm } from '../../forms/sponsors-form';
@Injectable()
export class M030101SponsorsService {



  constructor(private config: ConfigurationService) { }

  doSearch(form:M030101SponsorsForm){
    return this.config.requestMethodPOST('sponsors',form.search_criteria);
  }
}
