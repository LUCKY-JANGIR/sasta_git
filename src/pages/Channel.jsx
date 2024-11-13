import React from 'react'
import Communitytab from '../components/Communitytab'
import Projectstab from '../components/Projectstab'

export default function Channel() {
    return (
        <div className='flex max-h-screen'>
            <Communitytab />
            <Projectstab />
            Communities
        </div>
    )
}
