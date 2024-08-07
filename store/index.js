import { createStore } from 'vuex'

import announcements from '~/store/announcements'
import articles from '~/store/articles'
import auth from '~/store/auth'
import breadcrumb from '~/store/breadcrumb'
import chartBuilder from '~/store/chartBuilder'
import forms from '~/store/forms'
import indexes from '~/store/indexes'
import memberships from '~/store/memberships'
import menu from '~/store/menu'
import modal from '~/store/modal'
import navEvents from '~/store/navEvents'
import sidebar from '~/store/sidebar'
import toast from '~/store/toast'
import watchlist from '~/store/watchlist'
import chartSidebarFilter from '~/store/chartSidebarFilter'

export const store = createStore({
  modules: {
    announcements,
    articles,
    auth,
    breadcrumb,
    chartBuilder,
    forms,
    indexes,
    memberships,
    menu,
    modal,
    navEvents,
    sidebar,
    toast,
    watchlist,
    chartSidebarFilter,
  },
})
