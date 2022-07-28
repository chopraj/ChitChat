import React from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';

import ChannelSearch from './ChannelSearch'
import TeamChannelPreview from './TeamChannelPreview'
import TeamChannelList from './TeamChannelList'
import LogoutIcon from '../assets/Logout.png'


const cookies = new Cookies();

const OrgHeader = ({logout}) => (
    <div className="channel-list__header">
        <p className="channel-list__header__text">ChitChat Home&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
        <div className="channel-list__sidebar__icon2">
            <div title="Logout" className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width="22"/>
            </div>
        </div>
    </div>
)

const ChannelTeamFilter = (channels) => {
    return channels.filter((c) => c.type === 'team');
}

const ChannelMessagingFilter = (channels) => {
    return channels.filter((c) => c.type === 'messaging');
}

const ChannelListContent = ({ creating, setCreating, setCreateType, setEditing }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userID');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            {/*(<SideBar logout={logout} />*/}
            <div className="channel-list__list__wrapper">
                <OrgHeader logout={logout}/>
                <ChannelSearch />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={ChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            creating={creating}
                            setCreating={setCreating}
                            setCreateType={setCreateType} 
                            setEditing={setEditing}
                            
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setCreating={setCreating}
                            setEditing={setEditing}
                            
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={ChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            creating={creating}
                            setCreating={setCreating}
                            setCreateType={setCreateType} 
                            setEditing={setEditing}
                            
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            creating={creating}
                            setCreating={setCreating}
                            setEditing={setEditing}
                            
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setCreating, setEditing }) => {
    

    return (
        <>
            <div className="channel-list__container">
              <ChannelListContent 
                setCreating={setCreating} 
                setCreateType={setCreateType} 
                setEditing={setEditing} 
              />
            </div>
            {/*<div className="channel-list__container-responsive"
                style={{ left: toggleType ? "0%" : "-89%", backgroundColor: "86b1c7"}}
            >
                <div className="channel-list__container-toggle" onClick={() => setToggleType((p) => !p)}>
                </div>
                <ChannelListContent 
                setCreating={setCreating} 
                setCreateType={setCreateType} 
                setEditing={setEditing}
                setToggleType={setToggleType}
              />
            </div>*/}
            
        </>
    )

}

export default ChannelListContainer;