<template>
    <div class="loading-view">
        <div class="img">
            <div class="loader">
                <div class="loader-inner line-scale-pulse-out-rapid">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <p class="msg" v-if="msg && msg.length > 0">
                    {{msg}}
                </p>
            </div>
        </div>

    </div>
</template>

<script>


    import Vue from 'vue';

    import '../react/style/LoadView.less';


    export default {
        name: 'LoadView',


        data () {
            return {
            }
        },
        props: ['msg'],

    }
</script>



