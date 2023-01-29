import {createApp} from "vue";
import ElementPlus from "element-plus";
import App from "./App/App.vue";
import cssString from "element-plus/lib/theme-chalk/index.css";

createApp(App).use(ElementPlus).mount('#app');
const style = document.createElement('style');
document.head.append(style);
style.textContent = cssString;
// chrome.runtime.onMessage.addListener((message:object) => {
//     console.log(message)
//     if (message.toggleVisible) {
//         (vm as any).visible = !(vm as any).visible;
//     }
// });



