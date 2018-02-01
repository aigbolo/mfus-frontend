import { Component, OnInit } from '@angular/core';
import { ReferenceService } from '../../../services/general/reference.service';
import { UtilsService } from '../../../services/utils/utils.service';

@Component({
  selector: 'app-view-family-and-address',
  templateUrl: './view-family-and-address.component.html',
  styleUrls: ['./view-family-and-address.component.css']
})
export class ViewFamilyAndAddressComponent implements OnInit {

  constructor(private referenceService: ReferenceService,
              private utilsService: UtilsService) { }

  ngOnInit() {

  }


  onPrevious(){
    this.referenceService.nextIndex(1)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
  onNext(){
    this.referenceService.nextIndex(2)
    this.utilsService.activeIndex = this.referenceService.getIndex()
  }
}