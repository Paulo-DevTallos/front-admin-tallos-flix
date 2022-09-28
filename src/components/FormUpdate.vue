<template>
  <div class="content card form-content">
    <div class="icon-update">
      <font-awesome-icon icon="fa-solid fa-file-pen" />
    </div>
    <form @submit.prevent="$emit('updateUser', user)" :userData="user"> 
      <label for="name">Nome</label>
      <base-input 
        id="name"
        type="text"
        v-model="user.name"
      />
      <label for="email">E-mail</label>
      <base-input 
        id="email"
        type="text"
        v-model="user.email"
      />
      <div class="btn-container">
        <button class="btn btn-primary" type="submit">Alterar Dados</button>
        <button class="btn btn-warnning" @click="$emit('closeUpdateModal')">Cancelar</button>
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
    userData: Object,
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
        console.log(userData)
        this.user.name = userData.name;
        this.user.email = userData.email;
      },
      deep: true
    }
  },

  mounted() {
    console.log()
  }
}
</script>

<style>
.form-content {
  width: 400px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.342);
  padding: 30px;
  animation: blow .5s ease-in-out;
}

@keyframes blow {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.0) translate(-50%, -50%);
  }
  70% {
    opacity: 1;
    visibility: visible;
    transform: scale(1.2) translate(-50%, -50%);
  }
  100% {
    transform: scale(1.1) translate(-50%, -50%);
  }
}

.icon-update {
  width: 100%;
  text-align: center;
  margin-bottom: 30px;
}

.icon-update svg {
  font-size: 50px;
  color: #009acc;
}

.btn-container button {
  margin: 3px;
}
</style>