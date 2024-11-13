import React from 'react'

export default function Nav() {
  return (
    <div className='flex justify-between uppercase text-sm font-thin h-fit max-h-[3.5vh]'>
      <a href="/"> <h1 className='primerytext font-normal'>
        sasta-git
      </h1></a>
      <ul className='flex justify-evenly w-1/2 text-sm uppercase'>
        <li><a href="/sastagit" className='secondarytext'>Sasta git</a></li>
        <li><a href="/">create</a></li>
        <li><a href="/">profile</a></li>
      </ul>
    </div>
  )
}
