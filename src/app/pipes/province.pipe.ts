import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceService } from '../services/general/reference.service';

@Pipe({
  name: 'province'
})
export class ProvincePipe implements PipeTransform {

  constructor(private reference:ReferenceService) { }

  async transform(value: any) {
    if (value) {
      const provinceName = await new Promise((resolve, reject) => {
        this.reference.getProvinceByRef(value).subscribe(
          data=>{
            return resolve(data.province_name_t)
          }
        )
      });

      return provinceName
    }
    return '';
  }

}
