<template>
  <div class="card-modal">
    Tem certeza que deseja excluir o usuário {{ data }}?
    <div class="btn-size-container">
      <button @click="$emit('removeUser')">Excluir</button>
      <button @click="$emit('closeModal')">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChooseModal',
  props: {
    data: Array
  },
  emits: ['removeUser', 'closeModal']
}
</script>

<style scoped>
.card-modal {
  position: fixed;
  top: 50%;  
  left: 50%;
  padding: 20px;
  border-radius: 10px;
  background-color: rgb(255, 245, 236);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.342);
  text-align: center;
  transform: translate(-50%, -50%);
}
.card-modal .btn-size-container {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
}
.card-modal .btn-size-container button {
  margin: 3px;
  padding: 10px 20px;
  border-radius: 5px;
  color: #fff;
}
.card-modal .btn-size-container button:first-child {
  background-color: red;
  border: none;
}
.card-modal .btn-size-container button:last-child {
  background-color: orange;
   border: none;
}
</style>