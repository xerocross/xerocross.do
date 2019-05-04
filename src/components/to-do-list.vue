<template>
    <div class="to-do-list">
        <form 
            class="form-group form-box" 
            @submit.prevent = "add">
            <label>New Item</label>
            <input 
                v-model = "newItemInput" 
                class="form-control"
                type="text"
            />
            <input 
                class="btn btn-primary add-button" 
                type="submit" 
                value = "add"
            />
        </form>
        <ul class="list-group">
            <li 
                v-for = "item in itemList" 
                :key = "item" 
                class="list-group-item flex-item"
            >
                <div class="row">
                    <div class="col-xs-8">
                        <span class="item">{{ item }}</span>
                    </div>
                    <div class="col-xs-4">
                        <button 
                            class="btn btn-success remove-button" 
                            @click.prevent="deleteItem(item)">
                            done
                        </button>
                    </div>
                </div>
            </li>
        </ul>
        <drawer-div
            button-text-open = "about this widget"
            button-text-close = "hide"
        >
            <p>
                This widget is super-simple, but I used it as 
                an opportunity to practice creating a <em>set</em> 
                data structure.  Specifically, I made a very, 
                very simple hash set that only works with strings.
                This is why you can't add the same string twice. 
                Either the set contains a string or it doesn't.
                Duplicates are not allowed.  
            </p>
            <p>
                I also used localStorage to persist the 
                user's to-do list to memory.  In a sense, this 
                makes the set structure I wrote redundant.  But 
                it was an excercise, and there may be benefits 
                I have not thought of.
            </p>
        </drawer-div>
    </div>
</template>
<script>
import DrawerDiv from "./drawer-div.vue";
import { StoreLocal } from "cross-js-base"
import {SimpleHashSet} from "xerocross.data";
import {StringHash} from "cross-js-base";

export default {
    components : {
        DrawerDiv
    },
    data () {
        return {
            newItemInput : "",
            itemSet : SimpleHashSet.build(17, StringHash.hash),
            itemList : [],
            storeLocal : {},
            storageKey : "to-do-list"
        }
    },
    mounted () {
        this.storeLocal = StoreLocal.build(this.storageKey);
        this.buildFromStorage();
        window.t = this.storeLocal;
    },
    methods : {
        add () {
            if (this.itemSet.contains(this.newItemInput)) {
                this.newItemInput = "";
                return;
            }
            this.itemSet.add(this.newItemInput);
            this.storeLocal.addItem(this.newItemInput, this.newItemInput);
            this.newItemInput = "";
            this.update();
        },
        deleteItem (item) {
            if (confirm("Remove this item?")) {
                this.itemSet.remove(item);
                this.storeLocal.removeItem(item);
                this.update();
            }
        },
        update () {
            this.itemList = this.itemSet.toList()
        },
        buildFromStorage () {
            try {
                let list = this.storeLocal.getAll();
                for (let i = 0; i < list.length; i++) {
                    this.itemSet.add(list[i]);
                }

                this.update();
            }
            catch(e) {
                localStorage.removeItem(this.storageKey);
                this.storeLocal = StoreLocal.build(this.storageKey);
            }
        }
    }
}
</script>
<style lang="scss">
.to-do-list {
    .flex-item {
        .form-box {
            margin-bottom: 2em;
        }

        .item {
            font-weight: bold;
            font-size: 18pt;
        }
    }
    .list-group-item {
        &:nth-child(odd) {
            background-color: rgb(230, 230, 230);
        }
    }
    .add-button {
        margin-top: 1em;
        padding:1em;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
}
</style>