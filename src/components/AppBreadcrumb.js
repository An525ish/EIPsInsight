import React from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'
// hello bro do do

import { CBreadcrumb, CBreadcrumbItem } from '@coreui/react'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname
  console.log(currentLocation)
  const getRouteName = (pathname, routes) => {
    const currentRoute = routes.find((route) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location) => {
    const breadcrumbs = []
    location.split('/').reduce((prev, curr, index, array) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <CBreadcrumb className="m-0 ms-2">
      <CBreadcrumbItem href="/">
        <label
          style={{ cursor: 'pointer', color: 'gray' }}
          className="hover:text-[#1c7ed6] hover:font-[900] hover:border-b-[#65afe4] hover:border-b-2"
        >
          Home
        </label>
      </CBreadcrumbItem>
      {breadcrumbs.length === 0 && (
        <CBreadcrumbItem href={currentLocation}>
          <label
            style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}
            className="bg-[#e7f5ff] text-[#1c7ed6] px-5 py-1 rounded-[15px] tracking-wide cursor-pointer"
          >
            {currentLocation.substring(1).toUpperCase()}
          </label>
        </CBreadcrumbItem>
      )}
      {breadcrumbs.map((breadcrumb, index) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            <label
              style={{ color: 'black', fontWeight: 'bold', fontSize: '14px' }}
              className="bg-[#e7f5ff] text-[#1c7ed6] px-5 py-1 rounded-[15px] tracking-wider uppercase"
            >
              {breadcrumb.name}
            </label>
          </CBreadcrumbItem>
        )
      })}
    </CBreadcrumb>
  )
}

export default React.memo(AppBreadcrumb)
