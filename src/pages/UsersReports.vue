<template>
  <div>
    Relatorio de usuarios da plataforma
    <ul>
      <li v-for="user in users" :key="user._id">{{ user.name }} - {{ user.email }}</li>
    </ul>
  </div>
</template>

<script>
import Service from '../services/axios-requests'

export default {
  name: 'UsersReports',
  data() {
    return {
      users: [],
    }
  },
  methods: {
    //list users
    async listUser() {
      await Service.listar().then(res => {
        return JSON.stringify(this.users = res.data)
      })
    }
  },

  mounted() {
    this.listUser()
  }
}
</script>

<style>
</style>