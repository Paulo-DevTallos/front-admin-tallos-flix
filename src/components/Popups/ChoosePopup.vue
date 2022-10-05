<template>
  <div class="card-modal">
    {{ message }}  {{ data }}?
    <div class="btn-size-container">
      <button @click="$emit('removeResource')">Excluir</button>
      <button @click="$emit('closeModal')">Cancelar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChoosePopup',
  props: {
    data: String,
    message: String,
  },
  emits: ['removeResource', 'closeModal']
}
</script>

<style scoped>
.card-modal {
  position: fixed;
  width: 400px;
  top: 50%;  
  left: 50%;
  padding: 20px;
  border-radius: 10px;
  background-color: #fbfeff;
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.342);
  text-align: center;
  transform: translate(-50%, -50%);
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