import { Weather } from './models/weather.model';

export const SET_LOCATION = 'SET_LOCATION';
export const REFRESH_WEATHER = 'REFRESH_WEATHER';
export const CLEAR_WEATHER = 'CLEAR_WEATHER';

const initialState = 'kyiv';
export function locationReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_LOCATION:
      state = action.payload;
      return state;
    default:
      return state;
  }
}

export function weatherReducer(state: Weather[] = [], action: any) {
  switch (action.type) {
    case REFRESH_WEATHER:
      state = [...state, action.payload];
      return state;
    case CLEAR_WEATHER:
      state = [];
      return state;
    default:
      return state;
  }
}
