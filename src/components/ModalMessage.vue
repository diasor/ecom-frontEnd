<template>
<div class="modal-container modal-fixed-footer" :class="showModal ? 'show' : ''">
  <div id="modal" class="modal">
    <div class="modal-content">
      <h2>{{ title }}</h2>
      <div class="divider"></div>
      <p v-if="!showPre"> {{ description }}</p>
      <div v-if="showPre" class="raw-data-container">
        <pre> {{ description }} </pre>
      </div>
    </div>
    <div class="modal-footer">
      <a @click.prevent="onCancelClick" class="btn cancel">{{ cancelBtnLabel }}</a>
      <a v-if="showConfirm" @click.prevent="onConfirmClick" class="btn">{{ confirmBtnLabel }}</a>
    </div>
  </div>
  <div class="lean-overlay" @click="onCancelClick"></div>
</div>
</template>

<script>
export default {
  name: 'ModalMessage',
  props: {
    title: {
      type: String,
      default: 'Modal',
    },
    description: {
      type: String,
      default: 'Modal description',
    },
    confirmBtnLabel: {
      type: String,
      default: 'OK',
    },
    cancelBtnLabel: {
      type: String,
      default: 'Cancel',
    },
    showModal: {
      type: Boolean,
      default: false,
    },
    showConfirm: {
      type: Boolean,
      default: true,
    },
    showPre: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onConfirmClick () {
      this.$emit('confirmClick');
    },
    onCancelClick () {
      this.$emit('cancelClick');
    },
  },
};
</script>
