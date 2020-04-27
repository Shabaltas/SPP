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
        this.setState({startDate: date});
        this.props.onChange(date);
    };

    render() {
        return <DatePicker
            selected={this.state.startDate}
            onChange={(date) => this.handleChange(date)}
            dateFormat="MM-dd-yyyy"
        />
    }

}

export default SimpleDatePicker;