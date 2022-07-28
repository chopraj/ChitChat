import React, {useState, useEffect} from 'react'
import { useChatContext } from 'stream-chat-react'
import Results from './Results'
import {SearchIcon} from '../assets/SearchIcon'


const ChannelSearch = () => {
  const {client, setActiveChannel} = useChatContext()
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [teamChannels, setTeamChannels] = useState([])
  const [directMessagingChannels, setDirectMessagingChannels] = useState([])

  useEffect(() => {
    if(!query){
      setTeamChannels([])
      setDirectMessagingChannels([])
    }
  },[query])

  const getChannels = async (text) => {
    try {
      const channelsResponse = client.queryChannels({
        type: 'team', 
        name: {$autocomplete: text},  
        members: { $in: [client.userID]}
      })

      const userResponse = client.queryUsers({
        id: { $ne: client.userID}, 
        name: {$autocomplete: text},
      })

      const [channels, {users}] = await Promise.all([channelsResponse, userResponse])

      if(channels.length) setTeamChannels(channels)
      if (users.length) setDirectMessagingChannels(users)
    } catch (error) {
      setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault()
    setLoading(true)
    setQuery(e.target.value);
    getChannels(e.target.value)
  }

  const setChannel = (c) => {
    setQuery('')
    setActiveChannel(c)
  }


  return (
    <div className='channel-search_container'>
      <div className='channel-search__input__wrapper'>
          <div className='channel-search__input__icon'>
              <SearchIcon/>
          </div>
          <input 
              className='channel-search__input__text' 
              placeholder='Search' 
              type='text' 
              value={query} 
              onChange={onSearch}
              />
      </div>
      {query && (
        <Results 
        teamChannels={teamChannels}
        directMessagingChannels={directMessagingChannels}
        loading={loading}
        setChannel={setChannel}
        setQuery={setQuery}
        
        />
      )}
    </div>
  )
}

export default ChannelSearch