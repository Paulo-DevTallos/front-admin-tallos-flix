<template>
  <div>
    <!--<div class="actions-btn">
      <button type="button" class="btn btn-danger" @click="teste(item)">Deletar usuário</button>
    </div>-->
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
        <slot :row="item">
          <td v-for="column in columns" :key="column" v-if="hasValue(item, column)">{{itemValue(item, column)}}</td>
          <td id="size-check">
            <input type="checkbox" class="input-marker" @click="teste(item)" />
          </td>
        </slot>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
export default {
  name: 'l-table',
  props: {
    columns: Array,
    data: Array,
  },
  data() {
    return {
      hidden_modal: false
    }
  },
  methods: {
    hasValue (item, column) {
      return item[column.toLowerCase()] !== 'undefined'
    },
    itemValue (item, column) {
      return item[column.toLowerCase()]
    },

    teste(item) {
      console.log(item._id)
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
</style>
