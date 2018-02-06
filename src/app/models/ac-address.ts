export class AcAddress {
 public address_ref: string;
 public student_ref: string;
 public home_address: string;
 public home_province: string;
 public home_district: string;
 public home_sub_district: string;
 public home_postcode: string;
 public direction_name: string;
 public direction_type: string;
 public direction_image: any;
 public current_address: string;
 public current_province: string;
 public current_district: string;
 public current_sub_district: string;
 public current_postcode: string;
 public create_user: string;
 public create_datetime: Date;
 public update_user: string;
 public update_datetime: Date;

 constructor(){
  this.address_ref=null;
  this.student_ref=null;
  this.home_address=null;
  this.home_province=null;
  this.home_district=null;
  this.home_sub_district=null;
  this.home_postcode=null;
  this.direction_name=null;
  this.direction_type=null;
  this.direction_image=null;
  this.current_address=null;
  this.current_province=null;
  this.current_district=null;
  this.current_sub_district=null;
  this.current_postcode=null;
  this.create_user=null;
  this.create_datetime=null;
  this.update_user=null;
  this.update_datetime=null;
 }

}
