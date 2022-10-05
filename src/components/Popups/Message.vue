<template>
  <div class="box-container">
    <div class="icon-container">
      <font-awesome-icon :icon='`fa-solid ${icon_type}`' />
    </div>
    <span>{{ message_status }}</span>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    message_status: String,
    icon_type: String,
  },
}
</script>

<style scoped>
.box-container {
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 5px #12121268;
  background-image: linear-gradient(#fff, #edfbff);
  color: #000;
  position: absolute;
  right: 0%;
  bottom: -65px;
  animation: slide .3s ease-in-out;
}

@keyframes slide {
  0% {
    opacity: 0;
    visibility: hidden;
    right: -100%;
  }
  100% {
    opacity: 1;
    visibility: visible;
  }
}

.box-container span {
  font-weight: bold;
}

.icon-container {
  padding-right: 20px;
}

.fa-circle-check,
.fa-circle-exclamation,
.fa-triangle-exclamation {
  font-size: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  filter: drop-shadow(0 0 3px rgba(12, 12, 12, 0.104));
}

.fa-circle-exclamation {
  color: #ff0000;
}

.fa-triangle-exclamation {
  color: #ffa600;
}

.fa-circle-check {
  color: #12d800;
}
</style>