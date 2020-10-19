import { defaultStyles, defaultTitle } from '@/constants';
import { storage } from '@core/utils';

const defaultState = {
  colState: {},
  rowState: {},
  cellState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
};

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

export const initialStorage = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState;
