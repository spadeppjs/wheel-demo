<template>
    <div style="padding-top:16px;">
        <h2>设置关闭按钮</h2>
        <p>
            <strong>预览</strong>
        </p>
        <g-button @click="onclickButton">上方弹出</g-button>
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

            <g-button @click="onclickButton">上方弹出</g-button>
            methods:{
                onclickButton(){
                    this.$toast('启禀圣上，臣有事起奏',{
                        closeButton:{
                            text:'朕知道了',
                            callback:()=>{
                                console.log('圣上说准奏')
                            }
                        }
                    })
                }
            }
            `.replace(/^ {12}/gm,'').trim()
        }
    },
    methods:{
        onclickButton(){
            this.$toast('启禀圣上，臣有事起奏',{
                closeButton:{
                    text:'朕知道了',
                    callback:()=>{
                        console.log('圣上说准奏')
                    }
                }
            })
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

