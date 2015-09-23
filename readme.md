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

import DatePicker from './date-picker';

function logDate(date) {
	console.log(date);
}

const app = tree(
	<DatePicker
		pickerClass="picker"
		yearPickerClass="years"
		monthPickerClass="months"
		dayPickerClass="days"
		dayClass="day"
		chooseButtonClass="button"
		chooseText="Välj datum"
		callback={logDate} />
	);

render(app, document.querySelector('main'));
```


## API

```js
<DatePicker
		pickerClass="picker"
		yearPickerClass="years"
		monthPickerClass="months"
		dayPickerClass="days"
		dayClass="day"
		chooseButtonClass="button"
		chooseText="Välj datum"
		startDate={new Date()}
		callback={logDate} />
	);
```


## License

MIT © [Ulrik Augustsson](http://google.com)
