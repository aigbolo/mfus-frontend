import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RftProvince } from '../../models/rft-province';
import { ConfigurationService } from '../utils/configuration.service';

@Injectable()
export class ReferanceService {

  constructor(private configuration: ConfigurationService) { }

  getProvinces(): Observable<RftProvince[]> {
    return this.configuration.requestMethodGET('autocomplete-province');
  }

}
