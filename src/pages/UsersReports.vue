<template>
  <div>
    Relatorio de usuarios da plataforma
  </div>
</template>

<script>
//import Service from '../services/axios-requests'

export default {
  name: 'UsersReports',
  methods: {
    //list users
    /*async listUser() {
      await Service.listar().then(res => console.log(res.data))
    }*/
  },

  mounted() {
    this.listUser()
  }
}
</script>

<style>
</style>