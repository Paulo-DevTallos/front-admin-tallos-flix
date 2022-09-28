<template>
  <div class="content card form-content">
    <div>
      <font-awesome-icon icon="fa-solid fa-file-pen" />
    </div>
    <form @submit.prevent="$emit('updateUser', user)" :userData="user"> 
      <base-input 
        type="text"
        v-model="user.name"
      />
      <base-input 
        type="text"
        v-model="user.email"
      />
      <div>
        <button type="submit">Alterar Dados</button>
        <button @click="$emit('closeUpdateModal')">Cancelar</button>
      </div>
    </form>
  </div>
</template>

<script>
import BaseInput from './Inputs/BaseInput.vue';
export default {
  name: "FormUpdate",
  components: { BaseInput },
  emits: ['updateUser', 'closeUpdateModal'],
  props: {
    userData: Object
  },
  data() {
    return {
      user: {
        name: this.userData.name,
        email: this.userData.email,
      }
    }
  },

  watch: {
    userData: {
      handler(userData) {
        this.user.name = userData.name;
        this.user.email = userData.email;
      },
      deep: true
    }
  }
}
</script>

<style>
.form-content {
  position: fixed;
  top: 0;
  left: 400px;
}
</style>