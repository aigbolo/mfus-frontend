import { UtilsService } from './../utils/utils.service';
import { AcOfficer } from './../../models/ac-officer';
import { Injectable } from '@angular/core';
import { ConfigurationService } from '../utils/configuration.service';
import { LayoutService } from '../utils/layout.service';
import { Severity } from '../../enum';
import { ActivatedRoute, Router } from '@angular/router';
import { OfficerForm } from '../../forms/officer-form';

@Injectable()
export class M010102OfficerService {


  officerForm: OfficerForm
  constructor(private configurationService: ConfigurationService,
    private utilService: UtilsService,
    private layout: LayoutService,
    private router: Router) { }


  doInsert(form: AcOfficer, user: string) {
    form.create_user = user
    form.update_user = user
    return this.configurationService.requestMethodPOST('officers-insert', form).subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
      this.layout.setMsgDisplay(Severity.ERROR, 'เกิดข้อผิดพลาาด','')
    }, () => {
      console.log('success')
      this.layout.setMsgDisplay(Severity.SUCCESS, 'บันทึกข้อมูลสำเร็จ', '')
    })
  }

  searchOfficer(form: OfficerForm) {
    this.router.navigate(['/search-officer'], { queryParams: form.searchCriteria})
    return this.configurationService.requestMethodPOST('officers', form.searchCriteria)
  }

  selectOfficer(ref: AcOfficer) {
    return this.configurationService.requestMethodPOST('officers-update', ref)
  }

  doUpdate(form: AcOfficer) {
    return this.configurationService.requestMethodPUT('officers', form).subscribe(res => {
      console.log(res)
    }, error => {
      console.log(error)
      this.layout.setMsgDisplay(Severity.ERROR, 'เกิดข้อผิดพลาาด', error)
    }, () => {
      console.log('update success')
      this.utilService.goToPage('search-officer')
      this.layout.setMsgDisplay(Severity.SUCCESS, 'แก้ไขข้อมูลสำเร็จ', '')
    })
  }
}
