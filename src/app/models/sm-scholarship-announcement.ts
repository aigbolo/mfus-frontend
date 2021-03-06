export class SmScholarshipAnnouncement {
  public  announcement_ref: string;
  public  scholarship_ref: string;
  public  document_ref_no: string;
  public  year: number;
  public  round: number;
  public  unit: number;
  public  financial_aid: number;
  public  min_gpax: number;
  public  collage_year: string;
  public  schools: string;
  public  majors: string;
  public  announce_date: Date;
  public  registration_start_date: Date;
  public  registration_end_date: Date;
  public  announce_interview_date: Date;
  public  interview_start_date: Date;
  public  interview_end_date: Date;
  public  announce_result_date: Date;
  public  poster_file: any;
  public  poster_name: string;
  public  create_user: string;
  public  create_datetime: Date;
  public  update_user: string;
  public  update_datetime: Date;

  // Fields For Display
  public scholarship_type_name: string;
  public scholarship_name: string;
  public detail: string;
  public sponsors_name:string;
  public sctype_name:string;

}
