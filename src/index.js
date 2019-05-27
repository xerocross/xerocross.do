import Vue from "vue";
import ToDoList from "./components/to-do-list.vue";
import "./directives/init-highlight";
import "./directives/my-button-tooltip";

let NODE_ENV = env["NODE_ENV"];
new Vue({
    el : "#to-do-list",
    components : {
        ToDoList
    },
    render : function (createElement) {
        return createElement(ToDoList, {
            props : {
                ENVIRONMENT : NODE_ENV
            }
        });
    }
});
