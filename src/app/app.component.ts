import { Component } from '@angular/core';
import { ReferanceService } from './services/general/reference.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(reference: ReferanceService) {
    reference.initialProvince();
  }
}
