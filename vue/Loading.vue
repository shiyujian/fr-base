<template>
    <div class="fr-loading">
        <svg version="1.1" id="L4" x="0px" y="0px"
             viewBox="0 0 100 100" enable-background="new 0 0 0 0" >
            <circle fill="rgba(23,134,250,1)" stroke="none" cx="26" cy="50" r="6">
                <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.1"/>
            </circle>
            <circle fill="rgba(23,134,250,1)" stroke="none" cx="46" cy="50" r="6">
                <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.2"/>
            </circle>
            <circle fill="rgba(23,134,250,1)" stroke="none" cx="66" cy="50" r="6">
                <animate
                        attributeName="opacity"
                        dur="1s"
                        values="0;1;0"
                        repeatCount="indefinite"
                        begin="0.3"/>
            </circle>
        </svg>
    </div>
</template>

<script>


    import Vue from 'vue';

    import '../react/style/Loading.less';


    export default {
        name: 'Loading',


        data () {
            return {
            }
        },
        props: ['msg'],

    }
</script>

<style>

    .fr-loading svg {
        width: 20%;
        display: block;
        margin: auto;
        padding-top: 20%;
    }
</style>


