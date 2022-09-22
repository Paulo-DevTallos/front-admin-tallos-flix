// GeneralViews
import Login from '../pages/Login.vue'
import NotFound from '../pages/NotFoundPage.vue'

// Admin pages
import DashboardLayout from '../layout/DashboardLayout.vue'
import Overview from 'src/pages/Overview.vue'
import UserProfile from 'src/pages/UserProfile.vue'
import TableList from 'src/pages/TableList.vue'
import Typography from 'src/pages/Typography.vue'
import Icons from 'src/pages/Icons.vue'
import Maps from 'src/pages/Maps.vue'
import Notifications from 'src/pages/Notifications.vue'
import CommentsView from '../pages/CommentsView.vue'
import UsersReports from '../pages/UsersReports'
import MoviesReports from '../pages/MoviesReports'
import LogsReports from '../pages/LogsReports'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    //redirect: '/admin/overview'
  },
  {
    path: '/admin',
    name: 'admin',
    component: DashboardLayout,
    //redirect: '/admin/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: Overview
      },
      {
        path: 'user',
        name: 'User',
        component: UserProfile
      },
      {
        path: 'users',
        name: 'UsersReports',
        component: UsersReports
      },
      {
        path: 'maps',
        name: 'Maps',
        component: Maps
      },
      {
        path: 'movies',
        name: 'MoviesReports',
        component: MoviesReports
      },
      {
        path: 'comments',
        name: 'Comments',
        component: CommentsView
      },
      {
        path: 'logs',
        name: 'LogsReports',
        component: LogsReports
      },
      //rotas obsoletas
      {
        path: 'table-list',
        name: 'Table List',
        component: TableList
      },
      {
        path: 'typography',
        name: 'Typography',
        component: Typography
      },
      {
        path: 'icons',
        name: 'Icons',
        component: Icons
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: Notifications
      },
    ]
  },
  { path: '*', component: NotFound },
]

/**
 * Asynchronously load view (Webpack Lazy loading compatible)
 * The specified component must be inside the Views folder
 * @param  {string} name  the filename (basename) of the view to load.
function view(name) {
   var res= require('../components/Dashboard/Views/' + name + '.vue');
   return res;
};**/

export default routes
