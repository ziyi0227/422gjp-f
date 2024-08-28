<template>
  <div id="app" :style="{'--color': defaultTheme}">
    <theme-picker @change="themeChange" v-show="false" />
    <router-view />
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'
export default {
  name: 'App',
  components: { ThemePicker },
  computed: {
    defaultTheme() {
      return this.$store.state.settings.theme
    }
  },
  mounted() {
    if (localStorage.getItem('theme')) {
      this.themeChange(localStorage.getItem('theme'))
    }
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val
      })
    }
  }
}
</script>

<style>
.app-main{
  padding: 10px;
}
</style>
