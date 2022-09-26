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
              <div class="content input-space">
                <base-input 
                  placeholder="Encontre um usuário"
                />
                <button class="btn btn-primary">Pesquisar</button>
              </div>
            </template>
            <l-table 
              class="table-hover table-striped"
              :columns="columns"
              :data="users"
            >
            </l-table>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'

const tableColumns = ['Name', 'Email']

export default {
  components: {
    LTable,
    Card,
  },
  data () {
    return {
      columns: [...tableColumns],
      users: this.$store.state.users,
    }
  },

  methods: {
    getAllUsers() {  
      this.$store.dispatch('handleUsersRequest', this.users)
    },
  },
  mounted() {
    this.getAllUsers()
  }
}
</script>
<style>
.actions-btn button {
  margin: 10px;
}

.input-space {
  display: flex;
  margin: 20px 5px;
}

.input-space input {
  width: 330px;
}

.btn {
  padding: 8px 10px;
}
</style>