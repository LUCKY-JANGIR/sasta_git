import React from 'react'
import { Chatnav } from './Chatnav'
import Chatinputs from './Chatinputs'
import Chatarea from './Chatarea'

export default function Mainchat() {
  return (
    <div className='flex flex-col w-full'>
      <Chatnav/>
      <Chatarea/>
      <Chatinputs/>
    </div>
  )
}
