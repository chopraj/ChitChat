import React from 'react'

import { AddChannel } from '../assets/AddChannel.js'

const TeamChannelList = ({children, error = false, loading, type, creating, setCreating, setCreateType, setEditing}) => {
  if (error) {
    return type === 'team' ? (
      <div className='team-channel-list'>
        <p className='team-channel-list__message'>
          Connection error, please try again in a moment.
        </p>
      </div>
    ) : null;
  }


  if (loading) {
    return (
      <div className='team-channel-list'>
        <p className='team-channel-list_message loading'>
          {type === 'team' ? 'Channels' : 'Messages'} Loading...
        </p>
      </div>
    )
  }

  return (
    <div className='team-channel-list'>
      <div className='team-channel-list__header'>
        <p className='team-channel-list__header__title'>
          {type === 'team' ? 'Channels' : 'Direct Messages'}
        </p>
        <AddChannel
        creating={creating}
        setCreating={setCreating}
        setCreateType={setCreateType}
        setEditing={setEditing}
        type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  )
}

export default TeamChannelList