import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
import { Weather } from '../models/weather.model';
import { REFRESH_WEATHER } from '../reducers';
import { first, tap } from 'rxjs/operators';

@Component({
  selector: 'app-weather-data',
  templateUrl: './weather-data.component.html',
  styleUrls: ['./weather-data.component.scss']
})
export class WeatherDataComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  interval = null;
  weatherData$: Observable<Weather[]>;

  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.loc$ = store.select('loc');
    this.loc$.subscribe(loc => {
      this.loc = loc;
    });
  }
  startScaning() {
    this.clearInterval();
    this.interval = setInterval(() => {
      this.getFreshData();
    }, 60000);
  }
  clearInterval() {
    clearInterval(this.interval);
  }
  getFreshData() {
    this.clearInterval();
    this.weatherService
      .getCurrentWeather(this.loc)
      .pipe(
        first(),
        tap((res: Weather) => {
          res.dt = new Date();
        })
      )
      .subscribe(
        res => {
          this.store.dispatch({ type: REFRESH_WEATHER, payload: res });
          this.weatherData$ = this.store.select('weat').pipe(first());
        },
        null,
        () => {
          this.startScaning();
        }
      );
  }
  ngOnInit() {
    this.getFreshData();
    this.startScaning();
  }
  getIcon(icon) {
    return this.weatherService.getIcon(icon);
  }
}
