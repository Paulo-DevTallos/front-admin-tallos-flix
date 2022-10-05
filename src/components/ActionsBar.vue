<template>
  <div class="content">
    <form @submit.prevent="$emit('searchData', data.receiveData)" class="form-align">
      <base-input   
        v-model="data.receiveData"
        class="input-lg"
        placeholder="Realize sua pesquisa"
      />
      <div @click="$emit('reloadList', data)" v-if="reloadList" class="btn reload-list">
        <font-awesome-icon icon="fa-solid fa-rotate-right" />
      </div>
      <button type="submit" class="btn btn-style btn-primary">Pesquisa</button>
    </form>
    <button @click="$emit('openFormData')" class="btn btn-style btn-primary">
      {{ title }}
      <font-awesome-icon icon="fa-solid fa-plus" />
    </button>
  </div>
</template>

<script>
import BaseInput from './Inputs/BaseInput.vue'
export default {
  components: { BaseInput },
  name: 'ActionsBar',
  emits: ['searchData', 'reloadList', 'openFormData'],
  props: {
    title: String,
  },
  data() {
    return {
      data: {
        receiveData: '',
      }
    }
  },

  computed: {
    reloadList() {
      if (this.data.receiveData !== '') return true
      else return false
    }
  }
}  
</script>

<style scoped>
.content {
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

.input-lg {
  width: 400px;
}

.form-align {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reload-list {
  margin-right: 25px;
  background-color: #808080;
  padding: 6px;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0 0 3px #80808068;
  animation: roar .4s ease-in-out;
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
.reload-list svg {
  font-size: 25px;
  color: #fff;
}

.btn-style {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  background-color: #0044aa;
}

.btn-style, .btn-style svg {
  color: #fff;
}

.btn-style svg {
  margin-left: 10px;
  font-weight: bold;
}
</style>