import Vue from "vue";
import AppComponent from "./App/App.vue";
import ElementUI from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
Vue.use(ElementUI, { zhLocale, size: 'mini' })
new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
