<template>
  <Sprite>
    <TextField
      textColor="#00FFFF"
      x="11"
      y="12"
      touchEnabled
      @touchTap="onLabelClick"
      >{{ text }}</TextField
    >
  </Sprite>
</template>

<script>
export default {
  data() {
    return {
      text: "fesfff",
    };
  },
  methods: {
    onLabelClick() {
      egret.log('click', this.text);
    },
  },
};
</script>