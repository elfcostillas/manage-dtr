<template>
    <Card style="width:auto;">
        <template #title>Users </template>
        <template #content>
            <DataTable style="width : 54rem" :value="users" paginator :rows="9" :loading="loading"> 
                <Column field="id" header="ID" ></Column>
                <Column field="name" header="Name" ></Column>
                <Column field="email" header="User Name" ></Column>
                <Column>
                    <template #body="slotProps">
                        <Button icon="pi pi-pen-to-square" @click="showRights(slotProps.data)" style="" class="" label="Edit" ></Button>
                    </template>
                </Column>
            </DataTable> 
        </template>
    </Card>

    <Dialog modal  v-model:visible="visible" :style="{ width: '18rem' }" header="User Rights" dataKey="id" >
        <Toolbar>
            <template #start>
                <Button label="Save" @click="saveRights" icon="pi pi-save"></Button>
            </template>
        </Toolbar>
        <DataTable v-model:selection="selectedModules" :value="modules">
            <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>    
            <Column header="Module" field="label"></Column>
        </DataTable>
    </Dialog>
</template>

<script setup>
    import { useUserStore } from '@/stores/user';
    import { ref,onMounted } from 'vue';    

    const userStore = useUserStore();

    const users = ref();
    const loading = ref(true);
    const visible = ref(false);
    const selectedModules = ref();
    const selectedUser = ref();
    const modules = ref();

    const saveRights = async () => {
        console.log(selectedModules.value,selectedUser.value);
        await userStore.saveRights(selectedModules.value,selectedUser.value);

    };

    onMounted(async() => {
        let data = await userStore.getList();
        let m = await userStore.getModules();

        // console.log(data);
        
        users.value = data.value;
        modules.value = m.value;

        loading.value = false;
    });

    const showRights = async (obj) => {
        console.log(obj);
        selectedUser.value = obj;
        visible.value = true;
    };
</script>

<style>

</style>