import { UtilsService } from './../../services/utils/utils.service';
import { LayoutService } from './../../services/utils/layout.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-m030101-search-sponsors',
  templateUrl: './m030101-search-sponsors.component.html',
  styleUrls: ['./m030101-search-sponsors.component.css']
})
export class M030101SearchSponsorsComponent implements OnInit {
  activeStatus = [];
  constructor(private layoutService: LayoutService,
              private utilsService: UtilsService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.layoutService.setPageHeader('ค้นหาผู้ให้ทุนการศึกษา');
    this.activeStatus = this.utilsService.getActiveStatus('S');
    this.activatedRoute.params.subscribe( params => console.log(params));
  }

}
