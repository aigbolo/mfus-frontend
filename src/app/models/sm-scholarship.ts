import { RftScholarshipType } from './rft-schoalrship_type';
export class SmScholarship {
  public scholarship_ref: string;
  public sponsors_ref: string;
  public scholarship_type: string;
  public scholarship_name: string;
  public detail: string;
  public unit: number;
  public financial_aid: number;
  public active_flag: string;
  public create_user: string;
  public create_datetime: Date;
  public update_user: string;
  public update_datetime: Date;
  public rftScholarshipType: RftScholarshipType;

  constructor(){
    this.rftScholarshipType = new RftScholarshipType
  }
}
