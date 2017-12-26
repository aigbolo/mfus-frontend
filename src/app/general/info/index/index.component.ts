import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../../../services/utils/layout.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private layout: LayoutService) {
    this.layout.setPageHeader('หน้าหลัก')
   }

  ngOnInit() {
  }

}
