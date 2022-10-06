<template>
  <div class="pagination">
    <button
      v-for="(page, index) in pages" 
      :key="page"
      class="item"
      :class="{ current: page === current }"
      @click="onChangePage(index)"
    >
      {{ page }}
    </button>
  </div>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    offSet: {
      type: [String, Number],
      default: 0,
    },
    total: {
      type: [String, Number],
      required: true,
    },
    limit: {
      type: [String, Number],
      default: 10,
    }
  },

  computed: {
    current() {
      return this.offSet ? this.offSet + 1 : 1
    },

    pages() {
      const quantity = Math.ceil(this.total / this.limit)

      if (quantity <= 1) return [1]

      return Array.from(Array(quantity).keys(), (i) => i + 1)
    }
  },

  methods: {
    onChangePage(offSet) {
      this.$emit('chance-page', offSet)
    }
  }
}
</script>