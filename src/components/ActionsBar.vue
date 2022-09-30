<template>
  <div class="content">
    <base-input   
      v-model="name"
      class="input-lg"
      placeholder="Encontre um usuário"
    />
    <button class="btn btn-style btn-primary">Pesquisa</button>
    <button class="btn btn-style btn-primary">
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
  data() {
    return {
      name: ''
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