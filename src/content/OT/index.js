let div
div = document.createElement('div')
div.id='vue_chrome'
document.body.appendChild(div);
import Vue from "vue";
import AppComponent from "./App/App.vue";

import elementui from 'element-ui';
import lodash from 'lodash'
Vue.prototype._ = lodash
Vue._ = lodash
Vue.use(elementui);
new Vue({
  el: div,
  render: createElement => createElement(AppComponent)
});