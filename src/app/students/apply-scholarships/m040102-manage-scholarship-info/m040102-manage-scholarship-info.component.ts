import { ApApplication } from './../../../models/ap-application';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from './../../../services/utils/utils.service';
import { M040101ApplyScholarshipService } from './../../../services/students/m040101-apply-scholarship.service';
import { SmScholarshipAnnouncement } from './../../../models/sm-scholarship-announcement';
import { Component, OnInit, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { ApplyScholarshipsComponent } from '../apply-scholarships.component';
import { ApScholarshipHistory } from '../../../models/ap-scholarship-history';
import { ApStudentLoanFund } from '../../../models/ap-student-loan-fund';
import { ReferenceService } from '../../../services/general/reference.service';
import { NgProgress } from 'ngx-progressbar';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-m040102-manage-scholarship-info',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './m040102-manage-scholarship-info.component.html',
  styleUrls: ['./m040102-manage-scholarship-info.component.css']
})
export class M040102ManageScholarshipInfoComponent implements OnInit {
  pageRender=false;
  formGroup: FormGroup;
  autocompleteAnnouncementTempList: SmScholarshipAnnouncement[] = [];
  autocompleteAnnouncementList: SmScholarshipAnnouncement[] = [];
  announcement:SmScholarshipAnnouncement = new SmScholarshipAnnouncement;
  apApplication: ApApplication = new ApApplication;

  apScholarshipHistorys: ApScholarshipHistory[] = [];
  apStudentLoanFunds: ApStudentLoanFund[] = [];
  scholarshipSeleted=false;
  @Input() childForm: ApplyScholarshipForm;
  @Output() changeIndex = new EventEmitter<any>();

  constructor(
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService,
    private utilsService: UtilsService,
    private ngProgress: NgProgress) { }

  async ngOnInit() {
    this.ngProgress.start();
    await this.findAnnouncementsForApply();

    this.apScholarshipHistorys = [new ApScholarshipHistory];
    this.apStudentLoanFunds = [new ApStudentLoanFund];
    this.pageRender = true;
    this.validateForm();

    Object.assign(this.apApplication,this.childForm.apApplication)
    this.ngProgress.done();
  }

  validateForm(){
    this.formGroup= new FormGroup({
    announcement: new FormControl(this.announcement.announcement_ref, Validators.compose([Validators.required])),
    money_spend_plan: new FormControl(this.apApplication.money_spend_plan,  Validators.compose([Validators.required])),

    })
  }

  async findAnnouncementsForApply(){
    return await this.applyScholarshipService.initialScholarshipAnnouncementList().toPromise().then(
      (res) =>{
        console.log('autocomplete: ',res)
        this.autocompleteAnnouncementTempList = res;
        this.autocompleteAnnouncementList = res;
      }
    ).catch(
      error=>{
        console.log(error)
      }
    );
  }

  autocompleteAnnouncement(event){
    let e= event.originalEvent;
    let query = event.query;
      this.autocompleteAnnouncementList = [];
      let objList: any[] = this.autocompleteAnnouncementTempList;
      for (let obj of objList) {
        // Filter By string event
            if (
              obj.name
                .toLowerCase()
                .indexOf(query.toLowerCase()) == 0
            ) {
              this.autocompleteAnnouncementList.push(obj);
            }
      }
  }

  handleAutocompleteAnnouncement(event){
    setTimeout(() => {
      this.autocompleteAnnouncementList = this.autocompleteAnnouncementTempList;
    }, 100);
  }

  onSelectAnnouncement(){
    console.log(this.announcement);
    this.apApplication.announcement_ref = this.announcement.announcement_ref;
    this.scholarshipSeleted = true;
  }

  //scholarship history
  newScholarshipHistory(){
    this.apScholarshipHistorys = [...this.apScholarshipHistorys,new ApScholarshipHistory];
  }


  deleteScholarshipHistory(index){
    this.apScholarshipHistorys.splice(index,1);
  }

  //student loans
  newStudentLoans(){
    this.apStudentLoanFunds = [...this.apStudentLoanFunds,new ApStudentLoanFund];
  }

  deleteStudentLoans(index){
    this.apStudentLoanFunds.splice(index,1);
  }

  onGoBack(){
    const data = {
      currentIndex:1,newIndex:0,
      apApplication:{announcement_ref:this.apApplication.announcement_ref,money_spend_plan:this.apApplication.money_spend_plan},
      apScholarshipHistorys:[...this.apScholarshipHistorys],
      apStudentLoanFunds:[...this.apStudentLoanFunds],
      smScholarshipAnnouncement:this.announcement
    }
    this.changeIndex.emit(data);
  }
  onNext(){

    // cut out apScholarshipHistory that not complete fill
    this.apScholarshipHistorys = this.apScholarshipHistorys.filter(data=>{
      if(data.scholarship_name&&data.year&&data.money_amount!=null){
        return true
      }
      return false
    })

    // cut out apStudentLoanFunds that not complete fill
    this.apStudentLoanFunds = this.apStudentLoanFunds.filter(data=>{
      if(data.year&&data.money_amount!=null){
        return true
      }
      return false
    })

    console.log('aphistory is:',this.apScholarshipHistorys)

    this.utilsService.findInvalidControls(this.formGroup);
    if(this.formGroup.valid){
      const data = {
        currentIndex:1,newIndex:2,
        apApplication:{announcement_ref:this.apApplication.announcement_ref,money_spend_plan:this.apApplication.money_spend_plan},
        apScholarshipHistorys:[...this.apScholarshipHistorys],
        apStudentLoanFunds:[...this.apStudentLoanFunds],
        smScholarshipAnnouncement:this.announcement

      }
      this.changeIndex.emit(data);
    }
  }
}
