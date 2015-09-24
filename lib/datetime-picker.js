import element from 'virtual-element';
import moment from 'moment';
import {curry} from 'ramda';
import createDatePicker from './date-picker';
import createTimePicker from './time-picker';

function createDateTimePicker(opts = {}) {
	const DatePicker = createDatePicker(opts);
	const TimePicker = createTimePicker(opts);

	const ChooseDateTimeButton = opts.chooseDateTimeButton || {
		render(component) {
			const {callback, chooseText} = component.props;
			return (
				<button class="ChooseDateTimeButton" onClick={callback}>
					{chooseText}
				</button>
			);
		}
	};

	const DateTimePicker = {
		initialState(props) {
			return {
				currentDateTime: props.initialDateTime ? moment(props.initialDateTime) : moment()
			}
		},

		render (component, setState) {
			const {callback, chooseText} = component.props;
			const {currentDateTime} = component.state;

			function mergeDate(dateTime, type, date) {
				console.log('watch');

				const momentDate = moment(date);
				if (dateTime.isSame(momentDate)) {
					return;
				}

				if (type === 'time') {
					setState({currentDateTime: momentDate.set({
						year: dateTime.year(),
						month: dateTime.month(),
						date: dateTime.date()
					})});
				} else if (type === 'date') {
					setState({currentDateTime: momentDate.set({
						hour: dateTime.hour(),
						minute: dateTime.minute(),
						second: 0
					})});
				}
			}

			return (
				<div class="DateTimePicker">
					<DatePicker
						watcher={curry(mergeDate)(currentDateTime, 'date')}
						initialDate={currentDateTime} />
					<TimePicker
						watcher={curry(mergeDate)(currentDateTime, 'time')}
						initialTime={currentDateTime} />

					<ChooseDateTimeButton
						callback={() => callback(currentDateTime.toDate())}
						chooseText={chooseText || 'Choose Datetime'}/>
				</div>
			);
		}
	};

	return DateTimePicker;
}

export default createDateTimePicker;
