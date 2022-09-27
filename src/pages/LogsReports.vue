<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-width-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4>Gerenciamento de Logs</h4>
            </template>
            <table class="table">
              <thead>
                <tr>
                  <th class="header-table" v-for="(column, index) in columns" :key="index">
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody v-for="session in sessions" :key="session._id">
                <tr>
                  <td>{{ session.user_id }}</td>
                  <td>
                    <div id="actions-op">
                      <i class="nc-icon nc-settings-gear-64"></i>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Service from '../services/axios-session.request'
import Card from '../components/Cards/Card.vue'
const tableColumns = ['E-mail', 'Acções da sessão']
export default {
  name: "LogsReports",
  components: { Card },
  data() {
    return {
      columns: [...tableColumns],
      sessions: []
    };
  },
  methods: {
    listAllSessions() {
      Service.listSession().then(res => {
        this.sessions = res.data;
      });
    }
  },
  mounted() {
      this.listAllSessions();
  },
}  
</script>

<style>
</style>