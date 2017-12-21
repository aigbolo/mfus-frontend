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

  constructor() { }

  ngOnInit() {
    this.items = [
      {
        label: 'สมัครทุนการศึกษา',
        items: [
          { label: 'สมัครทุน', routerLink: ['/sponsors'] },
          { label: 'ตรวจสอบสถานะการขอทุน', routerLink: ['/scholarships'] },
          { label: 'บันทึกข้อมูลเอกสารเพิ่มเติม', routerLink: ['/document-request'] }
        ]
      },
      {
        label: 'จัดการทุนการศึกษา',
        items: [
          { label: 'บันทึกผู้ให้ทุนการศึกษา', routerLink: ['/sponsors'] },
          { label: 'บันทึกทุนการศึกษา', routerLink: ['/scholarships'] },
          { label: 'บันทึกประกาศทุนการศึกษา', routerLink: ['/scholarship-announcement'] }
        ]
      },
      {
        label: 'ตรวจสอบทุนการศึกษา',
        items: [
          { label: 'คัดกรองเอกสาร', routerLink: ['/school'] },
          { label: 'บันทึกผู้มีสิทธิ์สัมภาษณ์', routerLink: ['/major'] },
          { label: 'บันทึกข้อมูลผู้ที่ได้รับทุนการศึกษา', routerLink: ['/scholarship-earning'] }
        ]
      },
      {
        label: 'การจัดการ',
        items: [
          { label: 'คัดกรองเอกสาร', routerLink: ['/documents-screening'] },
          { label: 'ข้อมูลผู้มีสิทธิ์สัมภาษณ์' },
          { label: 'ข้อมูลผู้ได้รับทุนการศึกษา' },
          { label: 'ข้อมูลเจ้าหน้าที่', routerLink: ['/officer'] }
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
      {
        label: 'อื่นๆ',
        items: [
          { label: 'บันทึกข่าวสาร', routerLink: ['/pages/news'] },
          { label: 'สมัครทุน', routerLink: ['/pages/apply-scholarship'] }
        ]
      }
    ];
  }


}
