import React from 'react'
import { Avatars } from '../assets/avatars'

 const avatarSelector = (picker) => {
    const maybe = picker
    return Avatars[maybe]
}

export default avatarSelector