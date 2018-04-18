import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceService } from '../services/general/reference.service';

@Pipe({
  name: 'subdistrict'
})
export class SubDistrictPipe implements PipeTransform {

  constructor(private reference:ReferenceService) { }

  async transform(value: any) {
    if (value) {
      const subDistrictName = await new Promise((resolve, reject) => {
        this.reference.getSubDistrictByRef(value).subscribe(
          data=>{
            return resolve(data.sub_district_name_t)
          }
        )
      });

      return subDistrictName
    }
    return '';
  }

}
