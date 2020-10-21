import { $ } from '@core/Dom';

export function Loader() {
	return $.create('div', 'loader').html('<div class="lds-ripple"><div></div><div></div></div>');
}
