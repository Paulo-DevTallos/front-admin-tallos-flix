<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid">
      <sidebar-link to="/admin/overview" class="navbar-brand">
        Admin TallosFlix - {{ username }}
      </sidebar-link>
      <div class="collapse navbar-collapse justify-content-end">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <div @click="logout" id="nav-link">
              Log out
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  computed: {
    routeName () {
      const {name} = this.$route
      return this.capitalizeFirstLetter(name)
    }
  },
  data () {
    return {
      activeNotifications: false,
      username: localStorage.getItem('username')
    }
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push('/login')
    },
    capitalizeFirstLetter (string) {
      return string.charAt(0).toUpperCase() + string.slice(1)
    },
    toggleNotificationDropDown () {
      this.activeNotifications = !this.activeNotifications
    },
    closeDropDown () {
      this.activeNotifications = false
    },
    toggleSidebar () {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
    },
    hideSidebar () {
      this.$sidebar.displaySidebar(false)
    }
  },
}
</script>
<style>
.container-fluid a {
  color: inherit;
}
#nav-link {
  cursor: pointer;
  color: #808080;
  transition: .4s ease-in-out;
  padding: 7px 12px;
}

#nav-link:hover {
  background: #005cc6;
  border-radius: 10px;
  color: #fff;
}
</style>
