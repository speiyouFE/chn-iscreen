<template>
  <i :class="'sealui-icon-' + name" @click="handleClick"></i>
</template>

<script>
  export default {
    name: 'SealIcon',

    props: {
      name: String
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  };
</script>
