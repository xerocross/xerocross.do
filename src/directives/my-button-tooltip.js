/* eslint-disable no-unused-vars */
import Vue from "vue";
import $ from "jquery";

Vue.directive('myButtonTooltip', {
    hightlightColor : "#ffdd6d",
    inserted : (el, binding) => {
        const element = el;
        $(element).on("click", () => {
            $(element).blur().tooltip("hide");
        });

    },
});