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
              <actions-bar
                :title="buttonActionBarName" 
                @searchData="findUserByEmail"
                @reloadList="reloadAllUsers"
                @openFormData="openForm"
              />
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
                    <div @click="editUser(user._id, user)" id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </div>
                  </div> 
                  <choose-popup 
                    :message="message"
                    :data="user.name"
                    v-if="hiddenOptionsModal && id === user._id"
                    @removeResource="deleteUser(user._id)"
                    @closeModal="hiddenChooseModal"
                  />
                </div>
              </div>
            </div>
            <div class="card-footer align-p pb-0 pt-3">
              <pagination
                v-if="users.length"
                :skip="skip"
                :total="total"
                :limit="limit"
                @change-page="changePage"
              ></pagination>
            </div>
            <form-update
              v-if="callUpdateForm"
              :userData="userToUpdate"
              @updateUser="updateUser"
              @closeUpdateModal="closeUpdateModal"
            />
            <form-user-data 
              v-if="hiddenFormUser"
              @closeFormUser="closeFormUser"
              @submitNewUser="handleSubmitNewUser"
            />
          </card> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from '../services/http'
import LTable from 'src/components/Table.vue'
import Card from 'src/components/Cards/Card.vue'
import Service from '../services/axios-users.requests'
import ChoosePopup from '../components/Popups/ChoosePopup.vue'
import FormUpdate from '../components/FormUpdate.vue'
import ActionsBar from '../components/ActionsBar.vue'
import FormUserData from '../components/FormUserData.vue'
import Pagination from '../components/Pagination.vue'

export default {
  components: {
    LTable,
    Card,
    ChoosePopup,
    FormUpdate,
    ActionsBar,
    FormUserData,
    Pagination
},
  data () {
    return {
      users: [],
      skip: 1,
      total: 0,
      limit: 10,
      message: 'Deseja excluir o usuário',
      storeToken: localStorage.getItem('token'),
      buttonActionBarName: 'Adicionar novo usuário',
      userToUpdate: { name: '', email: '' },
      hiddenOptionsModal: false,
      callUpdateForm: false,
      hiddenFormUser: false,
      id: 0,
      update_id: null
    }
  },
  methods: {
    //list request - paginate
    async listUsers() {
      const url = `/users/paginate?limit=${this.limit}&skip=${this.skip}`

      await http.get(url).then(res => {
        this.users = res.data.result
        this.total = res.data.count
      })
    },

    //create request
    async handleSubmitNewUser(user) {
      await Service.create({ headers: { Authorization: `Bearer ${this.storeToken}`}}, user).then(res => {
        if (res.status === 201) {
          //this.renderPaginateUsers()
          this.listUsers()
        }
      })
      this.hiddenFormUser = false
    },

    //getuser
    async findUserByEmail(email) {
      await Service.findByEmail({ headers: { Authorization: `Bearer ${this.storeToken}`}}, email)
      .then(res => {
        return this.users = res.data
      })
    },

    //update request
    async updateUser(user) {
      const id = this.update_id
      const parseUser = JSON.parse(JSON.stringify(user))

      await Service.update({ headers: { Authorization: `Bearer ${this.storeToken}` }}, id, parseUser).then(res => {
        if (res.status === 200) {
          this.listUsers()  
        }
      })
      this.callUpdateForm = false
    },

    //delete request
    async deleteUser(id) {
      await Service.remove({ headers: { Authorization: `Bearer ${this.storeToken}` }}, id).then(res => {
        if (res.status === 200) {
          this.listUsers()
        }
      })
    },

    //change page function
    changePage(value) {
      this.skip = value
      this.listUsers()
    },

     //reload search
    reloadAllUsers(data) {
      this.listUsers()
      const dataSetInput = data.receiveData = ''

      return dataSetInput
    },
    
    //toggle functions
    openForm() {
      this.hiddenFormUser = !this.hiddenFormUser
    },

    showChooseModal(id) {
      this.hiddenOptionsModal = !this.hiddenOptionsModal
      this.id = id
    },

    hiddenChooseModal() {
      this.hiddenOptionsModal = false
    },
    
    editUser(id, user) {
      this.callUpdateForm = !this.callUpdateForm
      this.userToUpdate.name = user.name
      this.userToUpdate.email = user.email
      
      this.update_id = id
    },

    closeFormUser() {
      this.hiddenFormUser = false
    },

    closeUpdateModal() {
      this.closeUpdateModal = false
    },
  },

  mounted() {
    this.listUsers()
  },
}
</script>

<style>
.table-content {
  padding-left: 30px;
  height: 70vh;
  overflow: scroll;
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

.align-p {
  text-align: center;
}
</style>


