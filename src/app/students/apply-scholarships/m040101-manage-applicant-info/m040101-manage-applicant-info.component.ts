import { ApApplication } from './../../../models/ap-application';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { UtilsService } from './../../../services/utils/utils.service';
import { SelectItem } from 'primeng/primeng';
import { Component, OnInit,Output, EventEmitter, Input } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';
import { ReferenceService } from '../../../services/general/reference.service';
import { AcUser } from '../../../models/ac-user';
import { AuthenticationService } from '../../../services/general/authentication.service';
import { AcStudent } from '../../../models/ac-student';
import { ApplyScholarshipForm } from '../../../forms/apply-scholarship-form';

@Component({
  selector: 'app-m040101-manage-applicant-info',
  templateUrl: './m040101-manage-applicant-info.component.html',
  styleUrls: ['./../apply-scholarships.component.css']
})
export class M040101ManageApplicantInfoComponent{
  public pageRender = false;
  public applicantFormGroup: FormGroup
  public apApplication:ApApplication = new ApApplication;
  public collageYears: SelectItem[] = [];
  private user: AcUser =  this.authService.getUser();
  public acStudent:AcStudent = new AcStudent;
  @Input() childForm: ApplyScholarshipForm;
  @Output() changeIndex = new EventEmitter<any>();

  constructor(
    private utilsService: UtilsService,
    private applyScholarshipService: M040101ApplyScholarshipService,
    private referenceService: ReferenceService,
    private authService: AuthenticationService,
  ) { }

  async ngOnInit() {
    console.log('form from parent: ',this.childForm)
    this.collageYears = this.utilsService.getCollageYear()
    await this.getStudentView();
    this.apApplication = Object.assign(this.apApplication,this.childForm.apApplication);
    this.validateForm();
    this.pageRender = true;
  }

  validateForm(){
    this.applicantFormGroup= new FormGroup({
    phone_no: new FormControl(this.acStudent.phone_no, Validators.compose([Validators.required, Validators.pattern(/^[0-9]+$/)])),
    email: new FormControl(this.acStudent.email,  Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)])),
      collage_year: new FormControl(this.apApplication.collage_year = '1',
        Validators.compose([Validators.required])),
      gpax: new FormControl(this.apApplication.gpax,
        Validators.compose([Validators.required,Validators.max(4.00)])),
      advisor_name: new FormControl(this.apApplication.advisor_name,
        Validators.compose([Validators.required])),
      livelihood: new FormControl(this.apApplication.livelihood,
        Validators.compose([Validators.required])),
    })
  }

  getStudentView(){
    return this.applyScholarshipService.getStudentView(this.user.account_ref).toPromise().then(
      data=>{
        console.log(data)
        this.acStudent = data[0];
        const age = new Date().getFullYear() - new Date(this.acStudent.birth_date).getFullYear();
        this.acStudent.age =age;
      }
    ).catch(
      err=>{
        return console.log(err);
      }
    );
  }

  onNext(){
    this.utilsService.findInvalidControls(this.applicantFormGroup);
    if(this.applicantFormGroup.valid){
      let data = {currentIndex:0,newIndex:1,apApplication:this.apApplication};
      this.changeIndex.emit(data);
    }
  }

}
