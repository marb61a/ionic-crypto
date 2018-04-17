import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detailToggle = [];
  objectKeys = Object.keys;
  coins: Object;
  likedCoins = [];

  constructor(public navCtrl: NavController, private _data: DataProvider, private storage: Storage) {

  }

  ionViewDidLoad(){

  }

  ionViewWillEnter(){
    this.refreshCoins();
  }

  refreshCoins(){
    this.storage.get('likedCoins').then((val) => {
      // If the value has not been set
      if(!val){
        this.likedCoins.push('BTC', 'ETH', 'IOT');
        this.storage.set('likedCoins', this.likedCoins);

        this._data.getCoins(this.likedCoins)
          .subscribe(res => {
            this.coins = res;
          });
      }
      // If the value is set
      else {
        this.likedCoins = val;

        this._data.getCoins(this.likedCoins)
          .subscribe(res => {
            this.coins = res;
          });
      }
    });

  }

  coinDetails(coin, index){
    if(this.detailToggle[index]){
      this.detailToggle[index] = false;
    } else {
      this.detailToggle.fill(false);
      this._data.getCoin(coin)
        .subscribe(res => {
          this.details = res['DISPLAY'][coin]['EUR'];

          this.detailToggle[index] = true;

          this._data.getChart(coin)
            .subscribe(res => {
              let coinHistory = res['Data'].map((a) => (a.close));
            })
        })
    }
  }
}
