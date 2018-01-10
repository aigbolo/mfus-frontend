import { Severity } from "./../../enum";
import { NgProgress } from "ngx-progressbar";
import { ActivatedRoute } from "@angular/router";
import { LayoutService } from "./../../services/utils/layout.service";
import { Validators } from "@angular/forms";
import { FormGroup, FormControl } from "@angular/forms";
import { UtilsService } from "./../../services/utils/utils.service";
import { Component, OnInit } from "@angular/core";
import { NewsForm } from "../../forms/news-form";
import { CalendarModel } from "../../models/calendar-model";
import { M060101NewsService } from "../../services/officers/m060101-news.service";

@Component({
  selector: "app-m060101-manage-news",
  templateUrl: "./m060101-manage-news.component.html",
  styleUrls: ["./m060101-manage-news.component.css"]
})
export class M060101ManageNewsComponent extends CalendarModel
  implements OnInit {
  user = localStorage.getItem("username");

  pageRender: boolean = false;
  newsFormGroup: FormGroup;
  manageNewsForm: NewsForm = new NewsForm();
  preview: boolean = false;
  uploadedFiles: any[] = [];

  currentDate: Date = new Date();
  btnLabel: string;
  activeFlag: any[] = [];

  day: string;
  previewDate: String;

  constructor(
    private utilsService: UtilsService,
    private layoutService: LayoutService,
    private route: ActivatedRoute,
    private newsService: M060101NewsService,
    public ngProgress: NgProgress
  ) {
    super();
  }

  ngOnInit() {
    this.ngProgress.start();
    this.activeFlag = this.utilsService.getActiveFlag("M");
    this.vaidateForm();
    this.manageNewsForm.smNews.news_ref = this.route.snapshot.params["id"];
    if (!this.manageNewsForm.smNews.news_ref) {
      this.btnLabel = "บันทึกข้อมูล";
      this.layoutService.setPageHeader("บันทึกข้อมูลข่าวสาร");
      this.pageRender = true;
      this.ngProgress.done();
    } else {
      this.btnLabel = "แก้ไขข้อมูล";
      this.layoutService.setPageHeader("แก้ไขข้อมูลข่าวสาร");
      this.onRowSelected();
    }
  }

  vaidateForm() {
    this.manageNewsForm.smNews.news_image =
      "../../../assets/images/empty_photo.png";
    this.newsFormGroup = new FormGroup({
      news_topic: new FormControl(
        this.manageNewsForm.smNews.news_topic,
        Validators.compose([Validators.required])
      ),
      news_detail: new FormControl(
        this.manageNewsForm.smNews.news_detail,
        Validators.compose([Validators.required])
      ),
      publish_date: new FormControl(
        this.manageNewsForm.smNews.publish_date,
        Validators.compose([Validators.required])
      ),
      active_flag: new FormControl(
        (this.manageNewsForm.smNews.active_flag = "Y")
      )
    });
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

  onRowSelected() {
    this.newsService.selectedNew(this.manageNewsForm.smNews).subscribe(data => {
      this.manageNewsForm.smNews = data;
      this.manageNewsForm.smNews.publish_date = new Date(data.publish_date);
      console.log(this.manageNewsForm.smNews);
    });
    this.pageRender = true;
    this.ngProgress.done();
  }

  onSearchPage() {
    this.utilsService.goToPage("search-news");
  }

  onResetClick() {
    this.manageNewsForm = new NewsForm();
  }

  onSubmit() {
    console.log(this.manageNewsForm);
    if (!this.manageNewsForm.smNews.news_ref) {
      this.doInsert();
    } else {
      this.doUpdate();
    }
  }

  doInsert() {
    this.manageNewsForm.smNews.create_user = this.user;
    this.manageNewsForm.smNews.update_user = this.user;
    this.newsService.insertNews(this.manageNewsForm.smNews).subscribe(
      res => {},
      error => {
        console.log(error);
        this.layoutService.setMsgDisplay(
          Severity.ERROR,
          "เกิดข้อผิดพลาด",
          error
        );
      },
      () => {
        this.onResetClick();
        this.layoutService.setMsgDisplay(
          Severity.SUCCESS,
          "บันทึกข้อมูลสำเร็จ",
          ""
        );
      }
    );
  }

  doUpdate() {
    this.newsService.updateNews(this.manageNewsForm.smNews).subscribe(
      res => {},
      error => {
        console.log(error);
        this.layoutService.setMsgDisplay(
          Severity.ERROR,
          "เกิดข้อผิดพลาด",
          error
        );
      },
      () => {
        this.utilsService.goToPage("search-news");
        this.layoutService.setMsgDisplay(
          Severity.SUCCESS,
          "แก้ไขข้อมูลสำเร็จ",
          ""
        );
      }
    );
  }

  onPreview() {
    let previewDate = new Date(this.manageNewsForm.smNews.publish_date);

    this.previewDate =
      "วัน " +
      this.utilsService.convertDay(previewDate.getDay()) +
      " ที่ " +
      previewDate.getDate() +
      " เดือน " +
      this.utilsService.convertMonth(previewDate.getMonth() + 1) +
      " " +
      previewDate.getFullYear().toString();
    this.preview = !this.preview;
  }
}
