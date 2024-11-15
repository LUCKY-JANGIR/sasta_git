import React from 'react'

export default function Chatcard() {
    return (
        <div className=' flex w-full h-fit p-2'>
            <div className='mr-2  w-[20vw]'>
            < img src="https://placehold.co/150x150" className="rounded-[50%] " />
            </div>
            <div className='text-sm bg-neutral-950 p-2 rounded-xl border-2 border-neutral-700' >
                <div className='flex mb-2'>
                <h1 className='capitalize font-bold pr-1  text-[#00efff]'>name</h1>
                <span className=''>data</span>
                </div>
                <div>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloremque ea ut, ad consequatur deleniti, provident culpa eius fuga labore odit voluptatem minima recusandae error optio dicta molestias natus exercitationem amet! Minus ratione error saepe nemo qui. Magnam totam laudantium earum eum reprehenderit similique voluptas ducimus dicta atque illo eius, nam placeat omnis magni facere ipsum qui obcaecati! Rem iusto hic, tenetur quasi asperiores, ut assumenda architecto quidem totam voluptate explicabo aperiam dolore fuga id. Odio tenetur consequatur, nostrum, placeat accusantium reiciendis officia dicta eligendi eaque, natus velit. Tempore deserunt impedit amet totam earum eligendi maxime, magnam debitis tenetur alias commodi?
                </div>
            </div>
        </div>
    )
}
