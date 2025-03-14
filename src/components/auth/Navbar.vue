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
            </Menubar>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { useAuthStore } from "@/stores/auth";
    const authStore = await useAuthStore();

    const visible = ref(true);

    const items = ref([
        {
            label: 'Home',
            icon: 'pi pi-home',
            route : '/'
        },
        // {
        //     label: 'Features',
        //     icon: 'pi pi-star'
        // },
        {
            label: 'Deductions',
            icon: 'pi pi-receipt',
            items: [
                {
                    label: 'Installments',
                    icon: 'pi pi-wallet',
                    route : '/deductions/installments'
                },
                {
                    label: 'Government Loans',
                    icon: 'pi pi-building-columns',
                    route : '/deductions/govt-loans'
                },
                {
                    label: 'C.A. / Canteen',
                    icon: 'pi pi-clipboard',
                    route : '/deductions/canteen'
                },
               
            ]
        },
        {
            label: 'Other Earnings',
            icon: 'pi pi-money-bill',
            items: [
                {
                    label: 'Retro Pay / Other Income',
                    icon: 'pi pi-wallet',
                    route : '/compnesation/other-earnings'
                },
            ]
        },
        {
            label: 'Payroll Transactions',
            icon: 'pi pi-print',
            items: [
                {
                    label: 'Payroll Register',
                    icon: 'pi pi-wallet',
                    route : '/payroll-regitser/unposted'
                },
                {
                    label: 'Bank Transmittal',
                    icon: 'pi pi-receipt',
                    route : '/deductions/installments'
                },
                // {
                //     label: 'Govt. Deductions',
                //     icon: 'pi pi-building-columns',
                //     route : 'deductions/govt-deductions'
                // },
               
            ]
        }
    ]);

</script>

<style>

</style>