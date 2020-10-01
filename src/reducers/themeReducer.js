import {SWITCH_THEME} from '../constants/action-types';
import { lightTheme } from '../constants/themes';

const initialState = {
  theme: lightTheme,
};

export const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SWITCH_THEME:
      console.log(action.payload);
      return Object.assign({}, { theme: action.payload });
    default:
      return state;
  }
};
