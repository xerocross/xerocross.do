<template>
    <div class="to-do-list">
        <form 
            class="form-group form-box add-item-form" 
            @submit.prevent="add"
        >
            <label>New Item</label>
            <input 
                v-model="newItemInput" 
                class="form-control new-item-text"
                type="text"
            />
            <input 
                class="btn btn-primary add-button" 
                type="submit" 
                value="add"
            />
        </form>
        <ul class="list-group items-list">
            <li 
                v-for="item in itemList" 
                :key="item" 
                class="list-group-item flex-item"
            >
                <div class="row">
                    <div class="flex-container">
                        <span class="item item-text left">{{ item }}</span>
                        <button 
                            class="btn btn-success remove-button right" 
                            @click.prevent="deleteItem(item)"
                        >
                            done
                        </button>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import { StoreLocal } from "cross-js-base";
import { SimpleHashSet } from "xerocross.data";
import { StringHash } from "cross-js-base";

export default {
    components : {},
    data () {
        return {
            newItemInput : "",
            itemSet : SimpleHashSet.build(17, StringHash.hash),
            itemList : [],
            storeLocal : {},
            storageKey : "to-do-list"
        };
    },
    mounted () {
        try {
            this.storeLocal = StoreLocal.build(this.storageKey);
        }
        catch (e) {
            localStorage.removeItem(this.storageKey);
            this.$emit("ERROR", e);
        }
        this.buildFromStorage();
    },
    methods : {
        add () {
            if (this.itemSet.contains(this.newItemInput)) {
                this.newItemInput = "";
                return;
            }
            if (this.newItemInput == "") {
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
            this.itemList = this.itemSet.toList().sort();
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
};
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
    .list-group-item.flex-item {
        .flex-container {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            padding-left: 5px;
            padding-right:5px;
        }
    }
    .add-button {
        margin-top: 1em;
        padding:1em;
    }
    select, textarea, input[type="text"], input[type="password"], input[type="datetime"], input[type="datetime-local"], input[type="date"], input[type="month"], input[type="time"], input[type="week"], input[type="number"], input[type="email"], input[type="url"], input[type="search"], input[type="tel"], input[type="color"] { font-size: 16px; }
}
</style>