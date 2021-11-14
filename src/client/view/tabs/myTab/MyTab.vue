<template>
  <div class="container">
    <img class="screenshot" :src="blobURL">
    <div class="helper" v-if="hasFailed">
      {{ $t('failed.message') }}
    </div>
    <div class="retry-button" v-if="hasFailed" @click="redirectToSearchPage">
      <i class="material-icons">refresh</i>
    </div>
    <div class="helper" v-if="!hasFailed">
      {{ $t('progress.message') }}
    </div>
    <ProgressBar v-if="!hasFailed" class="progress-bar" />
  </div>
</template>
<script>
export default {}
</script>
<style lang="scss" scoped>
</style>