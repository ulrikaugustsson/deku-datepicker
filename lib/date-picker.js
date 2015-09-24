import element from 'virtual-element';
import moment from 'moment';

function createDatePicker(opts = {}) {
	const YearPicker = opts.yearPicker || {
		render(component) {
			const {add, subtract, currentDate} = component.props;

			return (<div class="YearPicker">
				<button onClick={subtract}>prev</button>
				{currentDate.year()}
				<button onClick={add}>next</button>
			</div>);
		}
	};

	const MonthPicker = opts.monthPicker || {
		render(component) {
			const {add, subtract, currentDate} = component.props;

			return (<div class="MonthPicker">
				<button onClick={subtract}>prev</button>
				{currentDate.month() + 1}
				<button onClick={add}>next</button>
			</div>);
		}
	};

	const Day = opts.day || {
		render(component) {
			const {currentDate, dayNumber, setDay} = component.props;

			return <div onClick={() => setDay(dayNumber)} class={`DayPicker--day ${currentDate.date() === dayNumber ? 'active' : ''}`}>{dayNumber}</div>;
		}
	};

	const DayPicker = opts.dayPicker || {
		render(component) {
			const {currentDate} = component.props;
			const days = Array.apply(null, {length: currentDate.daysInMonth()}).map(Number.call, Number);

			const monthDays = days.map(el => {
				const dayNumber = el + 1;

				return (<Day dayNumber={dayNumber} {...component.props} />);
			});

			return (<div class="DayPicker">{monthDays}</div>);
		}
	};

	const ChooseDayButton = opts.chooseDayButton || {
		render(component) {
			const {callback, chooseText} = component.props;
			return (
				<button class="ChooseDayButton" onClick={callback}>
					{chooseText}
				</button>
			);
		}
	};

	const DatePicker = {
		initialState(props) {
			return {currentDate: props.initialDate ? moment(props.initialDate) : moment()};
		},

		render(component, setState) {
			const {pickerClass, callback, chooseText, watcher} = component.props;
			const {currentDate} = component.state;

			function changeDate (date) {
				if (watcher) {
					watcher(date);
				}
				setState({currentDate: date});
			}

			return (
				<div class={pickerClass || 'DatePicker'}>
					<YearPicker
						subtract={() => changeDate(currentDate.subtract(1, 'year'))}
						add={() => changeDate(currentDate.add(1, 'year'))}
						currentDate={currentDate} />

					<MonthPicker
						subtract={() => changeDate(currentDate.subtract(1, 'month'))}
						add={() => changeDate(currentDate.add(1, 'month'))}
						currentDate={currentDate} />

					<DayPicker
						setDay={dayNumber => changeDate(currentDate.date(dayNumber))}
						currentDate={currentDate} />

					{watcher ? <noscript /> : <ChooseDayButton
						callback={() => callback(currentDate.toDate())}
						chooseText={chooseText || 'Choose Day'}/>}
				</div>
			);
		}
	};

	return DatePicker;
}

export default createDatePicker;
