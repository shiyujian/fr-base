import '../react/style/FrAlert.less';

import { removeMask } from './Common'
import Vue from 'vue';

import AlertTemplate from './AlertTemplate.vue';

const openFrAlert = function (msg, fun) {

    new Vue({
        el: '#fr-base-others',
        template: '<AlertTemplate :msg="msg" :closeFrAlert="closeFrAlert"/>',
        data: function () {
            return {
                msg: msg
            }
        },

        methods: {
            closeFrAlert: function () {
                removeMask();
                fun && fun();
            }
        },
        components: { AlertTemplate }
    });
};
export default openFrAlert