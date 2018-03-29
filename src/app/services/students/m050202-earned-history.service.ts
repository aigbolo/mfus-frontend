import { ConfigurationService } from './../utils/configuration.service';
import { Injectable } from '@angular/core';
import { SmDocumentRequest } from '../../models/sm-document-request';
@Injectable()
export class EarnedHistoryService {

  constructor(
    private configurationService: ConfigurationService
  ) { }

  findEarnedHistory(studentRef){
    return this.configurationService.requestMethodGET('earned-history/'+studentRef);
  }

}
