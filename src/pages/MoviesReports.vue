<template>
  <div>
    Relatorios de Filmes
  </div>
</template>

<script>
import Service from '../services/axios-requests'
export default {
  name: 'MoviesReports',
  methods: {
    async handleRequestMovies() {
      await Service.listarMovies().then(res => console.log(res))
    }
  },
  mounted() {
    this.handleRequestMovies()
  }
}  
</script>

<style>
</style>