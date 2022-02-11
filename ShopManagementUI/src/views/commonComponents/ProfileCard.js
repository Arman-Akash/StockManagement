import React from 'react'
import { apiHostName } from '../../config'


const ProfileCard = (props) => {
    return (
        <div className="profile-card">
        {
            (props.photo != undefined && props.photo != null && props.photo != "")?
            (<img src={apiHostName + "/images/profilePictures/" + props.photo } alt="John" />):
            (<img src="/avatars/6.jpg" alt="John" />)
        }
            
            <h3>{props.name}</h3>
            {/* <p className="title">Rank</p> */}
        </div>
    )
}

export default ProfileCard;