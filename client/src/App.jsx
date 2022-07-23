import React from 'react'
import { StreamChat } from 'stream-chat'
import { Chat } from 'stream-chat-react'
import Cookies from 'universal-cookie'

import ChannelContainer from './components/ChannelContainer'
import ChannelListContainer from './components/ChannelListContainer'
import Auth from './components/Auth'
import './App.css'


const key = 'v85qtsvytunc'
const client = StreamChat.getInstance(key)
const cookies = new Cookies()
const authToken = cookies.get('token')

// Create user 
if (authToken) {
  client.connectUser({
    id: cookies.get('userID'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    image: cookies.get('avatarURL'),
    hashedPassword: cookies.get('hashedPassword'),
    phoneNumber: cookies.get('phoneNumber'),
  }, authToken)
}


const App = () => {
  if (!authToken) return <Auth/>
  return (
    <div className='app__wrapper'>
        <Chat client={client} theme='team light'>
            <ChannelListContainer
            
            />
            <ChannelContainer
            
            />
        </Chat>
    </div>
  )
}

export default App