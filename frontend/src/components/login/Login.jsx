import * as React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {Link, withRouter} from 'react-router-dom';
import {AuthContext} from "../authprovider/AuthProvider.jsx";
import Alert from "../alert/Alert.jsx";
import configs from "../../config.json";


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {error: null}
    }

    login = (event) => {
        const email = event.target.elements[0].value;
        const password = event.target.elements[2].value;
        this.context.login(email, password);
        this.props.history.push(configs.routes.tasks);
    };

    render() {
        return (
            <Container component='main' maxWidth='xs'>
                <CssBaseline/>
                {this.state.error ? <Alert severity="error">{this.state.error}</Alert> : <div/>}
                <div>
                    <Typography component='h1' variant='h5'>
                        Sign in
                    </Typography>
                    <form noValidate onSubmit={this.login}>
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            id='email'
                            label='Email Address'
                            name='email'
                            autoComplete='email'
                            autoFocus
                        />
                        <TextField
                            variant='outlined'
                            margin='normal'
                            required
                            fullWidth
                            name='password'
                            label='Password'
                            type='password'
                            id='password'
                            autoComplete='current-password'
                        />
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link to={configs.routes.registration} variant='body2'>
                                    Don't have an account? Sign Up
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        )
    }
}

Login.contextType = AuthContext;
export default withRouter(Login)
