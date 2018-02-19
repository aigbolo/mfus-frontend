import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
import { ScholarshipEarningForm } from '../../forms/scholarship-earning-form';

@Injectable()
export class M050103ScholarshipEarningService {

=======
import { ScholarshipEarningForm } from './../../forms/scholarship-earning-form';
import { ReferenceService } from './../general/reference.service';
import { ConfigurationService } from './../utils/configuration.service';
@Injectable()
export class M050103ScholarshipEarningService {



>>>>>>> eb9f2652a84877f828f3d15f3a39823f04659633
  constructor(private config: ConfigurationService,
              private referenceService: ReferenceService,) { }

      doSearch(form:ScholarshipEarningForm){
        return this.config.requestMethodPOST('scholarship-grantee',form.search_criteria);
      }
<<<<<<< HEAD
    }
=======

  }
>>>>>>> eb9f2652a84877f828f3d15f3a39823f04659633
