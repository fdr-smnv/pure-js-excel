import { defaultStyles, defaultTitle } from '@/constants';

const defaultState = {
	colState: {},
	rowState: {},
	cellState: {},
	stylesState: {},
	currentText: '',
	title: defaultTitle,
	currentStyles: defaultStyles,
	lastOpened: Date.now().toString(),
};

const normalize = state => ({
	...state,
	currentStyles: defaultStyles,
	currentText: '',
	lastOpened: Date.now().toString,
});

export function normalizeInitialState(state) {
	return state ? normalize(state) : { ...defaultState };
}
