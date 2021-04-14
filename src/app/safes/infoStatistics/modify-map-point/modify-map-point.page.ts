import { Component, OnInit } from '@angular/core';
import { BaseUI } from "../../../api/baseui";
import {
  LoadingController,
  ToastController,
  NavController, AlertController
} from "@ionic/angular";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { ModalController, NavParams } from "@ionic/angular";

declare var Microsoft: any;
@Component({
  selector: 'app-modify-map-point',
  templateUrl: './modify-map-point.page.html',
  styleUrls: ['./modify-map-point.page.scss'],
})
export class ModifyMapPointPage extends BaseUI implements OnInit {
  map: any = '';
  searchManager: any;
  searchTbx: any = '';//搜索框内容
  json: any = {
    lat: "",
    lon: ""
  };
  public params: any = {};
  constructor(public nav: NavController,
    public activeRoute: ActivatedRoute,
    public modalCtrl: ModalController,
    public navParams: NavParams) {
    super();
    this.params = this.navParams.data;
    this.json = this.params;
    console.log(this.navParams);
  }

  ngOnInit() {
    this.getMapInfo();
  }
  getMapInfo() {
    this.map = new Microsoft.Maps.Map(document.querySelector("#MapBox"), {
      center: new Microsoft.Maps.Location(this.params.lat, this.params.lon),
      zoom: 6
    });

    let _this = this;

    var pushpin = new Microsoft.Maps.Pushpin(this.map.getCenter(), {
      icon: 'assets/images/wariRed.png',
    });
    this.map.entities.push(pushpin);

    Microsoft.Maps.Events.addHandler(this.map, 'click', this.displayInfo.bind(_this));
  }
  //返回上一页
  goBack() {
    this.modalCtrl.dismiss();
  }
  ionViewDidLoad() {
  }
  Determine() {
    this.modalCtrl.dismiss({
      dismissed: true,
      lat: this.json.lat,
      lon: this.json.lon
    });
  }

  displayInfo(e) {
    //若点击到地图的标记上，而非地图上
    var loc;
    if (e.targetType == "pushpin") {
      loc = e.target.getLocation();
    }
    //若点击到地图上
    else {
      var point = new Microsoft.Maps.Point(e.pageX, e.pageY);
      loc = e.target.tryPixelToLocation(point, Microsoft.Maps.PixelReference.page);
    }
    // alert(loc.latitude+", "+loc.longitude);

    var pin = new Microsoft.Maps.Pushpin(loc);


    if (this.map.entities.getLength()) {
      this.map.entities.removeAt(this.map.entities.getLength() - 1);
    }

    var pushpin = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(pin.geometry.y, pin.geometry.x), {
      icon: 'assets/images/wariRed.png',
    });
    this.map.entities.push(pushpin);

    this.json = {
      lat: loc.latitude,
      lon: loc.longitude
    }
  }

  Search() {
    let that = this;
    if (!that.searchManager) {
      //Create an instance of the search manager and perform the search.
      Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        that.searchManager = new Microsoft.Maps.Search.SearchManager(that.map);
        that.Search();
      });
    } else {
      //Remove any previous results from the map.
      that.map.entities.clear();

      //Get the users query and geocode it.
      that.geocodeQuery(that.searchTbx);
    }
  }
  geocodeQuery(query) {
    let that = this;
    var searchRequest = {
      where: query,
      callback: function (r) {
        if (r && r.results && r.results.length > 0) {
          var pin, pins = [], locs = [];

          for (var i = 0; i < r.results.length; i++) {
            //Create a pushpin for each result. 
            pin = new Microsoft.Maps.Pushpin(r.results[i].location, {
              text: i + ''
            });
            pins.push(pin);
            locs.push(r.results[i].location);

            // output += i + ') ' + r.results[i].name + '<br/>';
          }

          //Add the pins to the map
          console.log(pins)
          that.map.entities.push(pins);
          that.json.lat = pins[0].geometry.y;
          that.json.lon = pins[0].geometry.x;
          //Display list of results
          // document.getElementById('output').innerHTML = output;

          //Determine a bounding box to best view the results.
          var bounds;

          if (r.results.length == 1) {
            bounds = r.results[0].bestView;
          } else {
            //Use the locations from the results to calculate a bounding box.
            bounds = Microsoft.Maps.LocationRect.fromLocations(locs);
          }

          that.map.setView({ bounds: bounds });

          var pushpin = new Microsoft.Maps.Pushpin(that.map.getCenter(), {
            icon: 'assets/images/wariRed.png',
          });
          that.map.entities.push(pushpin);

          Microsoft.Maps.Events.addHandler(that.map, 'click', that.displayInfo.bind(that));
        }
      },
      errorCallback: function (e) {
        //If there is an error, alert the user about it.
        alert("No results found.");
      }
    };

    //Make the geocode request.
    that.searchManager.geocode(searchRequest);
  }

}
