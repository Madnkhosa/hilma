import React from 'react'
const Wishlistbutton = ({name}:{name:string}) => {
  return (
    <div className='flex justify-between'>
        <div className='text-[14px] font-[400] text-[#27272A]'>Accueil / Catégories /{name}</div>
    </div>
  )
}

export default Wishlistbutton