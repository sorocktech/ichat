import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import * as L from "leaflet";
import { Geolocation } from "@ionic-native/geolocation/ngx";
@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  public langsite = [];
  constructor(private geolocation: Geolocation) {
    this.geolocation
      .getCurrentPosition()
      .then((resp) => {        
        // resp.coords.latitude 纬度
        // resp.coords.longitude 经度
        this.langsite = [resp.coords.latitude, resp.coords.longitude];
      })
      .catch((error) => {
        console.log("Error getting location", error);
      });
  }

  ngOnInit() {}
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initMap();
    }, 800);
  }

  // this.lview.setLatLng(this.localsite);

  private initMap(): void {
    var map = L.map("map", {
      minZoom: 17,
    }).setView(this.langsite, 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    var myIcon = L.icon({
      iconUrl: "assets/images/location.png",
      iconSize: [30, 28],
      iconAnchor: [this.langsite[0] / 2, this.langsite[1] / 2],
      popupAnchor: [-3, -76],
      // shadowUrl: 'assets/images/location.png',
      shadowSize: [68, 95],
      shadowAnchor: [22, 94],
    });

    let marker = L.marker(this.langsite, {
      icon: myIcon,
      draggable: true,
    }).addTo(map);
    // .bindPopup("您的位置")
    // .openPopup();
    marker.on("dragend", function (event) {
      let locate = marker.getLatLng();
      for (const key in locate) {
        if (locate.hasOwnProperty(key)) {
          this.langsite = [locate[0], locate[1]];
        }
      }
      var cont = "移动到此处：<br>";
      cont += locate;
      var mypop = L.popup();
      mypop.setLatLng(locate).setContent(cont).openOn(map);
    });
    // use event 点击事件-显示当前经纬度

    // var mypop = L.popup();
    // map.on("click", function (e) {
    //   var content = "点击了此处：<br>";
    //   content += e.latlng.toString();
    //   var lat = e.latlng.lat;
    //   var lng = e.latlng.lng;
    //   mypop.setLatLng(e.latlng).setContent(content).openOn(map);

    //   var curIcon = L.icon({
    //     iconUrl: "assets/images/location.png",
    //     iconSize: [30, 28],
    //     iconAnchor: [e.latlng.lat / 2, e.latlng.lng / 2],
    //     popupAnchor: [-3, -76],
    //     shadowSize: [68, 95],
    //     shadowAnchor: [22, 94],
    //   });
    //   var marker = L.marker([lat, lng], {
    //     icon: curIcon,
    //     draggable: true,
    //   }).addTo(map);
    //   //拖拽结束
    //   marker.on("dragend", function (event) {
    //     console.log("实时坐标：" + marker.getLatLng());
    //     let locate = marker.getLatLng();
    //     var cont = "移动到此处：<br>";
    //     cont += locate;
    //     mypop.setLatLng(locate).setContent(cont).openOn(map);
    //   });
    // });
  }
}
