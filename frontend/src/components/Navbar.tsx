import React from 'react'
import { Navbar, Typography, Collapse } from '@material-tailwind/react'

import reactLogo from '../assets/react.svg'
import ProfileMenu from './navbar/ProfileMenu'
import NavList from './navbar/NavList'

// profile menu component

export default function CustomNav() {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  // const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur)

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setIsNavOpen(false)
    )
  }, [])

  return (
    <Navbar
      fullWidth
      className="mx-auto px-2 h-[10vh] lg:pl-6 bg-custom border-0 sticky top-0 z-40 "
    >
      <div className="relative mx-auto flex items-center text-white justify-between">
        <div className="flex items-center ">
          <img
            src={reactLogo}
            className="logo react logo-spin px-2"
            alt="React logo"
          />
          <Typography className="cursor-pointer font-semibold text-xl">
            It's on me!
          </Typography>
        </div>

        {/* <div className="absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block">
          <NavList />
        </div> 
        <IconButton
          size="sm"
          color="gray"
          variant="text"
          onClick={toggleIsNavOpen}
          className="ml-auto mr-2 lg:hidden"
        >
          <Bars2Icon className="h-6 w-6" />
        </IconButton>
      */}
        <div className="flex items-center gap-x-2">
          <span>Aksel</span>
          <ProfileMenu />
        </div>
      </div>
      <Collapse open={isNavOpen} className="overflow-scroll">
        <NavList />
      </Collapse>
    </Navbar>
  )
}
