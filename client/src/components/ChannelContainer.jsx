import React from 'react'
import {Channel, useChatContext, MessageTeam} from 'stream-chat-react'
import ChannelInner from './ChannelInner'
import CreateChannel from './CreateChannel'
import EditChannel from './EditChannel'
import TeamMessage from './TeamMessage'



const ChannelContainer = (
  {creating, setCreating, editing, setEditing, createType}) => {

  const { channel } = useChatContext()

  if(creating) {
    return (
      <div className="channel__container">
        <CreateChannel createType={createType} setCreating={setCreating} />
      </div>
    )
  }
  if (editing) {
    return (
      <div className="channel__container">
        <EditChannel setEditing={setEditing} />
      </div>
    )
  }

  const EmptyState = () => (
    <div className="channel-empty__container">
      <p className="channel-empty__first">This is the start of your ChitChat history.</p>
      <p className="channel-empty__second">Send messages, links, emojis, GIFs, attachements, and more!</p>
    </div>
  )

  

  return (
    <div className='channel__container'>
      <Channel 
        EmptyStateIndicator={EmptyState}
        Message={(messageProps, index) => <MessageTeam key={index} {...messageProps}/>}
      >
        <ChannelInner setEditing={setEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer