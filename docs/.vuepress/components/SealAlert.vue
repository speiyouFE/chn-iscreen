<template>
  <transition name="sealui-alert-fade">
    <div class="sealui-alert" :class="[ typeClass ]" v-show="visible">
      <i class="sealui-alert__icon" :class="[ iconClass, isBigIcon ]" v-if="showIcon"></i>
      <div class="sealui-alert__content">
        <span class="sealui-alert__title" :class="[ isBoldTitle ]" v-if="title">{{ title }}</span>
        <slot>
          <p class="sealui-alert__description" v-if="description">{{ description }}</p>
        </slot>
        <i class="sealui-alert__closebtn" :class="{ 'is-customed': closeText !== '', 'sealui-icon-close': closeText === '' }" v-show="closable" @click="close()">{{closeText}}</i>
      </div>
    </div>
  </transition>
</template>

<script>
  const TYPE_CLASSES_MAP = {
    'success': 'sealui-icon-circle-check',
    'warning': 'sealui-icon-warning',
    'error': 'sealui-icon-circle-cross',
    'danger': 'sealui-icon-circle-cross'
  };
  export default {
    name: 'seal-alert',

    props: {
      title: {
        type: String,
        default: '',
        required: true
      },
      description: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'info'
      },
      closable: {
        type: Boolean,
        default: true
      },
      closeText: {
        type: String,
        default: ''
      },
      showIcon: {
        type: Boolean,
        default: false
      }
    },

    data() {
      return {
        visible: true
      };
    },

    methods: {
      close() {
        this.visible = false;
        this.$emit('close');
      }
    },

    computed: {
      typeClass() {
        return `is-${ this.type }`;
      },

      iconClass() {
        return TYPE_CLASSES_MAP[this.type] || 'sealui-icon-information';
      },

      isBigIcon() {
        return this.description ? 'is-big' : '';
      },

      isBoldTitle() {
        return this.description ? 'is-bold' : '';
      }
    }
  };
</script>
