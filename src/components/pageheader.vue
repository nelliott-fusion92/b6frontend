<script>

  export default {
    props: [
      'title',
    ],
    filters: {
      upper (s) {
        return s.charAt(0).toUpperCase() + s.slice(1)
      }
    },
  }

</script>

<template>

  <h2>{{ title | upper }}</h2>

</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
