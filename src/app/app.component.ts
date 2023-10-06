import { Component } from "@angular/core";

import { Platform, Events } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { Router, NavigationExtras } from "@angular/router";
import { Observable } from "rxjs";
import { DataService } from "./services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.scss"],
})
export class AppComponent {
  results: Observable<any>;
  searchTerm: string = "";
  public appPages = [
    {
      title: "Business",
      url: "/home",
      color: "#751aff",
    },
    {
      title: "Entertainment",
      url: "/home",
      color: "#ff7675",
    },
    {
      title: "General",
      url: "/home",
      color: "#00cec9",
    },
    {
      title: "Health",
      url: "/home",
      color: "#fdcb6e",
    },
    {
      title: "Science",
      url: "/home",
      color: "#2d3436",
    },
    {
      title: "Sports",
      url: "/home",
      color: "#e600e6",
    },
    {
      title: "Technology",
      url: "/home",
      color: "#d63031",
    },
  ];

  constructor(
    private platform: Platform,
    private events: Events,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private dataService: DataService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.statusBar.styleBlackTranslucent();
      this.splashScreen.show();
      this.events.publish("setPage", { page: this.appPages[0] });
    });
  }

  openHomeWithState(page) {
    //set up homepage
    this.events.publish("setPage", { page: page });
  }

  searchChanged() {
    // Call our service function which returns an Observable for search
    this.results = this.dataService.searchNews(this.searchTerm);
  }
}
