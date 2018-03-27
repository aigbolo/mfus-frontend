import { SmScholarshipAnnouncement } from './../models/sm-scholarship-announcement';
import { SmDocumentRequestDetail } from './../models/sm-document-request-detail';
import { ApApplication } from './../models/ap-application';
import { AcStudent } from "../models/ac-student";
import { SmDocumentRequest } from '../models/sm-document-request';

export class ScholarshipScreeningForm {
  student:AcStudent;
  application: ApApplication;
  scholarshipAnnouncement: SmScholarshipAnnouncement;
  sm_document_request: SmDocumentRequest;
  detail_list: SmDocumentRequestDetail[];
  application_ref: ApApplication;

  search_criteria:SearchCriteria;

  constructor(){
    this.student = new AcStudent;
    this.application = new ApApplication;
    this.application_ref = new ApApplication;
    this.scholarshipAnnouncement = new SmScholarshipAnnouncement;
    this.sm_document_request = new SmDocumentRequest;
    this.detail_list = [];
    this.search_criteria = new SearchCriteria;
  }
}

class SearchCriteria{
  year: number;
  announcement_ref: string;
  school_ref: string;
  major_ref: string;
  document_screening_flag: string;
  constructor(){
  this.year = null;
  this.announcement_ref = null;
  this.school_ref = null;
  this.major_ref = null;
  this.document_screening_flag = null;
  }
}

