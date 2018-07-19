import Vue from 'vue';


import WeixinMask from './WeixinMask.vue'


import { removeMask } from './Common'





const AddWeixinMask = function (onOk) {

    new Vue({
        el: '#fr-base-others',
        template: '<WeixinMask :onClose="removeIt"/>',
        methods: {
            removeIt: function () {
                onOk && onOk();
                removeMask();
            }
        },
        components: { WeixinMask }
    });
};
export default AddWeixinMask



