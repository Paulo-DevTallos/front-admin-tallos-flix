<template>
  <div class="box-modal">
    <div>
      Escolha sua ação
    </div>
    <div>
      <button @click="$emit('delete_user')" class="btn btn-danger">Deletar usuario</button>
      <button class="btn btn-warning">Atualizar usuario</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoosePopup',
  emits: ['delete_user']
}  
</script>

<style scoped>
.box-modal {
  position: fixed;
  text-align: center;
  top: 0;
  left: 0;
  transform: translate(100%, 100%);
  background-color: #fff;
  border: 1px solid black;
  border-radius: 7px;
  padding: 60px;
}

.box-modal button:first-child {
  margin: 5px;
  background-color: red;
  color: #fff;
}
</style>