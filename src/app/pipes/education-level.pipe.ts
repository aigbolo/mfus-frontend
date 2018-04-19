import { Pipe, PipeTransform } from '@angular/core';
import { ReferenceService } from '../services/general/reference.service';

@Pipe({
  name: 'educationlevel'
})
export class EducationLevelPipe implements PipeTransform {

  constructor(private reference:ReferenceService) { }

  async transform(value: any) {
    if (value) {
      const name = await new Promise((resolve, reject) => {
        this.reference.getEducationLevelByRef(value).subscribe(
          data=>{
            return resolve(data.education_name_t)
          }
        )
      });

      return name
    }
    return '';
  }

}
