import { Injectable } from "@angular/core";
import { ConfigurationService } from "../utils/configuration.service";

@Injectable()
export class SchoolService {
    constructor(
        private configurationService: ConfigurationService){
    }
    onCreate(school){
        return this.configurationService.requestMethodPOST('schools-insert',school);
    }
    onUpdate(school){
        return this.configurationService.requestMethodPUT('schools',school);
    }
    onSearch(criteria){
        return this.configurationService.requestMethodPOST('schools',criteria);
    }
    onView(ref){
        return this.configurationService.requestMethodPOST('schools-view',{school_ref:ref});
    }
}