<template>
  <div class="content card option-content">
    <div @click="$emit(closeModal)">
      <font-awesome-icon icon="fa-solid fa-xmark" />
    </div>
    Escolha uma ação para realizar
    <div class="container-btn">
      <button class="btn btn-primary btn-update" @click="$emit('updateMovie')">Atualizar</button>
      <button class="btn btn-danger btn-delete" @click="$emit('deleteMovie')">Excluir Filme</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionPopup',
  emits: ['updateMovie', 'deleteMovie', 'closeModal'],
}
</script>

<style scoped>
.option-content {
  width: 400px;
  background-color: #fff;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 1000;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.100);
  padding: 30px;
  cursor: auto;
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

.option-content svg {
  font-size: 30px;
  color: #003648;
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;
}

.container-btn {
  margin-top: 20px;
}

.container-btn button {
  margin: 3px;
  color: #fff; 
}

.btn-update {
  background-color: #009acc;
}

.btn-delete {
  background-color: red;
}

</style>