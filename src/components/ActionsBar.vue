<template>
  <div class="content">
    <base-input   
      v-model="name"
      placeholder="Encontre um usuário"
    />
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