import React, {useState, useContext} from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom"
import { UserAuthContext } from "./context/UserAuth"
import { CurrentUserContext } from "./context/CurrentUser"




function PageLogin( ) {

    const { userAuth, setUserAuth } = useContext(UserAuthContext) // is this the session or the user? do i need a seperate context for "current user"
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

    const [ signUp, setSignUp ] = useState(false)
    const history = useHistory()

    const handleClick = () => setSignUp((signUp) => !signUp) //is it possible to instaed of using the button but use the above state to modify which form shows


    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleUsername = (e) => { setUsername(e.target.value) }
    const handleEmail = (e) => { setEmail(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser ={
            username: username,
            email: email,
            password: password,
        }

        fetch(signUp?'http://127.0.0.1:5555/signup':'http://127.0.0.1:5555/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(r => r.json())
            .then(user => {
                setUserAuth(user)
                setCurrentUser(user)
                history.push('/')
            })
    }



    // This handle logout with be a navbar onclick?? that replaces the Login Nav 

    // const handleLogout = () => {
    //     fetch('http://127.0.0.1:5555/Logout', {
    //         method: 'DELETE',
    //     }).then(r => {
    //         if(r.ok){
    //             setUserAuth(null)
    //             history.push('/')
    //         }
    //     })
    // }





    //     onSubmit:(values) => {
    //         fetch(signUp?'http://127.0.0.1:5555/signup':'http://127.0.0.1:5555/login',{
    //             method: 'POST',
    //             headers:{
    //                 'Content-Type':'application/json'
    //             },
    //             body: JSON.stringify(values)
    //         })
    //         .then(r => r.json())
    //         .then(user => {
    //             setUserAuth(user)
    //             history.push('/')
    //         })
    //     }
    // }

//TODO: How to have error messages from the form show 

    return (
        <>
        <h2>Please Log in or Sign up!</h2>
        <h2>{signUp?'Already a member?':'Not a member?'}</h2>
        <button onClick={handleClick}>{signUp?'Log in!':'Register now!'}</button>
        <Form className='login-create' onSubmit={handleSubmit}>
            <div>
                {signUp?(
                    <>
                        <Form.Control onChange={handleUsername} type='text' name='Username' placeholder='Username'/>
                        <Form.Control onChange={handleEmail} type='text' name='Email' placeholder='Email'/>
                        <Form.Control onChange={handlePassword} type='text' name='Password' placeholder='Password'/>
                    </>
                ):
                    <>
                        <Form.Control onChange={handleEmail} type='text' name='Email' placeholder='Email'/>
                        <Form.Control onChange={handlePassword} type='text' name='Password' placeholder='Password'/>
                    </>
                }
                <Button type='submit' value={signUp?'Sign Up!' : 'Log In!'}>{signUp?'Sign Up!' : 'Log In!'}</Button>
            </div>
        </Form>
        </>
    )
}

export default PageLogin;
