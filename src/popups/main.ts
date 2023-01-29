import {createApp} from "vue";
import ElementPlus from "element-plus";
import Popup from "./App/Popup.vue";
// import "element-plus/lib/theme-chalk/index.css";
import cssString from "element-plus/lib/theme-chalk/index.css";

const style = document.createElement('style');
document.head.append(style);
style.textContent = cssString;

createApp(Popup).use(ElementPlus).mount('#app');


