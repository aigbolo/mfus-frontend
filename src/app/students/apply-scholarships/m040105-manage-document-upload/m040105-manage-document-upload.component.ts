import { ApplyScholarshipsComponent } from './../apply-scholarships.component';
import { Component, OnInit } from '@angular/core';
import { M040101ApplyScholarshipService } from '../../../services/students/m040101-apply-scholarship.service';

@Component({
  selector: 'app-m040105-manage-document-upload',
  templateUrl: './m040105-manage-document-upload.component.html',
  styleUrls: ['./m040105-manage-document-upload.component.css']
})
export class M040105ManageDocumentUploadComponent implements OnInit {

  label: string;
  constructor(public applyApplication: ApplyScholarshipsComponent,
              private applyScholarshipService: M040101ApplyScholarshipService) { }

  ngOnInit() {
    this.initialDocumentList()
    this.label = 'เลือกไฟล์'
  }

  initialDocumentList(){
    this.applyScholarshipService.initialDocumentUpload().subscribe(data=>{
      for(let obj of data){
        obj.upload_name = ''
        this.applyApplication.applyApplicationForm.documentList.push(obj)
      }
      console.log(this.applyApplication.applyApplicationForm.documentList)
    })
  }

  click(){
    console.log('click')
  }
}
