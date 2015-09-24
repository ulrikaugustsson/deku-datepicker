# deku-datepicker [![Build Status](https://travis-ci.org/ulrikaugustsson/deku-datepicker.svg?branch=master)](https://travis-ci.org/ulrikaugustsson/deku-datepicker)

> Datepicker for deku


## Install

```
$ npm install --save deku-datepicker
```


## Usage

```js
import element from 'virtual-element';
import {render, tree} from 'deku';

import createPicker from 'deku-datepicker';

const DatePicker = createPicker();

function logDate(date) {
	console.log(date);
}

const app = tree(
	<DatePicker
		chooseText="Välj datum"
		callback={logDate} />
);

render(app, document.querySelector('main'));
```


## API

```js
const DatePicker = createDatePicker([opts]);

/*
	opts {
		yearPicker: <YearPicker />,
		monthPicker: <MonthPicker />,
		day: <Day />,
		dayPicker: <DayPicker />,
		chooseDayButton: <ChooseDayButton />
	};
*/

<DatePicker
	callback={logDate}
	[chooseText="Välj datum" initialDate={new Date()}]/>
```
Check source for examples.


## License

MIT © [Ulrik Augustsson](http://google.com)
