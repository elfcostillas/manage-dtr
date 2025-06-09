<template>
    <div class="card">
        <div v-if="authStore.isLoggedIn">
            <Menubar :model="items" style="margin:4px;" >
                <template #item="{ item, props, hasSubmenu }">
                    <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                        <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                            <span :class="item.icon" />
                            <span>{{ item.label }}</span>
                        </a>
                    </router-link>
                    <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                        <span :class="item.icon" />
                        <span>{{ item.label }}</span>
                        <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down" />
                    </a>
                </template>
                <template #end>
                    <div style="float:left" class="mr-4" > Hi, {{ authStore.user.name }} </div>
                    <div class="flex align-items-center gap-2">
                    <a href="#" @click.prevent="showLogOut" >
                        <i class="pi pi-power-off">  </i> 
                        <span style="margin-right:1rem;margin-left : 6px;" > Logout </span> 
                    </a>
                    </div>
                
                </template>
            </Menubar>

            <Dialog v-model:visible="dialogVisible" :style="{ width: '30rem' }" modal>
                <template #header> Logout </template>
                    <!-- <div class="flex flex-wrap align-items-center justify-content-center"> -->
                    <div style="text-align:center;"> 
                        <Button label="Confirm Logout?" @click.prevent="logoutConfirm"  severity="danger" />
                    </div>
                <template #footer></template>
            </Dialog>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useAuthStore } from "@/stores/auth";
    import { useRouter } from "vue-router";
    import { getModules } from "../api/auth-api";

    const router = useRouter();

    const authStore = useAuthStore();
    const dialogVisible = ref(false);
    const visible = ref(true);

    const showLogOut = () => {
        // console.log('called showLogout');
        // console.log(dialogVisible.value);
        dialogVisible.value = true;
        // console.log(dialogVisible.value);
    }

    const logoutConfirm = async () => {
        await authStore.handleLogout();
        dialogVisible.value = false;
        router.push({ name : 'login'});
        
    }

    const items = ref(null);

    onMounted(async()=> {
        reloadNavBar();
    
    });

    const reloadNavBar = async () => {

        await authStore.getUserModules();
        items.value = authStore.user_modules;

        // console.log(items.value);

        // let { data } = await getModules();

        // items.value = [
        //     {
        //         label: 'Home',
        //         icon: 'pi pi-home',
        //         route : '/'
        //     }
        // ];

        // if(data.user.user_rights == 'Y'){
        //     items.value.push({
        //         label: 'User Settings',
        //         icon: 'pi pi-user-edit',
        //         items: [
        //             {
        //                 label: 'User Rights',
        //                 icon: 'pi pi-list-check',
        //                 route : '/user-settings/user-rights'
        //             }
        //         ]
        //     });
        // }

        // items.value.push(data.modules[0]);
    };

    defineExpose({
        reloadNavBar
    });

    // function showLogOut()
    // {
    //     // activeTab.value = 'Logout';
    //     // // // dialogVisible.value = true;
    //     // authStore.authDialogSetter(true);
    //     dialogVisible.value = true;

    // }

    // async function logoutConfirm()
    // {
    //     authStore.authDialogSetter(false);
    //     dialogVisible.value = authStore.authDialog;

    //     await authStore.handleLogout();

    //     if(!authStore.isLoggedIn){
    //         router.push({ name : 'home'});
    //     }

    //     // router.push({ name : 'home' });
    // }

    

    /*
    const items = ref([
        {
            label: 'Home',
            icon: 'pi pi-home',
            route : '/'
        },
        {
            label: 'Timekeeping',
            icon: 'pi pi-clock',
            items: [
                {
                    label: 'FTP Request',
                    icon: 'pi pi-receipt',
                    route : '/timekeeping/ftp'
                },
                {
                    label: 'FTP Approval',
                    icon: 'pi pi-receipt',
                    route : '/timekeeping/ftp-approval'
                },
                {
                    label: 'Manage DTR',
                    icon: 'pi pi-calendar-clock',
                    route : '/timekeeping/manage-dtr'
                },
                {
                    label: 'Payroll Periods',
                    icon: 'pi pi-calendar-plus',
                    items : [
                        {
                            label: 'Semi Monthly',
                            icon: 'pi pi-calendar-plus',
                            route : '/timekeeping/payroll-period/semi'
                        }
                    ]
                }
            ]
        },

    ]);
    */

</script>

<style>

</style>