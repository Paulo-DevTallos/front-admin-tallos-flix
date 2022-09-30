<template>
  <div class="content card form-user-data">
    <div class="icon-add-user"> 
      <font-awesome-icon icon="fa-solid fa-user-plus" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'FormUserData'
}  
</script>

<style scoped>
.form-user-data {
  width: 400px;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -2px 2px 5px rgba(0, 0, 0, 0.342);
  padding: 30px;
  animation: blow 5s ease-in-out;
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

.icon-add-user {
  width: 100%;
  text-align: center;
  margin: 30px 0;
}

.icon-add-user svg {
  font-size: 50px;
  color: #009acc;
}
</style>