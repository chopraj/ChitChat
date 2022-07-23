import React from 'react'
import {ChannelList, useChatContext} from 'stream-chat-react'
import Cookies from 'universal-cookie'

import ChannelSearch from './ChannelSearch'
import TeamChannelPreview from './TeamChannelPreview'
import TeamChannelList from './TeamChannelList'
import ChatIcon from '../assets/textbubble2.png'
import LogoutIcon from '../assets/Logout.png'

const SideBar = () => (
  <div className='channel-list__sidebar'>
    <div className='channel-list__sidebar__icon1'>
        <div className='icon1__inner'>
          <img src={ChatIcon} width='30'/>
        </div>
    </div>
    <div className='channel-list__sidebar__icon2'>
        <div className='icon1__inner'>
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

const ChannelListContainer = () => {
  return (
    <>
      <SideBar />
      <div className='channel-list__list__wrapper'>
        <OrgHeader />
        <ChannelSearch />
        <ChannelList 
          filters = {{}}
          channelRenderFilterFn = {()=> {}}
          List={(listProps)=>(
            <TeamChannelList
              {...listProps}
              type='team'
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
            filters = {{}}
            channelRenderFilterFn = {()=> {}}
            List={(listProps)=>(
              <TeamChannelList
                {...listProps}
                type='messaging'
              />
            )} 
            Preview={(prevProps)=>{
              <TeamChannelPreview
                {...prevProps}
                type='messaging'
              />
            }}
          />
      </div>
    </>
  )
}

export default ChannelListContainer