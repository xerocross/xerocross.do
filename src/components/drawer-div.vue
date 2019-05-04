<template>
    <div class="drawer-div">
        <div 
            v-if="isOpen" 
            class="drawer-slot"
        >
            <slot></slot>
        </div>
        <div 
            class="drawer-button-outer" 
            @click="toggle"
        >
            <span class="drawer-button-inner">{{ currentButtonText }}</span>
        </div>
    </div>
</template>
<script>
export default {
    props : {
        buttonTextOpen : {
            type : String,
            default : "more"
        },
        buttonTextClose : {
            type : String,
            default : "less"
        }
    },
    data () {
        return {
            isOpen : false
        }
    },
    computed : {
        currentButtonText () {
            return this.isOpen ? this.buttonTextClose : this.buttonTextOpen;
        }
    },
    methods : {
        toggle () {
            this.isOpen = !this.isOpen;
        }
    }
}
</script>
<style lang="scss">
.drawer-div {
    border-style : solid;
    border-color : darkgray;
    border-width: 1px;
    margin-top: 10px;
    margin-bottom: 10px;
    
    .drawer-button-outer {
        text-align: center;
        cursor: pointer;
        font-weight: bold;
        height: 2em;
        padding-top: 5px;
        padding-bottom: 5px;
        box-sizing: border-box;
    }
    .drawer-slot {
        text-align: left;
        padding: 15px;
    }
    .drawer-button-inner {
        box-sizing: border-box;
    }
}
</style>