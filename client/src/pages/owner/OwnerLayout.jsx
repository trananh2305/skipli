import React, { Fragment } from 'react'
import HeadingOwner from '../../components/HeadingOwner'
import NavbarOwner from '../../components/NavbarOwner'
import { Outlet } from 'react-router-dom'

const OwnerLayout = () => {
  return (
    <Fragment>
      <div className="flex flex-col top-0 left-0 w-full z-50 bg-white ">
        <HeadingOwner />
      </div>
      <div className="flex h-[calc(100vh-100px)] w-full">
        <NavbarOwner />
        <div className=" flex justify-center items-center flex-1">
          <Outlet />
        </div>
      </div>
    </Fragment>
  )
}

export default OwnerLayout