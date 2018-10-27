<template>
  <div class="navigation-bar bg-red px-4 flex justify-center items-center text-white text-center relative">
    <div class="left-buttons text-sm leading-none cursor-pointer">
      <slot name="left-buttons"></slot>
    </div>
    <h3 class="font-medium text-base leading-none"><slot name="title"></slot></h3>
    <div class="right-buttons text-sm leading-none cursor-pointer">
      <slot name="right-buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NavigationBar'
}
</script>

<style lang="scss">
.navigation-bar {
  height: 44px;
  height: calc(44px + constant(safe-area-inset-top));
  height: calc(44px + env(safe-area-inset-top));

  padding-top: constant(safe-area-inset-top);
  padding-top: env(safe-area-inset-top);

  z-index: 99;
  .left-buttons {
    position: absolute;
    top: 15px;
    top: calc(15px + constant(safe-area-inset-top));
    top: calc(15px + env(safe-area-inset-top));

    left: 20px;
  }
  .right-buttons {
    position: absolute;
    top: 15px;
    top: calc(15px + constant(safe-area-inset-top));
    top: calc(15px + env(safe-area-inset-top));

    right: 20px;
  }
}
</style>
