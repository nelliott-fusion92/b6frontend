<script>

  import bannerdetailitem from '../components/bannerdetailitem.vue'
  import pageheader from '../components/pageheader.vue'

  export default {
    props: [
      'id',
    ],
    async created () {
      await this.$store.dispatch('GENERATE_TEST_ARRAY')
      //await this.$store.dispatch('TEST_BANNER_UPDATE')
      //await this.$store.dispatch('CREATE_ORDER')
      await this.$store.dispatch('GET_PRESET', this.id)
    },
    methods: {
      createBannerFromPreset: function() {
        this.$store.dispatch('SAVE_PRESET_AS_NEW_BANNER').then(() => {
          this.$router.push({ name: 'banners' })
        })
      }
    },
    components: {
      bannerdetailitem,
      pageheader
    },
    computed: {
      preset: function() {
        return this.$store.state.currentPreset
      }
    }
  }

</script>

<template>
  <div>
    <pageheader v-bind:title="$route.name" />
    <div v-if="loadStatus">
      <bannerdetailitem v-if="preset" v-bind:banner="preset" />
      <div @click="createBannerFromPreset" class="greenbtn">Create banner from preset</div>
    </div>

  </div>


</template>

<style lang="scss" scoped>

  @import '../../assets/theme.scss';

</style>
