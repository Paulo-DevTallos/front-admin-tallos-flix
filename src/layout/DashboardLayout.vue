<template>
  <div class="wrapper">
    <side-bar>
      <!-- menu mobile -->
      <mobile-menu slot="content"></mobile-menu>

      <!-- sidebar structure -->
      <ul class="menu-sidebar-links">
        <li>
          <sidebar-link to="/admin/overview">
            <i class="nc-icon nc-chart-pie-35"></i>
            <p>Dashboard</p>
          </sidebar-link>
        </li>
        <li>
          <sidebar-link to="/admin/users">
            <i class="nc-icon nc-single-02"></i>
            <p>Listar usuários</p>
          </sidebar-link>
        </li>
        <li>
          <sidebar-link to="/admin/maps">
            <i class="nc-icon nc-pin-3"></i>
            <p>Encontre um cinema</p>
          </sidebar-link>
        </li>
        <li>
          <sidebar-link to="/admin/movies">
            <i class="nc-icon nc-tv-2"></i>
            <p>Filmes</p>
          </sidebar-link>
        </li>
        <li>
          <sidebar-link to="#">
            <i class="nc-icon nc-notes"></i>
            <p>Relatórios</p>
          </sidebar-link>
          <ul class="submenu">
            <li>
              <sidebar-link to="/admin/comments">
                <i class="nc-icon nc-quote"></i>
                <p>Comentários</p>
              </sidebar-link>
            </li>
            <li>
              <sidebar-link to="/admin/logs">
                <i class="nc-icon nc-check-2"></i>
                <p>Usuarios online</p>
              </sidebar-link>
            </li>
          </ul>
        </li>  
      </ul>
    </side-bar>

    <!-- main dashboard painel -->
    <div class="main-panel">
      <top-navbar>
      </top-navbar>

      <dashboard-content @click="toggleSidebar">
      </dashboard-content>

      <content-footer>
      </content-footer>
    </div>
  </div>
</template>
<script>
import TopNavbar from './TopNavbar.vue'
import ContentFooter from './ContentFooter.vue'
import DashboardContent from './Content.vue'
import MobileMenu from './MobileMenu.vue'
import SidebarLink from '../components/SidebarPlugin/SidebarLink.vue'

export default {
  components: {
  TopNavbar,
  ContentFooter,
  DashboardContent,
  MobileMenu,
  SidebarLink
},
  methods: {
    toggleSidebar () {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false)
      }
    }
  }
}
</script>

<style>
ul {
  list-style: none;
}

.menu-sidebar-links {
  list-style: none;
  padding: 0;
}

.submenu {
  display: none;
  min-width: 100%;
}

.menu-sidebar-links > li:hover > .submenu,
.submenu > li:hover > .submenu {
  display: block;
}

.submenu > li:hover, .menu-sidebar-links a:hover {
  background: #009acc;
  transition: .4s ease-in-out;
  border-radius: 5px;
}
</style>