import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceService } from '../services/general/reference.service';

@Pipe({
  name: 'district'
})
export class DistrictPipe implements PipeTransform {

  constructor(private reference:ReferenceService) { }

  async transform(value: any) {
    if (value) {
      const districtName = await new Promise((resolve, reject) => {
        this.reference.getDistrictByRef(value).subscribe(
          data=>{
            return resolve(data.district_name_t)
          }
        )
      });

      return districtName
    }
    return '';
  }

}
