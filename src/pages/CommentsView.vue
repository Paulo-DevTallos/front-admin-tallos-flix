<template>
  <div>
    View de comentarios
  </div>
</template>

<script>
import Service from '../services/axios-users.requests'

export default {
  name: 'CommentsView',
  methods: {
    async handleRequestComments() {
      await Service.listarComments().then(res => console.log(res))
    }
  },
  mounted() {
    this.handleRequestComments()
  }
}  
</script>

<style>
</style>