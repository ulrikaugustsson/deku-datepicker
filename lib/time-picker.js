import element from 'virtual-element';
import moment from 'moment';

function createTimePicker(opts = {}) {
	const IncreaseTime = opts.increase || {
		render (component) {
			const {increase} = component.props;
			return (<button class="IncreaseTime" onClick={increase}>öka</button>);
		}
	}

	const DecreaseTime = opts.decrease || {
		render (component) {
			const {decrease} = component.props;
			return (<button class="DecreaseTime" onClick={decrease}>minska</button>);
		}
	}

	const TimeContainer = opts.container || {
		render (component) {
			return <div class="TimeContainer">{component.props.children}</div>;
		}
	}

	const HourContainer = opts.hourContainer || TimeContainer;
	const MinuteContainer = opts.minuteContainer || TimeContainer;

	const ChooseTimeButton = opts.chooseTimeButton || {
		render(component) {
			const {callback, chooseText} = component.props;
			return (
				<button class="ChooseTimeButton" onClick={callback}>
					{chooseText}
				</button>
			);
		}
	};

	const TimePicker = {
		initialState(props) {
			return {
				currentTime: props.initialTime ? moment(props.initialTime) : moment()
			};
		},

		render (component, setState) {
			const {currentTime} = component.state;
			const {callback, chooseText, minuteStep, hourStep, watcher} = component.props;

			function changeTime (date) {
				if (watcher) {
					watcher(date);
				}
				setState({currentTime: date});
			}

			return (
				<div>
					<HourContainer>
						<DecreaseTime decrease={() => {changeTime(currentTime.subtract(hourStep || 1, 'hours'))}}/>
							{currentTime.hours()}
						<IncreaseTime increase={() => {changeTime(currentTime.add(hourStep || 1, 'hours'))}}/>
					</HourContainer>

					<MinuteContainer>
						<DecreaseTime decrease={() => {changeTime(currentTime.subtract(minuteStep || 1, 'minutes'))}}/>
							{currentTime.minutes()}
						<IncreaseTime increase={() => {changeTime(currentTime.add(minuteStep || 1, 'minutes'))}}/>
					</MinuteContainer>

					{watcher ? <noscript /> : <ChooseTimeButton
						callback={() => callback(currentTime.toDate())}
						chooseText={chooseText || 'Choose Time'}/>}
				</div>
			);
		}
	};

	return TimePicker;
}

export default createTimePicker;
