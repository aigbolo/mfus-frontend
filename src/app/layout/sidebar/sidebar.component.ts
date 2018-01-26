import { AcUser } from './../../models/ac-user';
import { AcOfficer } from './../../models/ac-officer';
import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthenticationService } from '../../services/general/authentication.service';
import { AcStudent } from '../../models/ac-student';

@Component({
  selector: 'sidebar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];
  user: AcUser = new AcUser()
  // officer: AcOfficer = this.authService.getAccount()
  // student: AcStudent = this.authService.getAccount()

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    if (this.authService.getUser().user_role == '1') {
      this.items = this.initialStudentMenu()
    } else {
      this.items = this.initialOfficerMenu()
    }
  }

  initialOfficerMenu(): MenuItem[] {
    return [
      {
        label: 'จัดการทุนการศึกษา',
        items: [
          { label: 'บันทึกผู้ให้ทุนการศึกษา', routerLink: ['/search-sponsors'] },
          { label: 'บันทึกทุนการศึกษา', routerLink: ['/search-scholarship'] },
          { label: 'บันทึกประกาศทุนการศึกษา', routerLink: ['/search-scholarship-announcement'] }
        ]
      },
      {
        label: 'จัดการคัดเลือกทุนการศึกษา',
        items: [
          { label: 'คัดกรองเอกสาร', routerLink: ['/document-screening'] },
          { label: 'บันทึกผู้มีสิทธิ์สัมภาษณ์', routerLink: ['/interview-selecting'] },
          { label: 'บันทึกข้อมูลผู้ที่ได้รับทุนการศึกษา', routerLink: ['/scholarship-earning'] }
        ]
      },
      {
        label: 'ตรวจสอบทุนการศึกษา',
        items: [
          { label: 'ข้อมูลทุนการศึกษา', routerLink: ['/sesarch-scholarship'] },
          { label: 'ข้อมูลผู้มีสิทธิ์สัมภาษณ์', routerLink: ['/interviewees'] },
          { label: 'ผู้ได้รับทุนการศึกษา', routerLink: ['/earning-scholarship'] },
        ]
      },
      {
        label: 'จัดการผู้ใช้',
        items: [
          { label: 'จัดการข้อมูลส่วนตัว', routerLink: ['/manage-officer'] }
        ]
      },
      {
        label: 'การประกาศ',
        items: [
          { label: 'ข้อมูลข่าวสาร', routerLink: ['/search-news'] }
        ]
      },
      {
        label: 'รายงาน',
        items: [
          { label: 'รายงานผู้ให้ทุนการศึกษา', routerLink: ['/report-sponsors'] },
          { label: 'รายงานผู้ที่ได้รับทุนการศึกษา', routerLink: ['/report-student-earn'] }
        ]
      },
      {
        label: 'ข้อมูลพื้นฐาน',
        items: [
          { label: 'ข้อมูลสำนักวิชา', routerLink: ['/school'] },
          { label: 'ข้อมูลสาขาวิชา', routerLink: ['/major'] },
          { label: 'ข้อมูลคำนำหน้าชื่อ', routerLink: ['/titlename'] },
          { label: 'ข้อมูลข้อมูลเอกสาร/หลักฐาน', routerLink: ['/application-document'] }
        ]
      },
    ];
  }

  initialStudentMenu(): MenuItem[] {
    return [
      {
        label: 'ข้อมูลพื้นฐาน',
        items: [
          { label: 'แก้ไขข้อมูลส่วนตัว', routerLink: ['/manage-student'] },
          { label: 'ข้อมูลครอบครัวและที่อยู่', routerLink: ['/manage-family-and-address'] },
        ]
      },
      {
        label: 'สมัครทุนการศึกษา',
        items: [
          { label: 'สมัครทุน', routerLink: ['/manage-application'] },
          { label: 'ตรวจสอบสถานะทุนการศึกษาที่สมัคร', routerLink: ['/search-sholarships-applied'] },
          { label: 'บันทึกข้อมูลเอกสารเพิ่มเติม', routerLink: ['/document-request'] }
        ]
      },
      {
        label: 'ประวัติทุนการศึกษา',
        items: [
          { label: 'ประวัติทุนการศึกษา', routerLink: ['/history'] },
        ]
      }
    ];
  }
}
