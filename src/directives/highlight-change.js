import Vue from "vue";
import $ from "jquery";

const hightlightColor = "#ffdd6d";
Vue.directive('highlight', {
    hightlightColor : "#ffdd6d",
    inserted : (el, binding) => {
        const selector = `[data-item=${binding.value}]`;
        $(selector)
            .delay(20)
            .queue(function() {
                $(this).css("background-color", hightlightColor).dequeue();
            })
            .delay(20)
            .queue(function() {
                $(this).css({"transition" : "background-color 2s", "backgroundColor" : ""}).dequeue();
            })
            .delay(2200)
            .queue(function() {
                $(this).css("transition","").dequeue();
            });
    },
});