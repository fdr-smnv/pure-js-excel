/// <reference types="jest" />
import { createStore } from './createStore';

const initialState = { count: 0 };
const addAction = { type: 'ADD' };
const reducer = (state = initialState, action) => {
	if (action.type === 'ADD') {
		return { ...state, count: state.count + 1 };
	}
	return state;
};

describe('createStore:', () => {
	let store;
	let handler;

	beforeEach(() => {
		store = createStore(reducer, initialState);
		handler = jest.fn();
	});

	test('should return store object', () => {
		expect(store).toBeDefined();
		expect(store.dispatch).toBeDefined();
		expect(store.subscribe).toBeDefined();
		expect(store.getState).toBeDefined();
	});

	test('should be instance of object', () => {
		expect(store.getState()).toBeInstanceOf(Object);
	});

	test('should return return default state', () => {
		expect(store.getState()).toEqual(initialState);
	});

	test('should update store if action is valid', () => {
		store.dispatch(addAction);
		expect(store.getState().count).toBe(1);
	});

	test('should NOT update store if action is invalid', () => {
		store.dispatch({ type: 'INVALID_ACTION' });
		expect(store.getState().count).toBe(0);
	});

	test("should call subscriber's function", () => {
		store.subscribe(handler);

		store.dispatch(addAction);

		expect(handler).toHaveBeenCalled();
		expect(handler).toHaveBeenCalledWith(store.getState());
	});

	test("should NOT call subscribers function if it's unsubscribed", () => {
		const sub = store.subscribe(handler);
		sub.unsubscribe();

		store.dispatch(addAction);
		expect(handler).not.toHaveBeenCalled();
	});

	test('should dispatch asynchronously', () => {
		return new Promise(resolve => {
			setTimeout(() => {
				store.dispatch(addAction);
			}, 500);
			setTimeout(() => {
				expect(store.getState().count).toBe(1);
				resolve();
			}, 1000);
		});
	});
});
