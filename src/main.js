import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

/** Components **/
import Navbar from './components/auth/Navbar.vue'


/** PrimeVue CSS **/
import 'primeicons/primeicons.css';

/** PrimeVue **/

import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

import Menubar from 'primevue/menubar';
import Card from 'primevue/card';
import Select from 'primevue/select';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import ConfirmDialog from 'primevue/confirmdialog';
import { Ripple } from 'primevue';
import Button from 'primevue/button';
import Listbox from 'primevue/listbox';
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Image from 'primevue/image';
import Password from 'primevue/password';
import IconField from 'primevue/iconfield';
import InputIcon from 'primevue/inputicon';

import Tabs from 'primevue/tabs';
import TabList from 'primevue/tablist';
import Tab from 'primevue/tab';
import TabPanels from 'primevue/tabpanels';
import TabPanel from 'primevue/tabpanel';
import Fieldset from 'primevue/fieldset';
import DatePicker from 'primevue/datepicker';

/* service */
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';

import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';                   // optional

const app = createApp(App)

app.component('Navbar',Navbar);

app.use(createPinia())
app.use(router)
app.component('Menubar',Menubar);
app.component('Card',Card);
app.component('Select',Select);
app.component('InputText',InputText);
app.component('InputNumber',InputNumber);

app.component('Listbox',Listbox);
app.component('Toolbar',Toolbar);

app.component('DataTable',DataTable);
app.component('Column',Column);
app.component('Button',Button);
app.component('Dialog',Dialog);
app.component('ConfirmDialog',ConfirmDialog);

app.component('IconField',IconField);
app.component('InputIcon',InputIcon);

app.component('Toast',Toast);
app.component('Image',Image);
app.component('Password',Password);

app.component('ColumnGroup',ColumnGroup);
app.component('Row',Row);
app.component('Fieldset',Fieldset);

app.component('Tabs',Tabs);

app.component('TabList',TabList);
app.component('Tab',Tab);
app.component('TabPanels',TabPanels);
app.component('TabPanel',TabPanel);
app.component('DatePicker',DatePicker);

app.use(ToastService);
app.use(ConfirmationService);


app.directive('ripple',Ripple)

app.use(PrimeVue, {
    theme: {
        preset: Aura
    }
});


app.mount('#app')
