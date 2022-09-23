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

<style>
.box-modal {
  position: absolute;
  text-align: center;
  top: 0;
  background-color: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.264);
  border-radius: 7px;
  padding: 60px;
}

.box-modal button {
  margin: 5px;
}
</style>