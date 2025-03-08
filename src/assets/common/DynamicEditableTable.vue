<template>
    

    <DataTable v-model:editingRows="editingRows" editMode="row" :value="dataList" tableStyle="max-width:82rem;min-width:82rem;font-size:11pt;" dataKey="id"  @row-edit-save="onRowEditSave" scrollable scrollHeight="746px" >
        <Column style="width:10rem;text-align:left;" field="lastname" header="Last Name" ></Column>
        <Column style="width:10rem;text-align:left;" field="firstname" header="First Name" ></Column>
        <Column style="width:8rem;text-align:right;" field="earnings" header="Earnings" >
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="width:8rem;text-align:right;" field="retro_pay" header="Retro Pay" >
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="text-align:left;" field="remarks" header="Remarks" >
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column :rowEditor="true" style="width: 8rem; min-width: 8rem" bodyStyle="text-align:center"></Column>
    </DataTable>
    <Toast></Toast>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useCompensationStore } from '@/stores/compensation';
    
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();

    const dataList = ref();
    const columns = ref();

    const editingRows = ref([]);
    const compensation_store = useCompensationStore();

    onMounted(async() => {

    });

    const onRowEditSave = async (event) => {
        let { newData, index } = event;
        dataList.value[index] = newData;

        let respObj = await compensation_store.save(newData);

        console.log(respObj);

        if(respObj.status == 'success'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }else{
            toast.add({ severity: 'error', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }
    };

    // const view = (props) => {
    //     emit('view',props);
    // };

    // const create = (props) => {
    //     emit('create',props);
    // };

    
    // const clearFilter = () => {
    //     emit('clearFilter');
    // };

    // const emit = defineEmits(['view','create','clearFilter']);

    const setData = (data) => {
        dataList.value = data;
       
    }

    defineExpose({
        setData
    });
</script>

<style>

</style>