import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import SignInImage from '../assets/front2.png'


const initState = {
    fullName: '',
    username: '',
    password: '',
    phoneNumber: '',
    avatarURL: '',
}

const cookies = new Cookies()

const Auth = () => {

    const [form, setForm] = useState(initState)
    const [onSignup, setonSignup] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e) => {
        try {
        console.log('handleSubmit..')
        e.preventDefault()
        const {username, password, phoneNumber, avatarURL} = form;
        const URL = 'http://localhost:5001/auth'
        const {data: {token, userID, hashedPassword, fullName}} = await axios.post(`${URL}/${onSignup ? 'signup' : 'signin'}`,
        {username, password, fullName: form.fullName, phoneNumber, avatarURL})

        cookies.set('token', token)
        cookies.set('username', username)
        cookies.set('fullName', fullName)
        cookies.set('userID', userID)
 
        if (onSignup) {
            cookies.set('phoneNumber', phoneNumber)
            cookies.set('avatarURL', avatarURL)
            cookies.set('hashedPassword', hashedPassword)
        }
        window.location.reload()
        } catch (error) {
            console.log(error)
        }
        

    }

    const switchType = () => {
        setonSignup((prev) => !prev)
    }
  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
        <div className='typing-wrapper'>
                <h1 className='welcometag'>Welcome to <u>ChitChat</u>!</h1>
            </div>
            <div className='auth__form-container_fields-content'>
                <p>{onSignup ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {onSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input required onChange={handleChange}placeholder='Full Name' type='text' name='fullName'></input>
                        </div>
                    )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='username'>Username</label>
                            <input required onChange={handleChange }placeholder='Username' type='text' name='username'></input>
                        </div>
                    {onSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='Phone Number'>Phone Number</label>
                            <input  onChange={handleChange} placeholder='Optional' type='number' name='phoneNumber'></input>
                        </div>
                    )}
                    {onSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input  onChange={handleChange} placeholder='Optional' type='text' name='avatarURL'></input>
                        </div>
                    )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input required onChange={handleChange} placeholder='Password' type='password' name='password'></input>
                        </div>
                    <div className='auth__form-container_fields-content_button'>
                        <button>{onSignup ? 'Get Started!' : 'Welcome back!'}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                        <p>{onSignup ? 'Already have an account?' : "Don't have an account?"}
                            <span onClick={switchType}>
                                {onSignup ? "  Sign In" : " Get Started!"}
                            </span>
                        </p>
                </div>
            </div>
        </div>
        <div className='auth__form-container_image'>
            
            
            <h5 className='pitch'> <u>Communication</u> and <u>Collaboration</u> made easy.</h5>
            <h6 className='subpitch'>Enjoy sending messages, emojis, GIFs, and attachments among your team!</h6>
            <img  src={SignInImage}/>
        </div>
    </div>
  )
}

export default Auth