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
      storeJwt: localStorage.getItem('token'),
    }
  },
  methods: {
    listComments() {
      ServiceComments.getComments({ headers: { Authorization: `Bearer ${this.storeJwt}` }}).then(res => {
        const parseComments = JSON.parse(JSON.stringify(res.data))
        return this.comments = parseComments
      })
    }
  },
  mounted() {
    this.listComments()
  }
}  
</script>

<style>
</style>