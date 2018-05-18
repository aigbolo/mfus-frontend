import { Component, OnInit, Input } from '@angular/core';
import { AcParent } from '../../../../models/ac-parent';

@Component({
  selector: 'app-view-parent',
  templateUrl: './view-parent.component.html',
  styleUrls: ['./view-parent.component.css']
})
export class ViewParentComponent implements OnInit {
  @Input() parent: AcParent;
  constructor() { }

  ngOnInit() {
  }

}
