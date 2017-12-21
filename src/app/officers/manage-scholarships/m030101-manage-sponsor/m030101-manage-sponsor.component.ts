import { LayoutService } from './../../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m030101-manage-sponsor',
  templateUrl: './m030101-manage-sponsor.component.html',
  styleUrls: ['./m030101-manage-sponsor.component.css']
})
export class M030101ManageSponsorComponent implements OnInit {
  image: any;
  constructor(private layoutService: LayoutService) { }

  ngOnInit() {
    this.layoutService.setPageHeader('บันทึกผู้ให้ทุนการศึกษา');
    this.image = '../../assets/images/empty_profile.png';
  }

}
