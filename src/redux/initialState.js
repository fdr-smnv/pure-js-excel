import { defaultStyles, defaultTitle } from '@/constants';

const normalize = state => ({
	...state,
	currentStyles: defaultStyles,
	currentText: '',
	lastOpened: Date().toString(),
});

export function normalizeInitialState(state) {
	const defaultState = {
		colState: {},
		rowState: {},
		cellState: {},
		stylesState: {},
		currentText: '',
		title: defaultTitle,
		currentStyles: defaultStyles,
		lastOpened: Date().toString(),
	};

	return state ? normalize(state) : { ...defaultState };
}
