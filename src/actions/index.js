import { SWITCH_THEME } from '../constants/action-types';

export const switchTheme = (theme) => {
  console.log(theme);
  return {
    type: SWITCH_THEME,
    payload: theme,
  };
};
