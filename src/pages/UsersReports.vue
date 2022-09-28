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
              <h4 class="card-title">Relatório de usuários</h4>
              <p class="card-category">Usuários disponíveis na plataforma</p>
            </template>
            <template>
              <!--<actions-bar />-->
            </template>
            <div class="table-content">
              <div id="users-table-header">
                <div>Nome</div>
                <div>E-mail</div>
                <div>Ações</div>
              </div>
              <div id="users-table-rows">
                <div class="users-table-row" v-for="user in users" :key="user._id">
                  <div>{{ user.name }}</div>
                  <div>{{ user.email }}</div> 
                  <!-- action buttons -->
                  <div id="items-alignment"> 
                    <div @click="showChooseModal(user._id)" id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </div>
                    <div id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </div>
                  </div> 
                  <choose-popup 
                    :data="user.name"
                    v-if="hiddenChooseModal && id === user._id"
                    @removeUser="deleteUser(user._id)"
                    @closeModal="hiddenModal"
                  />
                </div>
              </div>
            </div>
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
//import ActionsBar from '../components/ActionsBar.vue'
import ChoosePopup from '../components/Popups/ChoosePopup.vue'
export default {
  components: {
    LTable,
    Card,
    ChoosePopup
},
  data () {
    return {
      users: [],
      hiddenChooseModal: false,
      id: 0
    }
  },
  methods: {
    listUsers() {
      Service.listar().then(res => {
        const dataParse = JSON.parse(JSON.stringify(res.data))
        this.users = dataParse
      })
    },
    showChooseModal(id) {
      this.hiddenChooseModal = !this.hiddenChooseModal
      this.id = id
    },
    hiddenModal() {
      this.hiddenChooseModal = false
    },
    deleteUser(id) {
      Service.remove(id).then(res => {
        if (res.status === 200) {
          this.listUsers()
        }
      })
    }
  },
  mounted() {
    this.listUsers()
  }
}
</script>

<style>
.table-content {
  padding-left: 30px;
}
#items-alignment {
  display: flex;
}
#actions-op {
  background-color: #80808049;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: none;
  border-radius: 5px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.384);
  transition: .4s ease;
  cursor: pointer;
  text-align: end;
  margin: 3px;
}
#actions-op:first-child:hover {
  background-color: red;
  color: #fff;
}

#actions-op:last-child:hover {
  background-color: #009acc;
  color: #fff;
}

#users-table-header, 
#users-table-rows,
.users-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
#users-table-header {
  font-weight: normal;
  padding: 12px;
  color: rgb(146, 146, 146);
  border-bottom: 2px solid rgb(146, 146, 146);
}
#users-table-header div,
.users-table-row div {
  width: 30%;
}
.users-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
</style>