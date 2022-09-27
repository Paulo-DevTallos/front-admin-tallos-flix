<template>
  <div class="content page-height">
    <div class="content container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-width-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="header-table">Gerenciamento de Logs</h4>
              <p>Nesse ambiente é possível verificar os usuários que estão online na plataforma</p>
            </template>
          </card>
          <card>
            <ul class="list">
              <li class="list-session" v-for="session in sessions" :key="session._id">
                <div>
                  {{ session.user_id }}
                </div>
              </li>
            </ul>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../services/axios-session.request'
import Card from '../components/Cards/Card.vue'

export default {
  name: "LogsReports",
  components: { Card },
  data() {
    return {
      sessions: []
    };
  },
  methods: {
    listAllSessions() {
      Service.listSession().then(res => {
        this.sessions = res.data;
      });
    },
  },
  mounted() {
      this.listAllSessions();
  },
}  
</script>

<style>
.page-heigth {
  height: 100vh;
}

.header-table {
  margin: 0 0 15px;
}

.list {
  padding: 0;
}

.list-session {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.139);
  border-radius: 5px;
  margin: 3px 0;
  transition: .3s ease-in;
}

.list-session:hover {
  background-color: #00000005;
}
</style>