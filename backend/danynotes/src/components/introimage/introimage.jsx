import React from 'react';
import profile_pic from './man.png'


console.log(profile_pic)

export default function prof_img() {
    return (
        <div className="imgContainer">
            <img src={profile_pic} alt="profile" />
        </div>
    )

}

