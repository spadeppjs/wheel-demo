import Toast from './toast'

let currentToast
export default {
    install(Vue, options) {
        Vue.prototype.$toast = function (message, taostOptions) {
            if(currentToast){
                currentToast.close()
            }
            currentToast = creatToast({
                Vue,
                message,
                propsData:taostOptions,
                onClose:()=>{
                    currentTasat = null
                }
            })
        }
    }
}

function creatToast({Vue,message,propsData,onClose}){
    const Constructor = Vue.extend(Toast)
    const toast = new Constructor({propsData})
    toast.$slots.default = [message]
    toast.$mount()
    toast.$on('clos',onClose)
    document.body.appendChild(toast.$el)
    return toast
}