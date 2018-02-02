import { Component, OnInit } from '@angular/core';
import { ViewStudentApplicationComponent } from '../../view-student-application.component';
import { UtilsService } from '../../../../services/utils/utils.service';

@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.css']
})
export class ViewParentComponent implements OnInit {

  constructor(public applicationView: ViewStudentApplicationComponent,
              public utilsService: UtilsService) { }

  ngOnInit() {
  }

  setParentsFlag(flag: string){
    if(flag == '1'){
      return "บิดา - มารดา"
    }else{
      return "ผู้อุปการะ"
    }
  }

  setRelationShipStatus(flag: string){
    let status
    switch (flag) {
      case '1': {
        status = "สมรสและอยู่ด้วยกัน";
        break;
      }
      case '2': {
        status = "สมรสแต่ไม่ได้อยู่ด้วยกัน";
        break;
      }
      case '3': {
        status = "หย่าร้าง";
        break;
      }
    }
    return status
  }

  setStatusFlag(flag: string){
    if(flag == '1'){
      return "มีชีวิต"
    }else{
      return "เสียชีวิต"
    }
  }

}
