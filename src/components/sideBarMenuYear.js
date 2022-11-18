/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable react/prop-types */
import { cilSpeedometer } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { AnimatePresence, motion } from 'framer-motion'
import React, { useState, useEffect } from 'react'
import './AppSidebar.css'
import { Link, NavLink } from 'react-router-dom'

const menuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.3, when: 'afterChildren' },
  },
  show: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 0.3,
      when: 'beforeChildren',
    },
  },
}

const inputAnimation = {
  hidden: {
    width: 0,
    padding: 0,
    transition: {
      duration: 0.2,
    },
  },
  show: {
    width: '140px',
    padding: '5px 15px',
    transition: {
      duration: 0.2,
    },
  },
}

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    opacity: 1,
    width: 'auto',
    transition: {
      duration: 0.5,
    },
  },
}
const menuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: '-100%',
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
}

const SidebarMenuYear = ({ route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    setIsOpen(true)
  }

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false)
    }
  }, [isOpen])
  return (
    <>
      <motion.nav
        className={`flex p-2 pl-4 items-center w-full ${
          isMenuOpen ? 'border-b-[#339af0] border-b-2 ' : ''
        } ${
          !isMenuOpen ? ' hover:border-b-[#abd5bd] hover:border-b-2' : ' '
        } rounded-[13px] cursor-pointer `}
        onClick={toggleMenu}
        animate={isMenuOpen ? 'open' : 'closed'}
        whileTap={{ scale: 0.97 }}
      >
        <CIcon
          icon={route.icon}
          style={{ color: `${isMenuOpen ? '#339af0' : '#adb5bd'}` }}
          customClassName="nav-icon"
        />
        <div className="menu_item">
          <AnimatePresence>
            <motion.div
              variants={showAnimation}
              initial="hidden"
              animate="show"
              exit="hidden"
              className={`text-[17px] ${isMenuOpen ? 'text-[#339af0]' : 'text-[#adb5bd]'} pr-10`}
            >
              {route.name}
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          variants={{
            open: { rotate: 180 },
            closed: { rotate: 0 },
          }}
          transition={{ duration: 0.2 }}
          style={{ originY: 0.55, originX: 0.55 }}
          className="ml-auto mr-3"
        >
          <svg
            width="13"
            height="12"
            viewBox="0 0 20 20"
            className={`${isMenuOpen ? 'fill-[#339af0]' : 'fill-[#adb5bd]'}`}
          >
            <path d="M0 7 L 20 7 L 10 16" />
          </svg>
        </motion.div>
      </motion.nav>{' '}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.ul
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col gap-[10px]"
          >
            {route.subRoutes.map((subRoute, i) => (
              <NavLink to={subRoute.path} key={i} activeClassName="active2">
                <motion.li
                  variants={menuItemAnimation}
                  key={i}
                  custom={i}
                  className="px-5 ml-auto pt-2 flex text-[17px] hover:text-white text-[#adb5bd]  cursor-pointer hover:transition-all hover:duration-100  hover:scale-105 hover:opacity-90 duration-500  hover:border-white hover:border-r-[2rem] focus:border-[white] focus:border-l-[2rem] focus:text-[white]"
                >
                  <motion.div className="text-[17px] ml-auto mr-7 hover:text-white ">
                    <NavLink
                      to={subRoute.path}
                      activeClassName="active2"
                      className="hover:text-[#339af0] "
                    >
                      {subRoute.name}
                    </NavLink>
                  </motion.div>
                </motion.li>
              </NavLink>
            ))}
          </motion.ul>
        )}{' '}
      </AnimatePresence>
    </>
  )
}

export default SidebarMenuYear
