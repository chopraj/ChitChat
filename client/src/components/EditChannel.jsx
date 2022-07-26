import React, {useState} from 'react'
import {useChatContext} from 'stream-chat-react'

import UserList from './UserList.jsx'
import {CloseCreateChannel} from '../assets/CloseCreateChannel'

const ChannelNameInput = ({ channelName = '', setChannelName }) => {
  const {client, setActiveChannel} = useChatContext()
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])


    const handleChange = (event) => {
        event.preventDefault();

        setChannelName(event.target.value);
    }

    return (
        <div className="channel-name-input__wrapper">
            <p>Name</p>
            <input value={channelName == null ? "" : channelName} onChange={handleChange} placeholder="channel-name" />
            <p>Add Members</p>
        </div>
    )
}

const reset = (setChannelName, setEditing, setSelectedUsers) => {
  setChannelName(null)
  setEditing(false)
  setSelectedUsers([])
}

const EditChannel = ({setEditing}) => {
  const {channel} = useChatContext()
  const [channelName, setChannelName] = useState(channel?.data?.name || '')
  const [selectedUsers, setSelectedUsers] = useState([])

  const updateChann = async (e) => {
    e.preventDefault()

    if (channelName !== (channel.data.name || channel.data.id)) {
      await channel.update({name: channelName}, {text: 'Channel name changed'})
    }

    if (selectedUsers.length) {
      await channel.addMembers(selectedUsers)
    }
    reset(setChannelName, setEditing, setSelectedUsers)
  }

  return (
    <div className='edit-channel__container'>
      <div className='edit-channel__header'>
        <p>Edit Channel</p>
        <CloseCreateChannel setEditing={setEditing} />
      </div>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers} />
      <div className='edit-channel__button-wrapper' onClick={updateChann}>
        <p>Save all changes</p>
      </div>
    </div>
  )
}

export default EditChannel