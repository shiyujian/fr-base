<template>
    <div id="fr-base-others">
        <div class="weixin-mask animated-fade-in">
            <img @click="preventImgDefault" class="tip" src="https://mifengkongdemo.oss-cn-shenzhen.aliyuncs.com/fr_public_666610/10_72ce2460693bf425fb0103f81e310227.png"/>
            <img class="ok" @click="onOk" src="https://mifengkongdemo.oss-cn-shenzhen.aliyuncs.com/fr_public_666610/10_b9176663f4d5f4d8c7fd5f2229f1dcf2.png"/>
        </div>
    </div>
</template>

<script>


    import Vue from 'vue';

    import '../react/style/WeixinMask.less';


    export default {
        name: 'WeixinMask',
        props: ['onClose'],
        methods: {
            preventImgDefault: function () {
                e.preventDefault();

                return false
            },
            onOk: function () {
                this.onClose();
            }
        }

    }
</script>



