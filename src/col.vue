<template>
  <div class="col" :class="colClass" :style="colStyle">
    <slot></slot>
  </div>
</template>
<script>
  let validator = (value)=>{
    let valid = true;
    let keys = Object.keys(value);
    keys.forEach(key => {
      if (!["offset", "span"].includes(key)) {
        valid = false;
      }
    });
    return valid;
  }
  // 输入的phon数组对象的时候，当其key不是offset或者span的时候就会返回false
  // 也就没有办法进行下面的操作，以上内容是一个算法，这个算法进行了两次循环，
  // 第一个循环是将得到的数组对象所有的key取出，
  // 第二个循环是判断所有的key中是否包含了指定的内容,如果不是指定的内容,
  // 那么就返回一个错误
export default {
  name: "GuluCol",
  props: {
      span: {
        type: [Number, String]
      },
      offset: {
        type: [Number, String]
      },
      ipad: {
        type: Object,
        validator,
      },
      narrowPc: {
        type: Object,
        validator,
      },
      pc: {
        type: Object,
        validator,
      },
      widePc: {
        type: Object,
        validator,
      },
    },
    data() {
      return {
        gutter: 0
      };
    },
    methods: {
      creatClasses (obj,str='') {
          if(!obj){return []}
          let array = []
          if(obj.span){
            array.push(`col-${str}${obj.span}`)
          }
          if(obj.offset){
            array.push(`offset-${str}${obj.offset}`)
          }
          return array
        }
    },
    computed: {
      colClass() {
        let { span, offset, ipad, narrowPc, pc, widePc} = this;
        let creatClasses = this.creatClasses
        return [
          ...creatClasses({span,offset}),
          ...creatClasses(ipad,'ipad-'),
          ...creatClasses(narrowPc,'narrow-pc-'),
          ...creatClasses(pc,'pc-'),
          ...creatClasses(widePc,'wide-pc-'),
        ];
      },
      colStyle() {
        return {
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px"
        };
      }
    }
};
</script>

<style lang="scss" scoped>
.col {
  $class-prefix: col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
  $class-prefix: offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
  @media (min-width: 577px){
    $class-prefix: col-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-ipad-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 769px){
    $class-prefix: col-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-narrow-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 993px){
    $class-prefix: col-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
  @media (min-width: 1200px) {
    $class-prefix: col-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        width: ($n / 24) * 100%;
      }
    }
    $class-prefix: offset-wide-pc-;
    @for $n from 1 through 24 {
      &.#{$class-prefix}#{$n} {
        margin-left: ($n / 24) * 100%;
      }
    }
  }
}
</style>
