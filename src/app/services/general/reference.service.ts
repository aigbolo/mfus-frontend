import { RftProvince } from './../../models/rft-province';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class ReferanceService {

  constructor(private configuration: ConfigurationService) { }

  getProvinces() {
    return this.configuration.requestMethodGET('autocomplete-province')
  }


}
