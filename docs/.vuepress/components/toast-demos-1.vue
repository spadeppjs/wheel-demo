<template>
    <div style="padding-top:16px;">
        <h2>this.$toast</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button @click="$toast('点击弹出提示')">上方弹出</g-button>
        <g-button @click="$toast('点击弹出提示',{position:'middle'})">中间弹出</g-button>
        <g-button @click="$toast('点击弹出提示',{position:'bottom'})">下方弹出</g-button>
        <p>
            <strong>代码</strong>
        </p>
        <pre><code>{{content}}</code></pre>
    </div>
</template>
<script>
import Button from '../../../src/button'
import Plugin from '../../../src/plugin'
import Vue from 'vue'
Vue.use(Plugin)
export default {
    components:{
        'g-button':Button
    },
    data(){
        return{
            content:`
            <style>
                .gulu-toast{
                    z-index: 30 !important
                }
            </style>

            <g-button @click="$toast('点击弹出提示')">上方弹出</g-button>
            <g-button @click="$toast('点击弹出提示',{position:'middle'})">中间弹出</g-button>
            <g-button @click="$toast('点击弹出提示',{position:'bottom'})">下方弹出</g-button>            
            `.replace(/^ {12}/gm,'').trim()
        }
    }
}
</script>
<style>
    .gulu-toast{
        z-index: 30 !important
    }
</style>
<style scoped>
*{
    box-sizing: border-box
}
</style>

