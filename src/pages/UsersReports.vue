<template>
  <div class="content">
    <div class="container-fluid">
      <div class="row">
        <div class="col-12">
          <card 
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Lista de usuários TallosFlix</h4>
              <p class="card-category">Disponibilidade de usuários cadastrados na plataforma</p>
            </template>
            <l-table 
              class="table-hover table-striped"
              :columns="columns"
              :data="users">
            </l-table>
            <choose-popup 
              v-if="hidden_modal"
            />
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import Service from '../services/axios-requests'
import ChoosePopup from '../components/Popups/ChoosePopup.vue'

const tableColumns = ['Name', 'Email']

export default {
  components: {
    LTable,
    Card,
    ChoosePopup,
  },
  data () {
    return {
      columns: [...tableColumns],
      users: [],
      hidden_modal: false
    }
  },

  methods: {
    async listUsers() {
      await Service.listar().then(res => {
        return this.users = res.data
      })
    },
  },
  mounted() {
    this.listUsers()
  }
}
</script>
<style>
.actions-btn button {
  margin: 10px 15px;
}
</style>