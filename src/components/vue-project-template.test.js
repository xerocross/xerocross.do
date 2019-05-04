import {mount} from '@vue/test-utils';
import VueProjectTemplate from "./vue-project-template.vue";

beforeEach(()=> {
    localStorage.clear();
})

test("the component mounts", function() {
    expect(()=>{
        mount(VueProjectTemplate);
    }).not.toThrow();
});