import * as React from "react";
import MuiAlert from '@material-ui/lab/Alert';
class Alert extends React.Component {
    render() {
        return (
            <MuiAlert elevation={6} variant="filled" {...this.props} />
        )
    }
}

export default Alert;
