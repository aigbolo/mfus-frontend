import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-scholarship-annoucement-detail',
  templateUrl: './scholarship-annoucement-detail.component.html',
  styleUrls: ['./scholarship-annoucement-detail.component.css']
})
export class ScholarshipAnnoucementDetailComponent implements OnInit {

  constructor(
    private layout: LayoutService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe( params => console.log(params));
    this.layout.setPageHeader("ประกาศทุนการศึกษา" + this.activatedRoute.snapshot.queryParams);
  }


  ngOnInit() {
  }

}
