import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-view-family-financial',
  templateUrl: './view-family-financial.component.html',
  styleUrls: ['./view-family-financial.component.css']
})
export class ViewFamilyFinancialComponent implements OnInit {

  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService) { }

  ngOnInit() {
  }

  onPrevious(){
    this.referenceService.nextIndex(3)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
  onNext(){
    this.referenceService.nextIndex(4)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
}
