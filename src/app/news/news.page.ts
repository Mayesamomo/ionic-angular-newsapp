import { Component } from "@angular/core";
import { NavController } from "@ionic/angular";
import { DataService } from "../services/data.service";
import { DomSanitizer } from "@angular/platform-browser";
import { InAppBrowser } from "@ionic-native/in-app-browser/ngx";
// declare var SafariViewController: any;

@Component({
  selector: "app-news",
  templateUrl: "./news.page.html",
  styleUrls: ["./news.page.scss"],
})
export class NewsPage {
  page: any = {};
  news: any = {};
  img: any;

  constructor(
    private dataService: DataService,
    private iab: InAppBrowser,
    private _sanitizer: DomSanitizer,
    // public safariViewController: SafariViewController,
    private navCtrl: NavController
  ) {
    this.dataService.getOneNews().subscribe((data: any) => {
      this.page = data.page;
      this.news = data.news;
      console.log(this.news);
      this.img = this.news.urlToImage;
      console.log(this.img);
    });
  }

  back() {
    this.navCtrl.navigateBack("home");
  }

  getBackground(image) {
    // get and sanitize backgroundImage
    return this._sanitizer.bypassSecurityTrustResourceUrl(image);
  }

  open() {
    const browser = this.iab.create(this.news.url);
    browser.show();
    browser.on("loadstop").subscribe(() => {
      browser.insertCSS({ code: "body{color: red;" });
    });
  }
}
