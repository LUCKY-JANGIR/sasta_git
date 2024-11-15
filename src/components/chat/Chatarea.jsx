import React from 'react'
import Chatcard from './Chatcard'

export default function Chatarea() {
  return (
    <div className='max-h-full flex flex-col size-full gap-y-3  overflow-auto'>
      <Chatcard/>
      <Chatcard/>
      <Chatcard/>
      <Chatcard/>
      <Chatcard/>
    </div>
  )
}
