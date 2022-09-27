<template>
  <div class="content">
    <div class="container-fliud">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-width-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4>Relatório de usuários</h4>
              <p class="card-category">Usuários disponíveis na plataforma</p>
            </template>
            <table class="table">
              <thead>
                <tr>
                  <th
                    v-for="(column, index) in columns"
                    :key="index"
                  >
                  {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody v-for="user in users" :key="user._id">
                <tr>
                  <td>{{ user.name }}</td>
                  <td>{{ user.email }}</td>
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
import LTable from '../components/Table.vue'
import Card from '../components/Cards/Card.vue'
import Service from '../services/axios-requests'
const tableColumns = ['Name', 'E-mail']
export default {
  name: 'UserReports',
  components: {
    LTable,
    Card,
  },
  data() {
    return {
      columns: [...tableColumns],
      users: [],
    }
  },
  methods: {
    listUsers() {
      Service.listar().then(res => {
        const parseUser = JSON.parse(JSON.stringify(res.data))
        return this.users = parseUser
      })
    }
  },
  mounted() {
    this.listUsers()  
  }
}  
</script>