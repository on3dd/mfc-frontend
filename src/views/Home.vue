<template>
  <div class="home">
    <ScreenHome/>
    <img class="mfc-logo" src="../assets/images/mfc-logo.svg" alt="Лого МФЦ">
  </div>
</template>

<script>
  // @ is an alias to /src
  import ScreenHome from '@/components/ScreenHome.vue';

  export default {
    name: 'Home',
    components: {
      ScreenHome,
    }
  }
</script>

<style scoped lang="scss">
  .home {
    display: flex;
    flex-direction: column;
    align-items: center;

    .mfc-logo {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }
  }
</style>
