<template>
  <div class="contact-us full-screen main-container">
    <div class="content align-content">
      <div class="image-container">
        <img src="/img/not-found-page.png" alt="imagem de pagina nao encontrada">
      </div>
      <div class="description">
        <p>Desculpa, não encontramos o que você procura! <span>Sugerimos que retorne para a sessão de login da plataforma.</span></p>
        <router-link class="btn btn-primary spacing" to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage'
}
</script>

<style scoped>
.main-container, .align-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  height: 100vh;
}

.align-content {
  flex-direction: column;
}

.image-container {
  width: 100%;
  margin-bottom: 30px;
}

.image-container img {
  width: 450px;
}

.image-container, .description {
  text-align: center;
}

.description span {
  display: block;
}

.description .spacing {
  margin: 30px 0;
}
</style>