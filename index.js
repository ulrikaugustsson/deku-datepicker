import element from 'virtual-element';
import moment from 'moment';

function initialState(props) {
	return {currentDate: props.startDate ? moment(props.startDate) : moment()};
}

function render(component, setState) {
	const {props, state} = component;
	const {currentDate} = state;

	const days = Array.apply(null, {length: currentDate.daysInMonth()}).map(Number.call, Number);

	const monthDays = days.map(el => {
		const dayNumber = el + 1;

		return <div onClick={() => {setState({currentDate: currentDate.date(dayNumber)})}} class={`${props.dayClass} ${currentDate.date() === dayNumber ? 'active' : ''}`}>{dayNumber}</div>;
	});

	return (
		<div class={props.pickerClass}>
			<div class={props.yearPickerClass}>
				<button onClick={() => setState({currentDate: currentDate.subtract(1, 'year')})}>prev</button>
				{currentDate.year()}
				<button onClick={() => setState({currentDate: currentDate.add(1, 'year')})}>next</button>
			</div>
			<div class={props.monthPickerClass}>
				<button onClick={() => setState({currentDate: currentDate.subtract(1, 'month')})}>prev</button>
				{currentDate.month()}
				<button onClick={() => setState({currentDate: currentDate.add(1, 'month')})}>next</button>
			</div>
			<div class={props.dayPickerClass}>{monthDays}</div>
			<button class={props.chooseButtonClass} onClick={() => props.callback(currentDate.toDate())}>{props.chooseText}</button>
		</div>
	);
}

export default {initialState, render};
