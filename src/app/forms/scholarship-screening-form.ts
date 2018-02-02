import { SmDocumentRequestDetail } from './../models/sm-document-request-detail';
import { ApApplication } from './../models/ap-application';
import { AcStudent } from "../models/ac-student";
import { SmDocumentRequest } from '../models/sm-document-request';

export class ScholarshipScreeningForm {
  student:any;
  application: any;
  documentRequest: SmDocumentRequest;
  documentRequestDetails: SmDocumentRequestDetail[];

  search_criteria:SearchCriteria;

  constructor(){
    this.student = null;
    this.application = null;
    this.documentRequest = new SmDocumentRequest;
    this.documentRequestDetails = [];
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
