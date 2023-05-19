import React, {useState, useContext} from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useHistory } from "react-router-dom"
import { UserAuthContext } from "./context/UserAuth"
import { CurrentUserContext } from "./context/CurrentUser"




function PageCreateAcc( ) {

    const { setUserAuth } = useContext(UserAuthContext) // is this the session or the user? do i need a seperate context for "current user"
    const { setCurrentUser } = useContext(CurrentUserContext)

    const history = useHistory()


    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleUsername = (e) => { setUsername(e.target.value) }
    const handleEmail = (e) => { setEmail(e.target.value) }
    const handlePassword = (e) => { setPassword(e.target.value) }

    const handleSubmit = (e) => {
        e.preventDefault()

        const newUser = {
            username: username,
            email: email,
            password: password,
        }

        fetch('/signup',{
                method: 'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body: JSON.stringify(newUser)
            })
            .then(r => {
                if(r.ok) {
                    r.json().then(user => {
                        setUserAuth(user)
                        setCurrentUser(user)
                        history.push('/')
                        console.log(user)
                    })
                }else {
                    r.text().then(console.warn)
                }
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

//TODO: How to have error messages from the form show 

    return (
        <>
            <h2 className='text-center mb-4 mt-4'>Please Sign up!</h2>
            <div className='text-center mb-4'>
                <Form className='login-create' onSubmit={handleSubmit}>
                    <div>
                            <Form.Group>
                                <Form.Control onChange={handleUsername} type='text' name='Username' style={{ width: '300px', margin: '0 auto' }} placeholder='Username'/>
                            </Form.Group>
                            <Form.Group className="mt-1">
                                <Form.Control onChange={handleEmail} type='text' name='Email' style={{ width: '300px', margin: '0 auto' }} placeholder='Email'/>
                            </Form.Group>
                            <Form.Group className="mt-1">
                                <Form.Control onChange={handlePassword} type='text' name='Password' style={{ width: '300px', margin: '0 auto' }} placeholder='Password'/>
                            </Form.Group>

                        <Button className="mt-3" variant="outline-primary" type='submit'>'Sign Up!'</Button>
                    </div>
                </Form>
            </div>
        </>
    )
}

export default PageCreateAcc;
