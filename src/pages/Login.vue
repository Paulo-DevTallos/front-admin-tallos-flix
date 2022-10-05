<template slot="body">
  <div class="content bg-login container-fluid">
    <div class="size-box size-info">
      <div>
        <img src="/img/tallos-flix-oficial-removebg-preview.png" alt="logo TallosFlix">
      </div>
      <div class="title-intro">
        <h1>Bem-vindo(a) ao TallosFlix</h1>
        <p>Aproveite o melhor de filmes e series exclusivos na plataforma TallosFlix. Tenha o melhor de críticas e comentários do cinema mundial nas suas mãos!</p>
      </div>
      <div>
        <button 
          class="btn-login"
          @click="toggleAdmin"
          v-if="showFormLogin"  
        >Faça Login</button>
      </div>
    </div>
    <div  class="size-box form-content-area">   
      <div class="form-user" v-if="hiddenAdmin">
        <form @submit.prevent="handleSubmitLogin">
          <div>
            <h2>Área do Administrador</h2>
          </div>
          <label for="email">E-mail</label>
          <!--<input type="text" id="email" placeholder="meuemail@example.com">-->
          <base-input 
            id="email"
            type="text"
            placeholder="meuemail@example.com"
            v-model="user.email"
            :addonLeftIcon="'nc-icon nc-email-83'"
          />
          <label for="password">Senha</label>
          <!--<input type="text" id="password" placeholder="digite sua senha">-->
          <base-input 
            id="password"
            type="password"
            placeholder="senha"
            v-model="user.password"
            :addonLeftIcon="'nc-icon nc-lock-circle-open'"
          />
          <button type="submit" class="btn-acess">Entrar</button>
        </form>
        <message 
          v-if="hiddenMessageToast"
          :icon_type="icons"
          :message_status="message"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseInput from '../components/Inputs/BaseInput.vue'
import Message from '../components/Popups/Message.vue';
export default {
  name: "Login",
  components: { BaseInput, Message },
  data() {
    return {
      message: '',
      icons: '',
      hiddenMessageToast: false,
      displayNone: false,
      showFormLogin: true,
      hiddenAdmin: false,
      hiddenUser: false,
      user: {
        email: '',
        password: '',
      }
    };
  },
  methods: {
    popupMessage(msg, icon) {
      this.hiddenMessageToast = true
      this.message = msg
      this.icons = icon
      setTimeout(() => {
        this.hiddenMessageToast = false
      }, 4000)
    },

    //login method
    handleSubmitLogin() {
      if (this.user.email === '' && this.user.password === '') {
        this.popupMessage('Digite seus dados corretamente!', 'fa-circle-exclamation')
      }
      else if (this.user.email === '') {
        this.popupMessage('Digite um e-mail válido!', 'fa-circle-exclamation') 
      }
      else if (this.user.password === '') {
        this.popupMessage('Digite uma senha válida!', 'fa-circle-exclamation')
      }
      else {
        try {
          this.$store.dispatch('handleSubmitLogin', this.user)
        }
        catch(Error) {
          console.error(Error, 'Dados Incorretos')
          this.popupMessage('Seus dados estão incorretos!', 'fa-triangle-exclamation')
        }
      }
    },

    toggleAdmin() {
      if (this.hiddenUser === true) this.hiddenUser = false;
      this.hiddenAdmin = !this.hiddenAdmin;
    },
  },
}  
</script>

<style scoped>
.bg-login {
  background-image: url(/img/bg-movie.png);
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  height: 100vh;
  display: flex;
  padding: 50px;
}

.bg-login img {
  filter: drop-shadow(0 0 1px #fff);
  width: 300px;
}

.bg-login .btn-login {
  padding: 14px 100px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: bold;
  background-color: rgb(255, 234, 0);
  transition: .4s;
}

.bg-login .btn-login:hover {
  background-color: rgb(247, 189, 0);
}

.size-box {
  width: 50%;
}

.size-box h1 {
  font-size: 40px;
  margin: 30px 0;
}

.size-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.login-area {
  display: flex;
  background-color: #009acc;
  border-radius: 10px;
  cursor: pointer;
  animation: roar .4s ease-in;
}

@keyframes roar {
  0% {
    opacity: 0;
    visibility: hidden;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}

.title-intro {
  margin-bottom: 30px;
}

.login-area .login {
  padding: 50px 30px;
  transition: .5s ease;
}

.login-area .login:hover {
  background-color: #00789f;
  border-radius: 10px;
}

.form-content-area {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-user {
  background-color: #c9d2ff;
  color: #121212;
  padding: 50px 60px;
  border-radius: 15px;
  width: 400px;
  position: fixed;
  animation: slide .7s ease-in-out;
}

.form-user h2 {
  text-align: center;
  font-size: 25px;
  margin: 0 0 20px;
}

@keyframes slide {
  0% {
    opacity: 0;
    visibility: hidden;
    transform: scale(0.0);
    position: fixed;
    top: 50%;
    right: -100%;
    transform: translate(-50%, -50%);
  }
  100% {
    opacity: 1;
    visibility: visible;
    position: fixed;
    top: 50%;
    right: 0;
    transform: translate(-50%, -50%);
  }
}

.form-user form {
  width: 100%;
}

.form-user label {
  color: #121212;
  font-size: 14px;
  font-weight: bold;
  margin: 0;
}

.form-user input, .form-user button {
  width: 100%;
  margin-bottom: 10px;
  padding: 3px 12px;
  border-radius: 5px;
  border: 1px solid;
}

.form-user .btn-acess {
  margin-top: 15px;
  padding: 10px;
  border: none;
  color: #fff;
  box-shadow: -3px 4px 2px #aebaf9;
  background: #009acc;
  transition: .4s ease-in-out;
}

.form-user .btn-acess:hover {
  background-color: #00789f;
}
</style>