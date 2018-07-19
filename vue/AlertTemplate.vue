<template>
    <div id="fr-base-others">
        <div class="fr-alert">
            <div class="alert-modal-container animated-fade-in">
                <div class="alert-modal">
                    <div class="main-container">
                        {{msg}}
                    </div>
                    <div @click='closeFrAlert' class="alert-btn">
                        <div class="top-line">

                        </div>
                        确定
                    </div>
                </div>

            </div>
        </div>

    </div>
</template>

<script>


    import Vue from 'vue';

    import '../react/style/FrAlert.less';
    export default {
        name: 'AlertTemplate',
        props: ['msg', 'closeFrAlert'],

    }
</script>



