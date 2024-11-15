import React from 'react'
import { Chatnav } from '../chat/Chatnav'
import Chatinputs from '../chat/Chatinputs'
import Chatarea from '../chat/Chatarea'

export default function Mainchat() {
  return (
    <div className='flex flex-col max-w-full overflow-auto  '>
      <Chatnav/>
      <Chatarea/>
      <Chatinputs/>
    </div>
  )
}
