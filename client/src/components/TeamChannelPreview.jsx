import React from 'react'
import { UserFromToken } from 'stream-chat'
import {Avatar, useChatContext} from 'stream-chat-react'

const TeamChannelPreview = ({setActiveChannel, setCreating, setEditing, setToggleType, channel, type}) => {
  const {channel: activeChannel, client} = useChatContext()

  const ChannelPreview = () => (
    <p className='channel-preview__item'>
      #{channel?.data?.name ||channel?.data?.id}
    </p>
  )

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(({user}) => user.id !== client.userID)
    console.log(members[0])

    return (
      <div className="channel-preview__item single">
        <Avatar 
          image={members[0]?.user?.image}
          name={members[0]?.user?.name || members[0]?.user?.id}
          size={24}
         />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </div>
    )
  }

  return (
    <div className={
      channel?.id === activeChannel?.id 
          ? 'channel-preview__wrapper__selected' 
          : 'channel-preview__wrapper'
    }
    onClick={() => {
      setCreating(false)
      setEditing(false)
      setActiveChannel(channel)
      if(setToggleType){
        setToggleType((p)=> !p)
      }
      console.log(channel)
    }}
    >
      {type === 'team' ? <ChannelPreview/> : <DirectPreview/>}
    </div>
  )
}

export default TeamChannelPreview