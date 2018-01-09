import { ActivatedRoute } from '@angular/router';
import { LayoutService } from './../../services/utils/layout.service';
import { Validators } from '@angular/forms';
import { FormGroup,FormControl } from '@angular/forms';
import { UtilsService } from './../../services/utils/utils.service';
import { Component, OnInit } from '@angular/core';
import { NewsForm } from '../../forms/news-form';
import { CalendarModel } from '../../models/calendar-model';
import { M060101NewsService } from '../../services/officers/m060101-news.service';

@Component({
  selector: 'app-m060101-manage-news',
  templateUrl: './m060101-manage-news.component.html',
  styleUrls: ['./m060101-manage-news.component.css']
})
export class M060101ManageNewsComponent extends CalendarModel implements OnInit {

  user = localStorage.getItem("username");

  newsFormGroup:FormGroup
  manageNewsForm: NewsForm = new NewsForm()

  uploadedFiles: any[] = [];

  currentDate: Date = new Date()
  btnLabel: string
  activeFlag: any[] = []
  constructor(
    private utilsService: UtilsService,
    private layoutService:LayoutService,
    private route: ActivatedRoute,
    private newsService: M060101NewsService
  ) {
    super()
  }

  ngOnInit() {
    this.activeFlag = this.utilsService.getActiveFlag('M')
    this.vaidateForm();
    this.manageNewsForm.smNews.news_ref = this.route.snapshot.params[
      "id"
    ];
    if(!this.manageNewsForm.smNews.news_ref){
      this.btnLabel = 'บันทึกข้อมูล'
      this.layoutService.setPageHeader("บันทึกข้อมูลข่าวสาร");
    }else{
      this.btnLabel = 'แก้ไขข้อมูล'
      this.layoutService.setPageHeader("แก้ไขข้อมูลข่าวสาร");
      this.onRowSelected();
    }
  }

  vaidateForm(){
    this.newsFormGroup = new FormGroup({
      news_topic: new FormControl(this.manageNewsForm.smNews.news_topic,
        Validators.compose([Validators.required])),
      news_detail: new FormControl(this.manageNewsForm.smNews.news_detail,
        Validators.compose([Validators.required])),
      publish_date: new FormControl(this.manageNewsForm.smNews.publish_date,
        Validators.compose([Validators.required])),
      active_flag: new FormControl(this.manageNewsForm.smNews.active_flag = 'Y')
    })
  }

  onUpload(event) {
    if (event.files != null) this.uploadedFiles = [];

    for (let file of event.files) {
      this.uploadedFiles.push(file);
     }
    this.manageNewsForm.smNews.news_image = this.uploadedFiles[0].objectURL;
    this.manageNewsForm.smNews.news_name = this.uploadedFiles[0].name;
    this.manageNewsForm.smNews.news_type = this.uploadedFiles[0].type;

    this.utilsService
      .convertBlobToString(this.manageNewsForm.smNews.news_image)
      .subscribe(val => {
        this.manageNewsForm.smNews.news_image = val;
      });
  }

  onRowSelected(){
    this.newsService.selectedNew(this.manageNewsForm.smNews).subscribe(data=>{
      this.manageNewsForm.smNews = data
    })
  }

  onSearchPage(){
    this.utilsService.goToPage('search-news')
  }

  onResetClick(){
    this.manageNewsForm = new NewsForm()
  }

  onSubmit(){
    console.log(this.manageNewsForm)
    if(!this.manageNewsForm.smNews.news_ref){
      this.doInsert()
    }
  }

  doInsert(){
    this.newsService.insertNews(this.manageNewsForm.smNews).subscribe(res=>{

    }, error=>{
      console.log(error)
    }, ()=>{
      console.log('success')
    })
  }
}
