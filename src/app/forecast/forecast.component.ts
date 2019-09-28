import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  currentWeather: any = {};
  forecast: any = {};
  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.loc$ = store.select('loc');
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    });
  }
  ngOnInit() {}
  searchWeather(loc: string) {
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc).subscribe(
      res => {
        this.currentWeather = res;
      },
      err => {},
      () => {
        this.searchForecast(this.currentWeather.id);
      }
    );
  }
  getIcon(icon: string) {
    return this.weatherService.getIcon(icon);
  }
  searchForecast(id: string) {
    this.weatherService.getForecast(id).subscribe(res => {
      this.forecast = res;
    });
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
