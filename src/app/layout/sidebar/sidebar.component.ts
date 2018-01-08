import { MenuItem } from 'primeng/primeng';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'sidebar',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  items: MenuItem[];

  private officerMenu = [
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
        { label: 'ข้อมูลทุนการศึกษา', routerLink: ['/scholarship-info'] },
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
        { label: 'ข้อมูลข่าวสาร', routerLink: ['/news'] }
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

  private studentMenu = [
    {
      label: 'ข้อมูลพื้นฐาน',
      items: [
        { label: 'ข้อมูลครอบครัวและที่อยู่', routerLink: ['/fam'] },
      ]
    },
    {
      label: 'สมัครทุนการศึกษา',
      items: [
        { label: 'สมัครทุน', routerLink: ['/sponsors'] },
        { label: 'ตรวจสอบสถานะการขอทุน', routerLink: ['/scholarships'] },
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

  constructor() { }

  ngOnInit() {
    this.items = this.officerMenu;
  }


}
