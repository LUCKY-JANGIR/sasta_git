import React from 'react'

export default function Nav() {
  return (
      <div className='flex justify-between my-3 mx-14'>
     <a href="/"> <h1 className='primerytext uppercase text-lg font-thin tracking-tight'>
      gen ~ <span className='text-2xl fontbold'>artchain</span>
      </h1></a>
      <ul className='flex justify-evenly w-1/2 text-sm uppercase'>
        <li><a href="/marketplace" className='secondarytext'>Marketplace</a></li>
        <li><a href="/">create</a></li>
        <li><a href="/">profile</a></li>
      </ul>
    </div>
  )
}
