import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
const apiKey: string = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  constructor(private http: HttpClient) {}
  getCurrentWeather(loc: string) {
    return this.http.get(`${environment.apiUrl}/weather?q=${loc}&appid=${apiKey}`);
  }
  getForecast(id: string) {
    return this.http.get(`${environment.apiUrl}/forecast?id=${id}&appid=${apiKey}`);
  }

  getIcon(iconAPI: string) {
    // official Open Weather Map API Icon Defintitions https://openweathermap.org/weather-conditions
    let conditionIcon = '';

    switch (iconAPI) {
      case '01d': {
        conditionIcon = './assets/01d@2x.png';
        break;
      }
      case '01n': {
        conditionIcon = './assets/01n@2x.png';
        break;
      }
      case '02d': {
        conditionIcon = './assets/02d@2x.png';
        break;
      }
      case '02n': {
        conditionIcon = './assets/02n@2x.png';
        break;
      }
      case '03d': {
        conditionIcon = './assets/03d@2x.png';
        break;
      }
      case '03n': {
        conditionIcon = './assets/03n@2x.png';
        break;
      }
      case '04d': {
        conditionIcon = './assets/04d@2x.png';
        break;
      }
      case '04n': {
        conditionIcon = './assets/04n@2x.png';
        break;
      }
      case '09d': {
        conditionIcon = './assets/09d@2x.png';
        break;
      }
      case '09n': {
        conditionIcon = './assets/09n@2x.png';
        break;
      }
      case '10d': {
        conditionIcon = './assets/10d@2x.png';
        break;
      }
      case '10n': {
        conditionIcon = './assets/10n@2x.png';
        break;
      }
      case '11d': {
        conditionIcon = './assets/11d@2x.png';
        break;
      }
      case '11n': {
        conditionIcon = './assets/11n@2x.png';
        break;
      }
      case '13d': {
        conditionIcon = './assets/13d@2x.png';
        break;
      }
      case '13n': {
        conditionIcon = './assets/13n@2x.png';
        break;
      }
      case '50d': {
        conditionIcon = './assets/50d@2x.png';
        break;
      }
      case '50n': {
        conditionIcon = './assets/50n@2x.png';
        break;
      }
      default: {
        conditionIcon = './assets/01d@2x.png';
        break;
      }
    }

    return conditionIcon;
  }
}
