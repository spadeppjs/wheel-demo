<template>
  <svg class="g-icon">
    <use :xlink:href="`#i-${name}`"></use>
  </svg>
</template>
<script>
  import "./svg"
  export default {
    name: 'GuLuIcon',
    props: ["name"]
  };
</script>
<style lang="scss" scoped>
.g-icon {
  height: 1em;
  width: 1em;
}
</style>
