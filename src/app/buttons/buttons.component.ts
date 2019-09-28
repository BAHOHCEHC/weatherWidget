import { OnInit, Component, EventEmitter, Output } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { SET_LOCATION, REFRESH_WEATHER, CLEAR_WEATHER } from '../reducers';
import { Observable } from 'rxjs';
import { AppState } from './../app.state';
import { Weather } from './../models/weather.model';
import { WeatherService } from '../weather.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html'
})
export class ButtonsComponent implements OnInit {
  @Output() onRefresh = new EventEmitter<String>();
  weatherArr$: Observable<Weather[]>;

  loc$: Observable<string>;
  loc: string = '';
  constructor(private store: Store<AppState>, private weatherService: WeatherService) {
    this.loc$ = store.select('loc');
    this.loc$.subscribe(loc => {
      this.loc = loc;
    });
  }

  ngOnInit() {}

  search(location: string) {
    if (location && location !== this.loc) {
      this.loc = location;
      this.clearhWeather();
      this.dispatchLocation();
    } else {
      this.dispatchLocation();
    }
    this.refreshWeather();
  }
  clearhWeather() {
    this.store.dispatch({ type: CLEAR_WEATHER });
    this.store.select('weat').pipe(first());
  }
  refreshWeather() {
    this.onRefresh.emit(this.loc);
  }
  dispatchLocation() {
    this.store.dispatch({ type: SET_LOCATION, payload: this.loc });
  }
}
