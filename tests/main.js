import { ChainWorks, ChainButton } from 'chainworks';

ChainWorks.lazy('div#app').then(app => {
	app.render(new ChainButton().set('text', 'Chain Button!').use(btn => {
		let counter = 0;
		let paused = false;
		const count_fn = () => {
			btn.text = `${++counter} seconds have passed.`;
		};
		let interval = setInterval(count_fn, 1000);
		btn.event('click', () => {
			if (paused) {
				btn.text = `${counter} seconds have passed.`;
				interval = setInterval(count_fn, 1000);
			} else {
				btn.text = 'Paused!';
				clearInterval(interval);
			}
			paused = !paused;
		});
	}))
});