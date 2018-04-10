import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private _data: DataProvider) {

  }

  ionViewDidLoad(){
    this._data.getCoins()
      .subscribe(result => {
        console.log(result);
      })
  }

}
