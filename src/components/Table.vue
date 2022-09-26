<template>
  <div>
    <table class="table">
      <thead>
        <slot name="columns">
          <tr>
            <th v-for="column in columns" :key="column">{{column}}</th>
          </tr>
        </slot>
      </thead>
      <tbody>
        <tr v-for="(item, index) in data" :key="index">
          <slot row="item">
            <td 
              v-for="column in columns"
              :key="column"
              v-if="hasValue(item, column)"
            >
              {{itemValue(item, column)}}
            </td>
            <td id="size-/check">
              <i 
                class="nc-icon nc-bullet-list-67"
                @click="handleEventModal"
              ></i>
            </td>
          </slot>
          <choose-popup 
            v-if="hidden_modal"
          />
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import Service from '../services/axios-requests'
import ChoosePopup from './Popups/ChoosePopup.vue'

export default {
  name: 'l-table',
  components: { ChoosePopup },
  props: {
    columns: Array,
    data: Array,
  },
  data() {
    return {
      hidden_modal: false,
    }
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    },

    handleEventModal() {
      this.hidden_modal = !this.hidden_modal
    }
  },
  mounted() {
  }
}
</script>
<style>
#size-check {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.input-marker {
  height: 25px;
  width: 15px;
}

.table i {
  padding: 10px;
  font-weight: bold;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.463);
  cursor: pointer;
  transition: .4s ease;
}

.table i:hover {
  border: 1px solid #3cc8f6;
  background-color: #66d9ff;
  color: #fff;

}
</style>
