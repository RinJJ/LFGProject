import React, {useState, useContext} from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom"
import { UserAuthContext } from "./context/UserAuth"
import { CurrentUserContext } from "./context/CurrentUser"

function PageLogin() {

// Bringing in context
    const { userAuth, setUserAuth } = useContext(UserAuthContext) // is this the session or the user? do i need a seperate context for "current user"
    const { currentUser, setCurrentUser } = useContext(CurrentUserContext)

// UseHistory assignment
    const history = useHistory()

// Setting state for form

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

// Handlers
    const handleEmail = (e) => { setEmail(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

// Handle Submit
    const handleSubmit = (e) => {
        e.preventDefault()

        const loginUser = {
            email: email,
            password: password,
        }

        fetch('/login',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(loginUser)
            })
            .then(r => {
                if(r.ok) {
                    r.json().then(user => {
                        setUserAuth(user)
                        setCurrentUser(user)
                        history.push('/')
                        console.log(currentUser)
                    })
                }else {
                    r.text().then(console.warn)
                }
            })
        }
















    return (
        <>
        <h2>Please Log in!</h2>
        <Form className='login' onSubmit={handleSubmit}>
            <div>
                    <>
                        <Form.Control onChange={handleEmail} type='text' name='Email' placeholder='Email'/>
                        <Form.Control onChange={handlePassword} type='text' name='Password' placeholder='Password'/>
                    </>
                <Button type='submit'>Log In!</Button>
            </div>
        </Form>
        </>
    )
}

export default PageLogin;
