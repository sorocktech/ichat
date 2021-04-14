import { Component, OnInit } from '@angular/core';
import {NavController} from "@ionic/angular";
import {Storage} from "@ionic/storage";
import {SETTING,SETTING_ITEMS} from "../../interfaces/storage";
import {StatusBar} from "@ionic-native/status-bar/ngx";
import {DataService} from "../../sevices/data.service";
import {THEME_DARK, THEME_LIGHT} from "../../interfaces/app";

@Component({
  selector: 'app-darkmode',
  templateUrl: './darkmode.page.html',
  styleUrls: ['./darkmode.page.scss'],
})
export class DarkmodePage implements OnInit {
    form =  SETTING_ITEMS
    constructor(
        public nav: NavController,
        private statusBar: StatusBar,
        private storage: Storage,
        private data:DataService
) {


    }

    async ngOnInit() {
        let setting = await this.storage.get(SETTING)
        if(setting.darkMode){
            this.form.map((i)=>{
                i.isChecked = false
                if(i.mode === setting.darkMode){
                    i.isChecked = true
                }
            })
        }

    }

    //返回上一页
    async goBack() {
        await this.nav.navigateBack('/setting')
    }
    async darkmodeSelect(item){
        let setting = await this.storage.get(SETTING)
        this.form.map(async (i)=>{
            i.isChecked = false
            if(i.mode === item.mode){
                i.isChecked = true
                setting.darkMode= i.mode
                document.body.classList.toggle(i.mode, true);
                if(i.mode === 'light'){
                    this.statusBar.backgroundColorByHexString('#063D91')
                    this.data.themeMode = THEME_LIGHT
                }

                if(i.mode === 'dark'){
                    this.statusBar.backgroundColorByHexString('#0E2144')
                    this.data.themeMode = THEME_DARK
                }

                await this.storage.set(SETTING,setting)

            }else{
                document.body.classList.remove(i.mode);
            }

        })
    }

}
