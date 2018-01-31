import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
@Injectable()
export class ApplicationService {

  constructor(
    private configurationService: ConfigurationService
  ) { }


}
