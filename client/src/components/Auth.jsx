import React, {useState} from 'react'
import Cookies from 'universal-cookie'
import axios from 'axios'

import SignInImage from '../assets/front2.png'


const initState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}


const Auth = () => {

    const [form, setForm] = useState(initState)
    const [onSignup, setonSignup] = useState(false)

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(form)
    }

    const switchType = () => {
        setonSignup((prev) => !prev)
    }
  return (
    <div className='auth__form-container'>
        <div className='auth__form-container_fields'>
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
                            <input required onChange={handleChange} placeholder='Phone Number' type='number' name='phoneNumber'></input>
                        </div>
                    )}
                    {onSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input required onChange={handleChange} placeholder='Avatar URL' type='text' name='avatarURL'></input>
                        </div>
                    )}
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='password'>Password</label>
                            <input required onChange={handleChange} placeholder='Password' type='password' name='password'></input>
                        </div>
                    {onSignup && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input required onChange={handleChange} placeholder='Confirm Password' type='password' name='confirmPassword'></input>
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button>{onSignup ? 'Sign In' : 'Get Started!'}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                        <p>{onSignup ? 'Already have an account?' : "Don't have an account?"}
                            <span onClick={switchType}>
                                {onSignup ? "  Sign In" : "  Create a new account"}
                            </span>
                        </p>
                </div>
            </div>
        </div>
        <div className='auth__form-container_image'>
            <img className='greetingimg' src={SignInImage}/>
        </div>
    </div>
  )
}

export default Auth