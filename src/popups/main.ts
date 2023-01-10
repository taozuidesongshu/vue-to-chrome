import { createApp } from "vue";
import ElementPlus from "element-plus";
import Popup from "./Popup.vue";
import "element-plus/lib/theme-chalk/index.css";


window.onload = async () => {
    const el = document.querySelector('body');
    if (el) {
        el.insertAdjacentHTML(
            'afterend',
            '<div id="crx-app"></div>',
        );
        createApp(Popup).use(ElementPlus).mount('#crx-app');
    }
    // chrome.runtime.onMessage.addListener((message:object) => {
    //     console.log(message)
    //     if (message.toggleVisible) {
    //         (vm as any).visible = !(vm as any).visible;
    //     }
    // });
}


