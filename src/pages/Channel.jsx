import React from 'react'
import Communitytab from '../components/user/Communitytab'
import Projectstab from '../components/user/Projectstab'

export default function Channel() {
    return (
        <div className='flex max-w-screen  overflow-x-auto max-h-screen'>
            <Communitytab />
            <Projectstab />
        </div>
    )
}
