import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DataProvider {
  result:any;

  constructor(public _http: HttpClient) {

  }

  getCoins(coins){
    let coinlist = '';

    coinlist = coins.join();

    // Crypto compare multi price
    return this._http.get("https://min-api.cryptocompare.com/data/pricemulti?fsyms="+coinlist+"&tsyms=EUR")
      .map(result => this.result = result)
  }

  getCoin(coin){
    return this._http.get("https://min-api.cryptocompare.com/data/pricemultifull?fsyms="+coin+"&tsyms=EUR")
      .map(result => this.result = result)
  }

  getChart(coin){
    return this._http.get("https://min-api.cryptocompare.com/data/histoday?fsym="+coin+"&tsym=EUR&limit=30&aggregate=1")
      .map(result => this.result = result);
  }

  allCoins(){
    let headers = new HttpHeaders()
      .set('Access-Control-Allow-Origin', "*");

    return this._http.get("https://www.cryptocompare.com/api/data/coinlist/", {headers: headers})
      .map(result => this.result = result);

  }
}
