const expect = chai.expect;
import Vue from 'vue'
import Input from '../src/input'

Vue.config.productionTip = false
Vue.config.devtools = false

describe('Input', () => {
    it('存在.', () => {
        expect(Input).to.be.ok
    })
    describe('props', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })
        it('可以设置value.', () => {
            vm = new Constructor({
                propsData: {
                    value: 1234
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.value).to.equal('1234')
        })
        it('可以设置disabled.', () => {
            vm = new Constructor({
                propsData: {
                    disabled: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.disabled).to.equal(true)
        })
        it('可以设置readonly.', () => {
            vm = new Constructor({
                propsData: {
                    readonly: true
                }
            }).$mount()
            const inputElement = vm.$el.querySelector('input')
            expect(inputElement.readOnly).to.equal(true)
        })
        it('可以设置error.', () => {
            vm = new Constructor({
                propsData: {
                    error: '名字不能少于两个字'
                }
            }).$mount()
            const useElement = vm.$el.querySelector('use')
            expect(useElement.getAttribute('xlink:href')).to.equal('#i-error')
            const errorMessage = vm.$el.querySelector('.error-message')
            expect(errorMessage.innerText).to.equal('名字不能少于两个字')
        })
    })
    describe('事件', () => {
        const Constructor = Vue.extend(Input)
        let vm
        afterEach(() => {
            vm.$destroy()
        })
        it('支持change/input/focus/blur事件', () => {
            ['change', 'input', 'focus', 'blur'].forEach((eventName) => {
                vm = new Constructor({}).$mount()
                const callback = sinon.fake();
                vm.$on(eventName, callback)
                //触发input的change事件
                let event = new Event(eventName);
                Object.defineProperty(event, 'target', {
                    value: { value: 'hi' }, enumberable: true
                })
                // 为了实现双向绑定，在这里将前面的input的属性$event改为了
                // $event.target.value，所以在模拟的时候需要设置一个target属性值
                // 这里就进行以上设置，设置target的值是value：'hi'，
                // 那么返回的$event.target.value就是hi
                let inputElement = vm.$el.querySelector('input')
                inputElement.dispatchEvent(event)
                // dispatchEvent就是触发事件了吧
                
                expect(callback).to.have.been.calledWith('hi')
                // expect(callback).to.have.been.called
                // callback是事件传回来的，不是自己触发的事件的回调，
                // 这个时候期待的是函数被触发了，并且通过calledWith返回了event事件。
            })
        })
    })
})

