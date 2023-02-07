import Vue from "vue";
import AppComponent from "./App/App.vue";
import ElementUI from 'element-ui'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import lodash from 'lodash'

Vue.prototype._ = lodash
Vue._ = lodash
Vue.use(ElementUI, { zhLocale, size: 'mini' })
new Vue({
  el: "#app",
  render: createElement => {
    return createElement(AppComponent);
  }
});
