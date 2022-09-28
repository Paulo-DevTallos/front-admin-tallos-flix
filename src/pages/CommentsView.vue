<template>
  <div>
    <ul>
      <li v-for="comment in comments" :key="comment._id">{{ comment.text }}</li>
    </ul>
  </div>
</template>

<script>
import ServiceComments from '../services/axios-comments.request'

export default {
  name: 'CommentsView',
  data() {
    return {
      comments: [],
    }
  },
  methods: {
    handleRequestComments() {
      ServiceComments.getComments().then(res => {
        this.comments = res.data
      })
    }
  },
  mounted() {
    this.handleRequestComments()
  }
}  
</script>

<style>
</style>