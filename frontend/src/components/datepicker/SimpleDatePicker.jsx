import React from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

class SimpleDatePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: moment().toDate()
        }
    };

    handleChange(date) {
        console.log(this);
        console.log(date);
        this.setState({startDate: date});
    };

    render() {
        return <DatePicker
            selected={this.state.startDate}
            onChange={(date) => this.handleChange(date)}
            showTimeSelect
            timeFormat="hh:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MM-dd-yyyy hh:mm a"
        />
    }

}

export default SimpleDatePicker;