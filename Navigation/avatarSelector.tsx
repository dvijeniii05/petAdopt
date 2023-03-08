import React from 'react'
import { Avatars } from '../assets/avatars'

 const avatarSelector = (picker: string) => {
    const maybe = picker as keyof typeof Avatars
    return Avatars[maybe]
}

export default avatarSelector