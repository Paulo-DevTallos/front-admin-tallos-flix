<template>
  <div class="content card form-content">
    <div>
      <font-awesome-icon icon="fa-solid fa-file-pen" />
    </div>
    <form> 
      <base-input />
      <base-input />
      <button>Alterar Dados</button>
    </form>
  </div>
</template>

<script>
import BaseInput from './Inputs/BaseInput.vue';
export default {
    name: "FormUpdate",
    components: { BaseInput }
}
</script>

<style>
.form-content {
  position: fixed;
  top: 0;
  left: 400px;
}
</style>