<template>
  <div class="content">
    <div class="content-fluid">
      <div class="row">
        <div class="col-12">
          <card
            class="strpied-tabled-with-hover"
            body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="">Lista de teatros</h4>	
              <p class="card-category">Encontre cinemas próximos</p>
            </template> 
            <template>
              <actions-bar
                :title="buttonActionBarName"
                @openFormData="openFormTheater"
                @searchData="searchTheater"
                @reloadList="reloadList"
              />
            </template>
            <div class="table-content">
              <form-theater
                v-if="hiddenFormTheater"
                @closeFormTheater="closeFormTheater"
                @createNewTheater="createTheater"
              />
              <form-update-theater 
                v-if="hiddenFormUpdate"
                :theaterData="theaterToUpdate"
                @closeFormTheater="closeModalUpdateTheater"
                @theaterUpdate="updateTheater"
              />
              <div id="theaters-table-header">
                <div class="id-container">Cod</div>
                <div class="spacins-location">Nome do Cinema</div>
                <div class="spacins-location">Endereco</div>
                <div class="spacins-location">Local</div>
                <div style="width: 10%;">Acoes</div>
              </div>
              <div id="theaters-table-rows">
                <div class="theaters-table-row" v-for="theater in theaters" :key="theater._id">
                  <div class="id-container">{{ theater.theaterId }}</div>
                  <div class="spacins-location">{{ theater.name }}</div>
                  <div class="spacins-location">{{ theater.location.address.street1 }}</div>
                  <div class="spacins-location">
                    <div>{{ theater.location.address.city }}</div>
                    <div>{{ theater.location.address.state }}</div>
                    <div>{{ theater.location.address.zipcode }}</div>
                  </div>
                  <div id="items-alignment"> 
                    <div @click="showChooseModal(theater._id)" id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-trash" />
                    </div>
                    <div @click="editTheater(theater._id, theater)" id="actions-op">
                      <font-awesome-icon icon="fa-solid fa-pen-to-square" />
                    </div>
                  </div> 
                  <choose-popup 
                    :message="message"
                    :data="theater.name"
                    v-if="hiddenTheaterModal && id === theater._id"
                    @removeResource="deleteTheater(theater._id)"
                    @closeModal="hiddenChoosePopup"
                  />
                </div>
              </div>
            </div>
            <div class="align-p pt-3">
              <pagination
                v-if="theaters.length"
                :skip="skip"
                :total="total"
                :limit="limit"
                @change-page="changePage"
              ></pagination>
            </div>
          </card> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ServiceTheaters from '../services/axios-theaters.request'
import Card from '../components/Cards/Card.vue'
import ActionsBar from '../components/ActionsBar.vue'
import ChoosePopup from '../components/Popups/ChoosePopup.vue'
import BaseInput from '../components/Inputs/BaseInput.vue'
import Pagination from '../components/Pagination.vue'
import FormTheater from '../components/FormTheater.vue'
import { http } from '../services/http'
import FormUpdateTheater from '../components/FormUpdateTheater.vue'

export default {
name: 'Maps',
components: { Card, ActionsBar, ChoosePopup, BaseInput, FormTheater, Pagination, FormUpdateTheater },
  data () {
    return {
      theaterToUpdate: {
        theaterId: null,
        location: {
          address: {
            street1: '',
            city: '',
            state: '',
            zipcode: '',
          },
          geo: {
            type: 'Point',
            coordinates: [],
          }
        },
        name: '',
      },
      theaters: [],
      skip: 1,
      total: 0, 
      limit: 20,
      hiddenFormTheater: false,
      hiddenFormUpdate: false, 
      storeJwt: localStorage.getItem('token'),
      buttonActionBarName: 'Adicionando nova sala de cinema',
      message: 'Desja realmente excluir a sala',
      hiddenTheaterModal: false,
      id: 0,
      update_id: 0,
    }
  },
  methods: {
    //list all cines
    async listAllTheaters() {
      const url = `/theaters/paginate?limit=${this.limit}&skip=${this.skip}`

      await http.get(url).then(res => {
        this.theaters = res.data.result
        this.total = res.data.count
      })
    },

    changePage(value) {
      console.log(value)
      this.skip = value
      this.listAllTheaters()
    },


    async createTheater(theater) {
      await ServiceTheaters.createTheater({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, theater)
        .then(res => {
          if (res.status === 201) {
            this.listAllTheaters()
          }
        })

        this.hiddenFormTheater = false
    },

    //findByCode
    async searchTheater(theaterId) {
      await ServiceTheaters.findTheater({ headers: { Authorization: `Bearer ${this.storeJwt}`}}, theaterId)
        .then(res => {
          return this.theaters = res.data
        })
    },

    //update theater
    async updateTheater(theater) {
      const id = this.update_id
      const parseTheater = JSON.parse(JSON.stringify(theater))
    
      await ServiceTheaters.updateTheater(id, parseTheater)
       .then(res => {
        if (res.status === 200) {
          this.listAllTheaters()
        }
       })
       this.hiddenFormUpdate = false
    },

    //delete cine
    async deleteTheater(id) {
      await ServiceTheaters.removeTheater({ headers: { Authorization: `Bearer ${this.storeJwt}`}}, id)
        .then(res => {
          if (res.status === 200) {
            this.listAllTheaters()
          }
        })
        this.hiddenTheaterModal = false
    },

    editTheater(id, theater) {
      this.hiddenFormUpdate = !this.hiddenFormUpdate
      this.theaterToUpdate.theaterId = theater.theaterId
      this.theaterToUpdate.name = theater.name
      this.theaterToUpdate.location.address.street1 = theater.location.address.street1
      this.theaterToUpdate.location.address.city = theater.location.address.city
      this.theaterToUpdate.location.address.state = theater.location.address.state
      this.theaterToUpdate.location.address.zipcode = theater.location.address.zipcode

      this.update_id = id
    },

    reloadList(data) {
      this.listAllTheaters()
      const dataSetInput = data.receiveData = ''

      return dataSetInput
    },

    showChooseModal(id) {
      console.log(id)
      this.hiddenTheaterModal = !this.hiddenTheaterModal
      this.id = id
    },

    openFormTheater() {
      this.hiddenFormTheater = !this.hiddenFormTheater
    },

    closeFormTheater() {
      this.hiddenFormTheater = false
    },

    closeModalUpdateTheater() {
      this.hiddenFormUpdate = false
    },

    hiddenChoosePopup() {
      this.hiddenTheaterModal = false
    },
  },

  mounted() {
    this.listAllTheaters()
  }
}
</script>
<style scoped>
.table-content {
  padding-left: 30px;
  height: 70vh;
  overflow: scroll;
}
#items-alignment {
  display: flex;
  width: 10%;
}
#actions-op {
  width: 50px;
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


#theaters-table-header, 
#theaters-table-rows,
.theaters-table-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}
#theaters-table-header {
  font-weight: normal;
  padding: 12px;
  color: rgb(146, 146, 146);
  border-bottom: 2px solid rgb(146, 146, 146);
}

#theaters-table-header .spacins-location, 
#theaters-table-rows .spacins-location {
  width: 28%;
}

.theaters-table-row .id-container,
#theaters-table-header .id-container {
  width: 5%;
}

.theaters-table-row {
  width: 100%;
  padding: 12px;
  border-bottom: 1px solid #ccc;
  font-size: 14px;
}
#map {
  min-height: calc(100vh - 123px);
}
</style>
