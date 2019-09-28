import { Component, OnInit, ViewChild } from '@angular/core';
import { WeatherDataComponent } from '../weather-data/weather-data.component';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  @ViewChild('weatherDataRef', { static: false })
  weatherData: WeatherDataComponent;

  ngOnInit() {}
  refreshWeatherData() {
    this.weatherData.getFreshData();
  }
}
