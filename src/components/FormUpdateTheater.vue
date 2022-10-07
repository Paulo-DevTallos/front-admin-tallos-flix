<template>
  <div class="card form-theater-content container-fluid">
    <div class="icon-theater">
      <font-awesome-icon icon="fa-solid fa-plus" />
      <font-awesome-icon icon="fa-solid fa-film" />
    </div>
    <form @submit.prevent="$emit('theaterUpdate', theater)" :theaterData="theater"> 
      <label for="id-theater">Id do cienema</label>
      <base-input 
        id="id-theater"
        type="number"
        v-model="theater.theaterId"
        placeholder="Id do cinema"
      />
      <label for="name-cine">Nome do cinema</label>
      <base-input 
        id="name-cine"
        type="text"
        v-model="theater.name"
        placeholder="Nome do cinema"
      />
      <label for="address-cine">Endereço do Cinema</label>
      <base-input 
        id="address-cine"
        type="text"
        v-model="theater.location.address.street1"
        placeholder="Rua das Angelicas, 500"
      />
      <label for="zipcode">CEP</label>
      <base-input 
        id="zipcode"
        type="text"
        v-model="theater.location.address.zipcode"
        placeholder="00000-000"
      />
      <div class="state">
        <div id="city-cine">
          <label for="city">Cidade</label>
          <base-input 
            id="city"
            type="text"
            v-model="theater.location.address.city"
            placeholder="Cidade do Cinema"
          />
        </div>
        <div>
          <label for="state">Estado</label>
          <base-input 
            id="state"
            type="text"
            v-model="theater.location.address.state"
            placeholder="UF"
          />
        </div>
      </div>
      <div class="state">
        <div>
          <div id="array-event">
            <div>
              <label for="lat">Latitude e Longitude</label>
              <input id="array-input" type="number" v-model="theater.location.geo.coordinates.value">
              <font-awesome-icon @click="takeArrayCoordinators" :title="message_arr" icon="fa-solid fa-plus" />
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-style btn-primary" type="submit">Cadastrar Cinema</button>
      <button class="btn btn-warnnig" @click="$emit('closeFormTheater')">Cancelar</button>
    </form>
  </div>
</template>
 
<script>
import BaseInput from './Inputs/BaseInput.vue'

export default {
  name: 'FormUpdateTheater',
  components: { BaseInput },
  emits: ['theaterUpdate', 'closeFormTheater'],
  props: {
    theaterData: Object,
  },
  data() {
    return {
      theater: {
        theaterId: this.theaterData.theaterId,
        location: {
          address: {
            street1: this.theaterData.location.address.street1,
            city: this.theaterData.location.address.city,
            state: this.theaterData.location.address.state,
            zipcode: this.theaterData.location.address.zipcode,
          },
          geo: {
            type: 'Point',
            coordinates: [],
          }
        },
        name: this.theaterData.name,
      },
      message_arr: 'Clique aqui para alterar as coordenadas da lista',
    }
  },

  watch: {
    theaterData: {
      handler(theaterData) {
        console.log(theaterData)
        this.theater.theaterId = theaterData.theaterId
        this.theater.name = theaterData.name
        this.theater.location.address.street1 = theaterData.location.address.street1
        this.theater.location.address.city = theaterData.location.address.city
        this.theater.location.address.state = theaterData.location.address.state
        this.theater.location.address.zipcode = theaterData.location.address.zipcode
      },
      deep: true
    }
  },

  methods: {
    takeArrayCoordinators() {
      const coordinatesInput = Number(this.theater.location.geo.coordinates.value)
      let arrayCoordinates = this.theater.location.geo.coordinates

      console.log(arrayCoordinates.push(coordinatesInput))
      this.theater.location.geo.coordinates.value = ''
    },   
  },
}  
</script>
 
<style scoped>
.form-theater-content {
  width: 600px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.100);
  padding: 30px;
  z-index: 1004;
}

.icon-theater {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.icon-theater svg {
  font-size: 50px;
  color: #009acc;
}

.form-theater-content .state {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.state #city-cine {
  width: 100%;
  padding-right: 20px;
}

#array-input {
  font-size: 1rem;
  padding: 10px;
  height: 40px;
  border-radius: 5px;
  border: 1px solid #E3E3E3;  
}

#array-event {
  display: flex;
  justify-content: space-between;
}

#array-event svg {
  padding: 10px;
  margin: 0 3px;
  background-color: #808080;
  color: #fff;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-style {
  background-color: #0044aa;
  color: #fff;
}

button {
  margin-right: 5px;
}
</style>