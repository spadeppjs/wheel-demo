<template>
    <div class="tabs">
        <slot></slot>
        
    </div>
</template>
<script>
import Vue from 'vue'
export default {
    name: 'GuLuTabs',
    props:{
        selected:{
            type:String,
            required:true
        },
        direction:{
            type:String,
            default:'horizontal',
            validator(value){
                return ['horizontal','vertical'].indexOf(value) >= 0
            }
        }
    },
    data(){
        return {
            eventBus: new Vue()
        }
    },
    provide(){
        return {
            eventBus: this.eventBus
        }
    },
    mounted(){
        if(this.$children.length === 0){
            console && console.warn &&
            console.warn('tabs的子组件应该是tabs-head和tabs-body，而你没有写子组件')
        }
        this.$children.forEach((vm)=>{
            if(vm.$options.name === 'GuLuTabsHead'){
                vm.$children.forEach((childvm)=>{
                    if(childvm.$options.name === 'GuLuTabsItem' 
                    && childvm.name === this.selected){
                        this.eventBus.$emit('update:selected',this.selected,childvm)
                    }
                })
            }
        })
        // 这里就是设置了默认的选项，默认的被触发了
    }
}
</script>
<style lang="scss" scoped>
.tabs{

}
</style>
