import { APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE } from '@/redux/types';

export function rootReducer(state, { type, data }) {
	switch (type) {
		case TABLE_RESIZE: {
			const field = data.type === 'col' ? 'colState' : 'rowState';
			return { ...state, [field]: value(state, field, data) };
		}
		case CHANGE_TEXT: {
			return { ...state, currentText: data.value, cellState: value(state, 'cellState', data) };
		}
		case CHANGE_STYLES: {
			return { ...state, currentStyles: data };
		}
		case APPLY_STYLE: {
			const updatedState = state.stylesState || {};
			data.ids.forEach(id => {
				updatedState[id] = { ...updatedState[id], ...data.value };
			});
			return {
				...state,
				stylesState: updatedState,
				currentStyles: { ...state.currentStyles, ...data.value },
			};
		}
		case CHANGE_TITLE: {
			return {
				...state,
				title: data,
			};
		}
		default:
			return state;
	}
}

function value(state, field, actionData) {
	const val = state[field] || {};
	val[actionData.id] = actionData.value;
	return val;
}
