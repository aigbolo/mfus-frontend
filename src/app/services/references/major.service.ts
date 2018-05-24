import { Injectable } from "@angular/core";
import { ConfigurationService } from "../utils/configuration.service";

@Injectable()
export class MajorService {
    constructor(
        private configurationService: ConfigurationService){
    }
    onCreate(major){
        return this.configurationService.requestMethodPOST('majors-insert',major);
    }
    onUpdate(major){
        return this.configurationService.requestMethodPUT('majors-update',major);
    }
    onSearch(criteria){
        return this.configurationService.requestMethodPOST('majors',criteria);
    }
    onView(ref){
        return this.configurationService.requestMethodPOST('majors-update',{major_ref:ref});
    }
}