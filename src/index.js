import Vue from "vue";
import ToDoList from "./components/to-do-list.vue";

let NODE_ENV = env["NODE_ENV"];

new Vue({
    el : "#xerocross-do",
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