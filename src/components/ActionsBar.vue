<template>
  <div class="content">
    <form @submit.prevent="$emit('searchUser', user.email)" class="form-align">
      <base-input   
        v-model="user.email"
        class="input-lg"
        placeholder="Encontre um usuário por e-mail"
      />
      <button type="submit" class="btn btn-style btn-primary">Pesquisa</button>
    </form>
    <button @click="$emit('openFormUserData')" class="btn btn-style btn-primary">
      Adicionar novo usuário
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script>
import BaseInput from './Inputs/BaseInput.vue'
export default {
  components: { BaseInput },
  name: 'ActionsBar',
  emits: ['searchUser','openFormUserData'],
  data() {
    return {
      user: {
        email: '',
      }
    }
  }
}  
</script>

<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.input-lg {
  width: 400px;
}

.form-align {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn-style {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  background-color: #0044aa;
}

.btn-style, .btn-style svg {
  color: #fff;
}

.btn-style svg {
  margin-left: 10px;
  font-weight: bold;
}
</style>