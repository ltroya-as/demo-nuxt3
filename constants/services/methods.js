import capitalize from 'lodash/capitalize'
import { AVAILABLE_SERVICES } from '~/constants/services/constants'

/**
 * @param {string} slug
 * @param {string} section
 * @param {string} authorizedRoute
 * @param {boolean} showChart
 * @returns {object}
 */
export const getRoutes = (
  slug,
  section,
  authorizedRoute = 'portal',
  showChart = true,
) => {
  const defaultRoute = getRoute(slug, section)
  const authorized = `${defaultRoute}/${authorizedRoute}`
  const routes = {
    default: defaultRoute,
    authorized,
  }
  if (showChart) {
    return { ...routes, chart: `${defaultRoute}/chart` }
  }
  return routes
}

export const getRoute = (slug, section) => {
  return `/${section}/${slug}`
}

export const getRouteByOverview = (parent, market, slug, name) => [
  { to: `/${parent}/${market}/${slug}`, name },
]

export const getMenu = (
  name,
  slug,
  section,
  hasChildren = true,
  firstItem = '',
) => {
  return {
    name,
    href: `/${slug}`,
    parent: `/${section}`,
    hasChildren,
    firstItem: firstItem.replaceAll(' ', '-'),
  }
}

export const getSidebar = (
  slug,
  name,
  section,
  icon,
  children,
  isPrivate = false,
) => {
  const sectionName = AVAILABLE_SERVICES.find((item) => item.slug === section)

  return {
    name: slug,
    section: sectionName.name,
    label: name,
    icon,
    to: getRoute(slug, section),
    open: false,
    children: getChildrenSidebar(children, getRoute(slug, section)),
    isPrivate,
  }
}

export const getChildrenSidebar = (children, path) => {
  return children?.map((_item) => {
    return {
      name: capitalize(_item.name),
      to: _item.externalLink ? _item.path : `${path}/${_item.path}`,
      page: _item.path,
      externalLink: _item.externalLink,
      icon: _item.icon,
    }
  })
}
