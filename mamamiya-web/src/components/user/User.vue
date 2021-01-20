<template>
  <div id="tab">
      User
  </div>
</template>

<script>
  export default {
    data () {
      return {
        curId: 0,
        items: [
          {item: 'HTML'},
          {item: 'CSS'},
          {item: 'JavaScript'},
          {item: 'Vue'},
        ],
        contents: [
          {content: 'HTML'},
          {content: 'CSS'},
          {content: 'JavaScript'},
          {content: 'Vue'},
        ]
      }
    },

    methods: {
      tab (index) {
        this.curId = index;
      }
    }
  }
</script>

<style scoped>

</style>

