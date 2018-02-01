import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';
import { ViewStudentApplicationComponent } from '../view-student-application.component';
import { ApplicationService } from '../../../services/students/application.service';

@Component({
  selector: 'app-view-schoarship-info',
  templateUrl: './view-schoarship-info.component.html',
  styleUrls: ['./view-schoarship-info.component.css']
})
export class ViewSchoarshipInfoComponent implements OnInit {

  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService,
              public applicationView: ViewStudentApplicationComponent,
              private applicationService: ApplicationService) { }

  ngOnInit() {
    this.initialScholarshipAnnouncement()
  }

  onPrevious(){
    this.referenceService.nextIndex(1)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
  onNext(){
    this.referenceService.nextIndex(2)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }

  initialScholarshipAnnouncement(){
    this.applicationService.initialScholarshipAnnouncement(this.applicationView.applyScholarshipForm.apApplication.announcement_ref).subscribe(
      data=>{
        this.applicationView.applyScholarshipForm.autocompleteScholarshipAnnouncement = data[0]
      },error=>{

      },()=>{
        this.applicationView.pageRender = true
      }
    )
  }

}
