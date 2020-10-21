import React from 'react';
import '../Css/Login.css';
import {Button} from "@material-ui/core";
import {auth,provider} from "../firebase";
import {actionTypes} from "../reducer";
import {useStateValue} from "../StateProvider";

function Login(){
    const[{},dispatch]=useStateValue();

    const signIn=()=>{  
        auth.signInWithPopup(provider)
        .then(result=> {   
            dispatch({
                type: actionTypes.SET_USER,
                user: result.user,
            });
        })
        .catch(error=>    console.log(error.message));
    };
    return(
        <div className="login">
            <div className="login_container">
                <img src="https://i.pinimg.com/originals/79/dc/31/79dc31280371b8ffbe56ec656418e122.png" alt=""/>
                <div className="login_text">
                    <h1>Sign in to WhatsApp</h1>
                </div>
                <Button type="submit" onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    );
}
export default Login;
