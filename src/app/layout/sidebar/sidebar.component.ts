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
  officer: AcOfficer = this.authService.getAccount()
  // student: AcStudent = this.authService.getAccount()

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    if(this.authService.user){
      if (this.authService.user.user_role == '1') {
        this.items = this.initialStudentMenu()
      } else {
        this.items = this.initialOfficerMenu();
        
        if(this.authService.user.manage_officer_flag == '1'){
  
          this.items.unshift({
            label: 'จัดการผู้ใช้',
            items: [
              {label: 'จัดการข้อมูลเจ้าหน้าที่', routerLink: ['/search-officer']},
              {label: 'รีเซตรหัสผ่านนักศึกษา', routerLink: ['/manage-student-password']}
            ]
          })
        }
      }
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
          { label: 'คัดกรองเอกสาร', routerLink: ['/search-scholarship-screening'] },
          { label: 'บันทึกผู้มีสิทธิ์สัมภาษณ์', routerLink: ['/search-interview-selecting'] },
          { label: 'บันทึกข้อมูลผู้ที่ได้รับทุนการศึกษา', routerLink: ['/search-scholarship-earning'], }
        ]
      },
      { label: 'ตรวจสอบนักศึกษาที่ได้รับทุน',routerLink: ['/check-scholarship-earning'] },
      { label: 'ข้อมูลข่าวสาร', routerLink: ['/search-news'] },
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
          { label: 'ข้อมูลสำนักวิชา', routerLink: ['/search-school'] },
          { label: 'ข้อมูลสาขาวิชา', routerLink: ['/search-major'] },
        ]
      },
    ];
  }

  initialStudentMenu(): MenuItem[] {
    return [
      {
        label: 'ข้อมูลครอบครัวและที่อยู่',routerLink: ['/manage-family-and-address']
      },
      {
        label: 'สมัครทุนการศึกษา',
        items: [
          { label: 'สมัครทุน', routerLink: ['/manage-application'] },
          { label: 'ตรวจสอบสถานะทุนการศึกษาที่สมัคร', routerLink: ['/search-sholarships-applied'] },
          { label: 'บันทึกข้อมูลเอกสารเพิ่มเติม', routerLink: ['/document-requested'] }
        ]
      },
      {
        label: 'ประวัติทุนการศึกษา', routerLink: ['/earned-history'] 
      }
    ];
  }
}
