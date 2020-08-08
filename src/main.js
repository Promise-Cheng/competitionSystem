// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import Mint from'mint-ui'
import './style/weui.scss';
import'mint-ui/lib/style.css'

Vue.use(Mint);
/* 或写为
 * Vue.use(Button)
 * Vue.use(Cell)
 */

import {
  Button, Select, Row, Col, Radio, Input, Menu, Submenu, MenuItem, MenuItemGroup
  , Message, Loading, Avatar, Divider, Table, TableColumn, Form, FormItem, Collapse, CollapseItem, MessageBox,Carousel,CarouselItem,
 Option,DatePicker,Container,Header,Main,Dropdown,DropdownItem,DropdownMenu,Dialog,PageHeader,Pagination,Card} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

/*
引入axios
 */
import axios from 'axios';
axios.defaults.timeout=5000;
axios.defaults.withCredentials=true;
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL='http://172.20.10.3:3000';http://101.37.13.10:8080  http://101.37.13.10/
axios.defaults.baseURL='http://localhost:8085';    // http://localhost:8085     http://101.37.13.10:8085
Vue.prototype.$axios = axios;
/*
引入vuex
 */
import store from './store'
import App from './App'
Message.install = function (Vue, options) {
  Vue.prototype.$message = Message
  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
}
Vue.use(Card)
Vue.use(Pagination)
Vue.use(PageHeader)
Vue.use(Dialog)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Dropdown)
Vue.use(Header)
Vue.use(Main)
Vue.use(Container)
Vue.use(DatePicker)
Vue.use(Option)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.component(MessageBox.name, MessageBox);
Vue.use(CollapseItem)
Vue.use(Collapse)
Vue.use(FormItem)
Vue.use(Form)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(Divider)
Vue.use(Avatar)
Vue.use(Message)//消息提示
Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Col);
Vue.use(Radio);
Vue.use(Input);
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Loading)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store
})
