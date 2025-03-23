import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import { useState } from "react";
import './sign-in-form.styles.scss'
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    email: '',
    password: ''
};

const  SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    
    const handleChange = (event) => {
        const {name, value} = event.target;
        
        setFormFields({...formFields, [name]:value});
    };

    const resetFormFields = () => {
            setFormFields(defaultFormFields);
    };
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            const {user} = await signInAuthUserWithEmailAndPassword(email, password);
            resetFormFields();      
        }
        catch(error){
            switch(error.code){
                case 'auth/invalid-credential':
                    alert('invalid credentials');
                    break;
                default:
                    console.log(error);
            }
        }
    };

    const signInWithGoogle = async ()=>{
        await signInWithGooglePopup();
    };

    return(
        <div className="sign-in-container">
            <h2>I already have an account</h2>
            <span>Sign In with your email and password</span>
            <form onSubmit={handleSubmit}>
            <FormInput label='Email' type='email' required onChange={handleChange} name='email' value={email}/>
            <FormInput label= 'Password' type='password' required onChange={handleChange} name= 'password' value={password}/>
            <div className="buttons-container">
            <Button type='submit'>SIGN IN</Button>
            <Button buttonType='google' type='button' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
            </div>
            </form>
            </div>
    );
}
export default SignInForm;