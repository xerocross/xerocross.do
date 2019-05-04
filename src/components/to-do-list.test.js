/* eslint-disable no-console */
import {mount} from '@vue/test-utils';
import ToDoList from "./to-do-list.vue";


function getAddItemForm (wrapper) {
    return wrapper.find(".add-item-form");
}

function getAddItemTextInput (wrapper) {
    return wrapper.find(".new-item-text");
}

function getItems (wrapper) {
    let ul = wrapper.find(".items-list");
    return ul.findAll("li");
}

function getItemText (item) {
    return item.find(".item-text").text();
}

function getDoneButton (item) {
    return item.find(".remove-button");
}

function addItem (wrapper, text) {
    let form = getAddItemForm(wrapper);
    let textInput = getAddItemTextInput(wrapper);
    textInput.setValue(text);
    form.trigger("submit");
}

beforeEach(()=> {
    localStorage.clear();
    window.confirm = () => {
        throw new Error("confirm not defined");
    };
});

test("mounts", ()=> {
    expect(()=>{
        mount(ToDoList);
    }).not.toThrow();
});

test("addItemForm exists", () => {
    let toDoList = mount(ToDoList);
    let addItemForm =  getAddItemForm(toDoList);
    expect(addItemForm.exists()).toBe(true);
});

test("add item clears input", () => {
    let toDoList = mount(ToDoList);
    let form = getAddItemForm(toDoList);
    let textInput = getAddItemTextInput(toDoList);
    textInput.setValue("apple");
    form.trigger("submit");
    textInput = getAddItemTextInput(toDoList);
    expect(textInput.element.value).toBe("");
});

test("can't add empty text", () => {
    let toDoList = mount(ToDoList);
    let form = getAddItemForm(toDoList);
    let textInput = getAddItemTextInput(toDoList);
    textInput.setValue("");
    form.trigger("submit");
    let items = getItems(toDoList);
    expect(items.length).toBe(0);
});

test("item list exists", () => {
    let toDoList = mount(ToDoList);
    expect(toDoList.find(".items-list").exists()).toBe(true);
});

test("can add items", () => {
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    addItem(toDoList, "yellow");
    addItem(toDoList, "boar");
    addItem(toDoList, "zelda");
    let items = getItems(toDoList);
    expect(items.length).toBe(4);
    expect(getItemText(items.at(0))).toBe("apple");
    expect(getItemText(items.at(1))).toBe("boar");
    expect(getItemText(items.at(2))).toBe("yellow");
    expect(getItemText(items.at(3))).toBe("zelda");
});

test("clicking donebutton fires a confirm dialog", () => {
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    let item = getItems(toDoList).at(0);
    let doneButton = getDoneButton(item);
    let confirmWasCAlled = false;
    window.confirm = () => {
        confirmWasCAlled = true;
    };
    doneButton.trigger("click");
    expect(confirmWasCAlled).toBe(true);
});



test("can remove item, confirmed", () => {
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    addItem(toDoList, "yellow");
    addItem(toDoList, "boar");
    addItem(toDoList, "zelda");
    let items = getItems(toDoList);
    let item = items.at(2);
    let doneButton = getDoneButton(item);
    window.confirm = () => true;
    doneButton.trigger("click");
    items = getItems(toDoList);
    expect(getItemText(items.at(0))).toBe("apple");
    expect(getItemText(items.at(1))).toBe("boar");
    expect(getItemText(items.at(2))).toBe("zelda");
});

test("can remove item, declined", () => {
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    addItem(toDoList, "yellow");
    addItem(toDoList, "boar");
    addItem(toDoList, "zelda");
    let items = getItems(toDoList);
    let item = items.at(2);
    let doneButton = getDoneButton(item);
    window.confirm = () => false;
    doneButton.trigger("click");
    items = getItems(toDoList);
    expect(items.length).toBe(4);
});

test("data gets retrieved from and stored to localstorage", () => {
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    addItem(toDoList, "yellow");
    let toDoList2 = mount(ToDoList);
    let items = getItems(toDoList2);
    expect(getItemText(items.at(0))).toBe("apple");
    expect(getItemText(items.at(1))).toBe("yellow");
});

test("corrupt localstorage gets ignored and overwritten", () => {
    let storageKey = "to-do-list";
    localStorage.setItem(storageKey, "corrup data");
    let toDoList = mount(ToDoList);
    addItem(toDoList, "apple");
    addItem(toDoList, "yellow");
    let toDoList2 = mount(ToDoList);
    let items = getItems(toDoList2);
    expect(getItemText(items.at(0))).toBe("apple");
    expect(getItemText(items.at(1))).toBe("yellow");
});