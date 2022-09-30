<template>
  <div class="content card form-user-data">
    <div class="close-icon" @click="$emit('closeFormUser')">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>
    <div class="icon-add-user"> 
      <font-awesome-icon icon="fa-solid fa-user-plus" />
    </div>
    <form @sumbit.prevent="$emit('submitNewUser', user)">
      <label for="name">Nome</label>
      <base-input 
        id="name"
        type="text"
        placeholder="Digite um nome de usuário"
      />
      <label for="email">E-mail</label>
      <base-input 
        id="email"
        type="text"
        placeholder="Digite um e-mail válido"
      />
      <label for="password">Senha</label>
      <base-input 
        id="password"
        type="password"
        placeholder="Digite sua senha"
      />
      <button type="submit" class="btn btn-style btn-primary">Cadastrar</button>
    </form>
  </div>
</template>

<script>
import BaseInput from './Inputs/BaseInput.vue'
export default {
  components: { BaseInput },
  name: 'FormUserData',
  emits: ['closeFormUser', 'submitNewUser'],
  data() {
    return {
      user: {
        name: '',
        email: '',
        passwrod: '',
      }
    }
  }
}  
</script>

<style scoped>
.form-user-data {
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

.close-icon {
  position: absolute;
  top: 15px;
  right: 25px;
}

.close-icon svg {
  font-size: 25px;
  color: #002966;
  cursor: pointer;
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

.icon-add-user {
  width: 100%;
  text-align: center;
  margin: 30px 0;
}

.icon-add-user svg {
  font-size: 50px;
  color: #009acc;
}

.btn-style {
  background-color: #0044aa;
  color: #fff;
}
</style>