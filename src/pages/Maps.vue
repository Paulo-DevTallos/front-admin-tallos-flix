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
              />
            </template>
            <div class="table-content">
              <form-theater
                v-if="hiddenFormTheater"
                @closeFormTheater="closeFormTheater"
                @createNewTheater="createTheater"
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
                    <div @click="editUser(theater._id, theater)" id="actions-op">
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

export default {
name: 'Maps',
components: { Card, ActionsBar, ChoosePopup, BaseInput, FormTheater, Pagination },
  data () {
    return {
      theaters: [],
      skip: 1,
      total: 0, 
      limit: 20,
      hiddenFormTheater: false,
      storeJwt: localStorage.getItem('token'),
      buttonActionBarName: 'Adicionando nova sala de cinema',
      message: 'Desja realmente excluir a sala',
      hiddenTheaterModal: false,
      id: 0,
      center: {
        lat: 40.748817,
        lng: -73.985428
      },
      options: {
        styles: [{
          'featureType': 'water',
          'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.fill',
          'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
        }, {
          'featureType': 'road',
          'elementType': 'geometry.stroke',
          'stylers': [{'color': '#808080'}, {'lightness': 54}]
        }, {
          'featureType': 'landscape.man_made',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#ece2d9'}]
        }, {
          'featureType': 'poi.park',
          'elementType': 'geometry.fill',
          'stylers': [{'color': '#ccdca1'}]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.fill',
          'stylers': [{'color': '#767676'}]
        }, {
          'featureType': 'road',
          'elementType': 'labels.text.stroke',
          'stylers': [{'color': '#ffffff'}]
        }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
          'featureType': 'landscape.natural',
          'elementType': 'geometry.fill',
          'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
        }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
          'featureType': 'poi.sports_complex',
          'stylers': [{'visibility': 'on'}]
        }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
          'featureType': 'poi.business',
          'stylers': [{'visibility': 'simplified'}]
        }]
      }
    }
  },
  methods: {
    //list all cines
    listAllTheaters() {
      const url = `/theaters/paginate?limit=${this.limit}&skip=${this.skip}`

      http.get(url).then(res => {
        this.theaters = res.data.result
        this.total = res.data.count
      })
    },

    changePage(value) {
      console.log(value)
      this.skip = value
      this.listAllTheaters()
    },


    createTheater(theater) {
      ServiceTheaters.createTheater({ headers: { Authorization: `Bearer ${this.storeJwt}` }}, theater)
        .then(res => {
          if (res.status === 201) {
            this.listAllTheaters()
          }
        })

        this.hiddenFormTheater = false
    },

    //delete cine
    deleteTheater(id) {
      ServiceTheaters.removeTheater({ headers: { Authorization: `Bearer ${this.storeJwt}`}}, id)
        .then(res => {
          if (res.status === 200) {
            this.listAllTheaters()
          }
        })
        this.hiddenTheaterModal = false
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
