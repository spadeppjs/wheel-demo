<template>
  <div class="wrapper" :class="{error}">
      <!-- 这里绑定class的是一个数组的形式，class是可以是一个数组的 -->
    <input v-bind:value="value" :disabled="disabled" :readonly="readonly" type="text"
        @change="$emit('change',$event.target.value)"
        @input="$emit('input',$event.target.value)"
        @focus="$emit('focus',$event.target.value)"
        @blur="$emit('blur',$event.target.value)"
    >
    <template v-if="error">
        <!-- 因为icon和span都需要判定是否有error，所以在其中加入template -->
        <icon name="error" class="icon-error"></icon>
        <span class="error-message">{{error}}</span>
    </template>
  </div>
</template>
<script>
import Icon from "./icon"
export default {
  components: { Icon },
  name: "GuLuInput",
  props: {
    value: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    error: {
      type: String
    },
  }
};
</script>
<style lang="scss" scoped>
$height: 32px;
$border-color: #999;
$border-color-hover: #666;
$border-radius: 4px;
$font-size: 12px;
$box-shadow-color: rgba(0, 0, 0, 0.5);
$red: #f1453d;
.wrapper {
  font-size: $font-size;
  display: inline-flex;
  align-items: center;
  > :not(:last-child){margin-right: .5em}
//   选择不是最后一个子元素的所有元素
  > input {
    height: $height;
    border: 1px solid $border-color;
    border-radius: 4px;
    padding: 0 8px;
    font-size: inherit;
    &:hover {
      border-color: $border-color-hover;
    }
    &:focus {
      box-shadow: inset 0 1px 3px $box-shadow-color;
      outline: none;
    }
    &[disabled],
    &[readonly] {
      border-color: #bbb;
      color: #bbb;
      cursor: not-allowed;
    }
  }
  &.error {
    > input {
      border-color: $red;
    }
  }
  .icon-error{
      fill: $red;
  }
  .error-message{
      color: $red;
  }
}
</style>
