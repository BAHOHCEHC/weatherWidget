import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { WeatherService } from '../weather.service';
@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  loc$: Observable<string>;
  loc: string;
  currentWeather: any = {};
  msg: string;
  image: string;
  constructor(private store: Store<any>, private weatherService: WeatherService) {
    this.loc$ = store.select('loc');
    this.loc$.subscribe(loc => {
      this.loc = loc;
      this.searchWeather(loc);
    });
  }
  ngOnInit() {}
  searchWeather(loc: string) {
    this.msg = '';
    this.currentWeather = {};
    this.weatherService.getCurrentWeather(loc).subscribe(
      res => {
        this.currentWeather = res;
        this.image = this.weatherService.getIcon(this.currentWeather.weather[0].icon);
      },
      err => {
        if (err.error && err.error.message) {
          alert(err.error.message);
          this.msg = err.error.message;
          return;
        }
        alert('Failed to get weather.');
      },
      () => {}
    );
  }
  resultFound() {
    return Object.keys(this.currentWeather).length > 0;
  }
}
