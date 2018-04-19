import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  detailToggle = [];
  objectKeys = Object.keys;
  coins: Object;
  details: Object;
  likedCoins = [];
  chart = [];

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

  coinDetails(coin,index) {

    if (this.detailToggle[index])
      this.detailToggle[index] = false;
    else {
      this.detailToggle.fill(false);
      this._data.getCoin(coin)
        .subscribe(res => {
          this.details = res['DISPLAY'][coin]['EUR'];

          this.detailToggle[index] = true;

          this._data.getChart(coin)
          .subscribe(res => {

            console.log(res);

            let coinHistory = res['Data'].map((a) => (a.close));

            setTimeout(()=> {
              this.chart[index] = new Chart('canvas'+index, {
                type: 'line',
                data: {
                  labels: coinHistory,
                  datasets: [{
                      data: coinHistory,
                      borderColor: "#3cba9f",
                      fill: false
                    }
                  ]
                },
                options: {
                  tooltips: {
                    callbacks: {
                        label: function(tooltipItems, data) {
                            return "$" + tooltipItems.yLabel.toString();
                        }
                      }
                    },
                    responsive: true,
                    legend: {
                      display: false
                  },
                  scales: {
                    xAxes: [{
                      display: false
                    }],
                    yAxes: [{
                      display: false
                    }],
                  }
                }
              });
            }, 250);
          });
        });
      }
  }
}
