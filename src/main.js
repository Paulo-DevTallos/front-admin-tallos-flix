/*!

 =========================================================
 * Vue Light Bootstrap Dashboard - v2.0.0 (Bootstrap 4)
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2019 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import Store from './store'
//import fontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faImdb } from '@fortawesome/free-brands-svg-icons'
// LightBootstrap plugin
import LightBootstrap from './light-bootstrap-main'
// router setup
import {LMap, LTileLayer, LMarker, LTooltip, LCircleMarker} from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import routes from './routes/routes'
import './registerServiceWorker'

import JwPagination from 'jw-vue-pagination'
// plugin setup
library.add(fas, faImdb)
Vue.use(VueRouter)
Vue.use(LightBootstrap)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('jw-pagination', JwPagination)
Vue.component('l-map', LMap)
Vue.component('l-tooltip', LTooltip)
Vue.component('l-tile-layer', LTileLayer)
Vue.component('l-marker', LMarker)
Vue.component('l-circle-marker', LCircleMarker)

Vue.config.productionTip = false

// configure router
const router = new VueRouter({
  //mode: history,
  routes, // short for routes: routes
  linkActiveClass: 'nav-item active',
  scrollBehavior: (to) => {
    if (to.hash) {
      return {selector: to.hash}
    } else {
      return { x: 0, y: 0 }
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: Store,
  render: h => h(App),
  router
})
