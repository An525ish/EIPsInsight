import React from 'react'
import AllEIPs from './views/charts/allEIPs'
import CurrentMonth from './views/charts/currentMonth'
import EIPs from './views/charts/EIPs'
import mForm from './views/pages/ManualForm/mForm'
import mForm2 from './views/pages/ManualForm/mForm2'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
// const Colors = React.lazy(() => import('./views/theme/colors/Colors'))
// const Typography = React.lazy(() => import('./views/theme/typography/Typography'))

// // Base
// const Accordion = React.lazy(() => import('./views/base/accordion/Accordion'))
// const Breadcrumbs = React.lazy(() => import('./views/base/breadcrumbs/Breadcrumbs'))
// const Cards = React.lazy(() => import('./views/base/cards/Cards'))
// const Carousels = React.lazy(() => import('./views/base/carousels/Carousels'))
// const Collapses = React.lazy(() => import('./views/base/collapses/Collapses'))
// const ListGroups = React.lazy(() => import('./views/base/list-groups/ListGroups'))
// const Navs = React.lazy(() => import('./views/base/navs/Navs'))
// const Paginations = React.lazy(() => import('./views/base/paginations/Paginations'))
// const Placeholders = React.lazy(() => import('./views/base/placeholders/Placeholders'))
// const Popovers = React.lazy(() => import('./views/base/popovers/Popovers'))
// const Progress = React.lazy(() => import('./views/base/progress/Progress'))
// const Spinners = React.lazy(() => import('./views/base/spinners/Spinners'))
// const Tables = React.lazy(() => import('./views/base/tables/Tables'))
// const Tooltips = React.lazy(() => import('./views/base/tooltips/Tooltips'))

// // Buttons
// const Buttons = React.lazy(() => import('./views/buttons/buttons/Buttons'))
// const ButtonGroups = React.lazy(() => import('./views/buttons/button-groups/ButtonGroups'))
// const Dropdowns = React.lazy(() => import('./views/buttons/dropdowns/Dropdowns'))

//Forms
// const ChecksRadios = React.lazy(() => import('./views/forms/checks-radios/ChecksRadios'))
// const FloatingLabels = React.lazy(() => import('./views/forms/floating-labels/FloatingLabels'))
// const FormControl = React.lazy(() => import('./views/forms/form-control/FormControl'))
// const InputGroup = React.lazy(() => import('./views/forms/input-group/InputGroup'))
// const Layout = React.lazy(() => import('./views/forms/layout/Layout'))
// const Range = React.lazy(() => import('./views/forms/range/Range'))
// const Select = React.lazy(() => import('./views/forms/select/Select'))
// const Validation = React.lazy(() => import('./views/forms/validation/Validation'))

const autoCharts = React.lazy(() => import('./views/charts/AutoCharts'))
const oldCharts = React.lazy(() => import('./views/charts/oldTempCharts'))

// Tables

const statusAll = React.lazy(() => import('./views/tables/status/status.all'))
const statusDraft = React.lazy(() => import('./views/tables/status/statusDraft'))
const statusFinal = React.lazy(() => import('./views/tables/status/statusFinal'))
const statusReview = React.lazy(() => import('./views/tables/status/statusReview'))
const statusLastCall = React.lazy(() => import('./views/tables/status/statusLastCall'))
const statusStagnant = React.lazy(() => import('./views/tables/status/statusStagnant'))
const statusWithdrawn = React.lazy(() => import('./views/tables/status/statusWithdrawn'))
const statusLiving = React.lazy(() => import('./views/tables/status/statusLiving'))

const typeAll = React.lazy(() => import('./views/tables/type/type.all'))
const table = React.lazy(() => import('./views/tables/ExplicitTable/table'))
const currentTable = React.lazy(() => import('./views/tables/ExplicitTable/tablecurrentmonth'))

// Icons
// const CoreUIIcons = React.lazy(() => import('./views/icons/coreui-icons/CoreUIIcons'))
// const Flags = React.lazy(() => import('./views/icons/flags/Flags'))
// const Brands = React.lazy(() => import('./views/icons/brands/Brands'))

//ContactUs
const contactUs = React.lazy(() => import('./views/pages/contactUs'))
// const login = React.lazy(() => import('./views/pages/login/Login'))

// Notifications
// const Alerts = React.lazy(() => import('./views/notifications/alerts/Alerts'))
// const Badges = React.lazy(() => import('./views/notifications/badges/Badges'))
// const Modals = React.lazy(() => import('./views/notifications/modals/Modals'))
// const Toasts = React.lazy(() => import('./views/notifications/toasts/Toasts'))

// mainForm
// const MForm = React.lazy(() => import('./views/pages/ManualForm/mForm'))

const date = new Date()

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

// errors
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const routes = [
  { path: '/', name: 'Dashboard', element: Dashboard },
  // { path: '/theme', name: 'Theme', element: Colors, exact: true },
  // { path: '/theme/colors', name: 'Colors', element: Colors },
  // { path: '/theme/typograpy', name: 'Typography', element: Typography },
  // { path: '/base', name: 'Base', element: Cards, exact: true },
  // { path: '/base/accordion', name: 'Accordion', element: Accordion },
  // { path: '/base/breadcrumbs', name: 'Breadcrumbs', element: Breadcrumbs },
  // { path: '/base/cards', name: 'Cards', element: Cards },
  // { path: '/base/carousels', name: 'Carousel', element: Carousels },
  // { path: '/base/collapses', name: 'Collapse', element: Collapses },
  // { path: '/base/list-groups', name: 'List Groups', element: ListGroups },
  // { path: '/base/navs', name: 'Navs', element: Navs },
  // { path: '/base/paginations', name: 'Paginations', element: Paginations },
  // { path: '/base/placeholders', name: 'Placeholders', element: Placeholders },
  // { path: '/base/popovers', name: 'Popovers', element: Popovers },
  // { path: '/base/progress', name: 'Progress', element: Progress },
  // { path: '/base/tables', name: 'Tables', element: Tables },
  // { path: '/base/tooltips', name: 'Tooltips', element: Tooltips },
  // { path: '/buttons', name: 'Buttons', element: Buttons, exact: true },
  // { path: '/buttons/buttons', name: 'Buttons', element: Buttons },
  // { path: '/buttons/dropdowns', name: 'Dropdowns', element: Dropdowns },
  // { path: '/buttons/button-groups', name: 'Button Groups', element: ButtonGroups },

  // { path: '/Insight', name: 'Charts', element: autoCharts },
  // { path: '/currentMonth', name: 'Current Month', element: CurrentMonth },
  { path: '/:id', name: 'Month', element: autoCharts },
  // { path: '/old-:id', name: 'Month', element: oldCharts },
  {
    path: `/${months[date.getMonth()].toLowerCase()}-${date.getFullYear()}`,
    name: `${months[date.getMonth()]} ${date.getFullYear()}`,
    element: CurrentMonth,
  },

  // { path: '/forms', name: 'Forms', element: FormControl, exact: true },
  // { path: '/forms/form-control', name: 'Form Control', element: FormControl },
  // { path: '/forms/select', name: 'Select', element: Select },
  // { path: '/forms/checks-radios', name: 'Checks & Radios', element: ChecksRadios },
  // { path: '/forms/range', name: 'Range', element: Range },
  // { path: '/forms/input-group', name: 'Input Group', element: InputGroup },
  // { path: '/forms/floating-labels', name: 'Floating Labels', element: FloatingLabels },
  // { path: '/forms/layout', name: 'Layout', element: Layout },
  // { path: '/forms/validation', name: 'Validation', element: Validation },
  // { path: '/icons', exact: true, name: 'Icons', element: CoreUIIcons },
  // { path: '/icons/coreui-icons', name: 'CoreUI Icons', element: CoreUIIcons },
  // { path: '/icons/flags', name: 'Flags', element: Flags },
  // { path: '/icons/brands', name: 'Brands', element: Brands },
  // { path: '/notifications', name: 'Notifications', element: Alerts, exact: true },
  // { path: '/notifications/alerts', name: 'Alerts', element: Alerts },
  // { path: '/notifications/badges', name: 'Badges', element: Badges },
  // { path: '/notifications/modals', name: 'Modals', element: Modals },
  // { path: '/notifications/toasts', name: 'Toasts', element: Toasts },

  { path: '/statusAll', name: 'Status', element: statusAll },
  { path: '/statusDraft', name: 'Status Draft', element: statusDraft },
  { path: '/statusReview', name: 'Status Review', element: statusReview },
  { path: '/statusFinal', name: 'Status Final', element: statusFinal },
  { path: '/statusLastCall', name: 'Status LastCall', element: statusLastCall },
  { path: '/statusStagnant', name: 'Status Stagnant', element: statusStagnant },
  { path: '/statusWithdrawn', name: 'Status Withdrawn', element: statusWithdrawn },
  { path: '/statusLiving', name: 'Status Living', element: statusLiving },

  { path: '/typeAll', name: 'Type', element: typeAll },

  { path: '/contactUs', name: 'Contact Us', element: contactUs },

  { path: '/living', name: 'Living', element: table },
  { path: '/final', name: 'Final', element: table },
  { path: '/lastcall', name: 'Last Call', element: table },
  { path: '/Last%20Call', name: 'Last Call', element: table },
  { path: '/review', name: 'Review', element: table },
  { path: '/draft', name: 'Draft', element: table },
  { path: '/stagnant', name: 'Stagnant', element: table },
  { path: '/withdrawn', name: 'Withdrawn', element: table },


  { path: '/StandardsTrack', name: 'Standard Track', element: table },
  { path: '/Meta', name: 'Meta', element: table },
  { path: '/Informational', name: 'Informational', element: table },

  { path: '/Standard-Core', name: 'Standard - Core', element: table },
  { path: '/Standard-ERC', name: 'Standard - ERC', element: table },
  { path: '/Standard-Networking', name: 'Standard - Networking', element: table },
  { path: '/Standard-Interface', name: 'Standard - Interface', element: table },
  // { path: '/Standard-Core', name: 'Standard - Core', element: table },
  // { path: '/Standard-Core', name: 'Standard - Core', element: table },

  { path: '/ChartTable', name: 'Chart Table', element: table },

  { path: '/current-Living', name: 'Living', element: currentTable },
  { path: '/current-Final', name: 'Final', element: currentTable },
  { path: '/current-Last_Call', name: 'Last Call', element: currentTable },
  { path: '/current-Review', name: 'Review', element: currentTable },
  { path: '/current-Draft', name: 'Draft', element: currentTable },
  { path: '/current-Stagnant', name: 'Stagnant', element: currentTable },
  { path: '/current-Withdrawn', name: 'Withdrawn', element: currentTable },


  { path: '/currentMonthTable', name: 'Current Month Table', element: currentTable },
  { path: '/EIP-:id', name: 'EIPs', element: EIPs },
  { path: '/EIPS', name: 'EIPs', element: AllEIPs },
  { path: '/insertForm', name: 'EIPs', element: mForm },
  { path: '/updateForm', name: 'EIPs', element: mForm2 },

  // errors
  { path: '/404', name: 'Page 404 - PAGE NOT FOUND', element: Page404 },
]

export default routes
