import { Injectable } from '@angular/core';
declare var jquery:any;
declare var $ :any;
@Injectable()
export class JqueryScriptService {

  constructor() { }

  updateActiveFlagScript(){
    setTimeout(function() {
      $( "td.active-flag").each(function(index) {
        var active_flag = $(this).text().trim();
        if(active_flag=='Y'){
          $(this).text('ใช้งาน')
        }else{
          $(this).text('ไม่ใช้งาน')
        }
      });
    },100);

  }
}
