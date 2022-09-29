<template>
  <div class="content card option-content">
    Escolha uma ação para realizar
    <div>
      <button>Atualizar</button>
      <button>Excluir Filme</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OptionPopup',
}
</script>

<style scoped>
.option-content {
  position: fixed;
  top: 50%;
  left: 50%;
}
</style>