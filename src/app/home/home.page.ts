import { Component, ViewChild } from "@angular/core";
import { DataService } from "../services/data.service";
import { ActivatedRoute, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { Events, IonContent } from "@ionic/angular";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage {
  @ViewChild(IonContent, { static: false }) ionContent: IonContent;
  newsList: any = [];
  date: any = new Date();
  day: any = new Date().getDay();
  // arrays of colors
  public colors = [
    {
      color: "#751aff",
    },
    {
      color: "#ff7675",
    },
    {
      color: "#00cec9",
    },
    {
      color: "#fdcb6e",
    },
    {
      color: "#2d3436",
    },
    {
      color: "#e600e6",
    },
    {
      color: "#e600e6",
    },
  ];

  daysInWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  page: any = {
    title: "Business",
    url: "/home",
    color: "#751aff",
  };
  default: any = "assets/imgs/holder.png";
  img: any =
    "https://cdn.cnn.com/cnnnext/dam/assets/191217180817-fedex-truck-file-super-tease.jpg";

  constructor(
    private events: Events,
    private _sanitizer: DomSanitizer,
    private dataService: DataService,
    private router: Router
  ) {
    this.dataService.getNews(this.page.title).then((resp: any) => {
      this.newsList = resp.articles;
    });

    this.events.subscribe("setPage", (data) => {
      this.ionContent.scrollToTop(300);
      this.page = data.page;
      this.dataService.getNews(this.page.title).then((resp: any) => {
        // console.log(resp.articles)
        this.newsList = resp.articles;
      });
    });
  }
  //load images automatically
  imageload(item) {
    item.load = true;
  }

  openNews(news) {
    this.router.navigate(["news"]);

    this.dataService.setNews({ page: this.page, news: news });

    this.events.publish("setNews");
  }

  getBackground(image) {
    return this._sanitizer.bypassSecurityTrustResourceUrl(image);
  }
}
