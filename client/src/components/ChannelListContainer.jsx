import React,{useState} from 'react'
import {ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import ChannelSearch from './ChannelSearch'
import TeamChannelPreview from './TeamChannelPreview'
import TeamChannelList from './TeamChannelList'
import ChatIcon from '../assets/textbubble2.png'
import LogoutIcon from '../assets/Logout.png'

const cookies = new Cookies()

const SideBar = ({logout}) => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
        <div  className='icon1__inner'>
          <img src={ChatIcon} width='30'/>
        </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
        <div onClick={logout} className='icon1__inner'>
          <img src={LogoutIcon} alt='Logout' width='30'/>
        </div>
    </div>
  </div>
);

const OrgHeader = () => (
  <div className='channel-list__header'>
    <p className='channel-list__header__text'>
        Welcome to ChitChat
    </p>
  </div>
)

const ChannelTeamFilter = (channels) => {
    return channels.filter((c) => c.type === 'team')
}

const ChannelMessagingFilter = (channels) => {
    return channels.filter((c) => c.type === 'messaging')
}


const ChannelListContent = ({creating, setCreating, createType, setCreateType, setEditing}) => {

  const {client} = useChatContext()
  const filters = {members: {$in: [client.userID]}}
  const logout = () => {
    cookies.remove('userID')
    cookies.remove('username')
    cookies.remove('fullName')
    cookies.remove('avatarURL')
    cookies.remove('hashedPassword')
    cookies.remove('phoneNumber')
    cookies.remove('token')

    window.location.reload()
  }


  return (
    <>
      <SideBar logout={logout}/>
      <div className='channel-list__list__wrapper'>
        <OrgHeader />
        <ChannelSearch />
        <ChannelList 
          filters = {filters}
          channelRenderFilterFn = {ChannelTeamFilter}
          List={(listProps)=>(
            <TeamChannelList
              {...listProps}
              type='team'
              Creating={creating}
              setCreating={setCreating}
              setCreateType={setCreateType}
              setEditing={setEditing}
            />
          )}
          Preview={(prevProps)=>{
            <TeamChannelPreview
            {...prevProps}
            type='team'
            />
          }}
          />
          <ChannelList 
            filters = {filters}
            channelRenderFilterFn = {ChannelMessagingFilter}
            List={(listProps)=>(
              <TeamChannelList
                {...listProps}
                type='messaging'
                Creating={creating}
                setCreating={setCreating}
                setCreateType={setCreateType}
                setEditing={setEditing}
              />
            )} 
            Preview={(prevProps)=>{
              <TeamChannelPreview
                {...prevProps}
                type='messaging'
                Creating={creating}
                setCreating={setCreating}
                setCreateType={setCreateType}
                setEditing={setEditing}
              />
            }}
          />
      </div>
    </>
  )
}


const ChannelListContainer = ({setCreateType, setCreating, setEditing}) => {
  const [toggleType, setToggleType] = useState(false)

  return (
    <>
      <div className='channel-list__container'>
        <ChannelListContent 
          setCreating={setCreating}
          setEditing={setEditing}
          setCreateType={setCreateType}
        />
      </div>
      <div className='channel-list__container-responsive' style={{ left: toggleType ? "0%" : "-89%", backgroundColor: "#005fff"}}>
        <div className='channel-list__container-toggle' onClick={() => setToggleType((p) => !p)}>
          <ChannelListContent 
            setCreating={setCreating}
            setEditing={setEditing}
            setCreateType={setCreateType}
            setToggleType={setToggleType}
          />
        </div>
      </div>
    </>
  )

}

export default ChannelListContainer