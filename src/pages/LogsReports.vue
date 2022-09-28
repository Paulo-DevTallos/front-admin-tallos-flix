<template>
  <div class="content">
    <div class="container-fluid">
      <card class="bg-color">
        <template slot="header">
          <h4 class="card-title">Gerenciamento de logs</h4>
          <p class="card-category">Relatório de logs dos usuários logado na plataforma</p>
        </template>
        <ul class="report-content">
          <li v-for="session in sessions" :key="session._id">{{ session.user_id }}</li>
        </ul>
      </card>
    </div>      
  </div>
</template>

<script>
import Card from '../components/Cards/Card.vue'
import Service from '../services/axios-session.request'
export default {
  components: { Card },
  name: 'LogsReports',
  data() {
    return {
      sessions: [],
    }
  },
  methods: {
    listAllUserSessions() {
      Service.listSession().then(res => {
        const parseSession = JSON.parse(JSON.stringify(res.data))
        return this.sessions = parseSession
      })
    },
  },
  mounted() {
    this.listAllUserSessions()
  }
}
</script>

<style lang="scss" scoped>
  .report-content {
    padding: 10px 0;
  }
  .report-content li {
    padding: 25px;
    border-radius: 5px;
    box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.062);
    margin: 4px;
  }
  </style>