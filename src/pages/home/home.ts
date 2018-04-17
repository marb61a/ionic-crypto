import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
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

}
