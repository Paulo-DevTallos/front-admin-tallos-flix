<template>
  <div class="content">
    <base-input   
      v-model="name"
      placeholder="Encontre um usuário"
    />
    <button>Pesquisa</button>
    <button>
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

</style>