import React, { useState, useContext } from 'react';
import { Modal, Segment, Header, Input, Button, Grid, Icon } from 'semantic-ui-react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { useFirebaseApp, useUser } from 'reactfire';
import 'firebase/auth';

interface ILoginProps extends RouteComponentProps<{ url: string }>{}

interface ILoginState {
    email: string,
    password: string
}

const Login = (props: ILoginProps) => {

    const firebase = useFirebaseApp();
    const user = useUser();

    const [state, setState] = useState<ILoginState>({
        email: '',
        password: ''
    })

    const login = async() => {
        firebase.auth().signInWithEmailAndPassword(state.email, state.password)
            .then(() => {
                console.log("Se inicio sesion: " + user.data.email);
                window.location.href='/'
            })
            .catch((error) => {
                console.log("Falló al iniciar sesión "+ error );
            })
    }


    return(
        <Modal 
            textAllign="center" 
            closeIcon
            onClose={() => props.history.push("/")}
            open={!user.data}
        >
            <Modal.Header>Products <Icon name="product hunt"/></Modal.Header>
            <Segment textAlign="center">
                <Header>
                    <Header.Content>Login</Header.Content>
                </Header>
                <Grid columns={1}>
                    <Grid.Row>
                        <Grid.Column>
                        <Input icon="user" placeholder="email" value={state.email} onChange={event => setState({...state, email: event.target.value})}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Input icon="key" placeholder="password" type="password" value={state.password} onChange={event => setState({...state, password: event.target.value})}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <a href="/password-recovery">Forgot the password?</a>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Button color="facebook" onClick={() => props.history.push("/register")}>Register</Button>
                            <Button color="green" onClick={login}>Log in</Button>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Segment>
        </Modal>
    );
}

export default Login;