<template>
    <DataTable v-model:editingRows="editingRows" v-model:filters="filters" editMode="row" :value="dataList" tableStyle="max-width:82rem;min-width:82rem;font-size:11pt;" dataKey="id"  
    @row-edit-save="onRowEditSave" scrollable scrollHeight="678px"  :globalFilterFields="['lastname', 'firstname', 'remarks']" :loading="loading">
        <template #header>
            <div class="flex justify-end">
                <IconField>
                    <InputIcon>
                        <i class="pi pi-search" />
                    </InputIcon>
                    <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
                </IconField>
            </div>
        </template>
        <template #loading> Processing. Please wait. </template>
        <Column style="width:10rem;text-align:left;" field="lastname" header="Last Name" ></Column>
        <Column style="width:10rem;text-align:left;" field="firstname" header="First Name" ></Column>
        <Column style="width:8rem;text-align:right;" field="earnings" header="Earnings" >
            <template #body="{ data }">
                {{   Number(data.earnings).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="width:8rem;text-align:right;" field="retro_pay" header="Retro Pay" >
            <template #body="{ data }">
                {{   Number(data.retro_pay).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
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
        <ColumnGroup type="footer">
            <Row>
                <Column footer="Totals:" :colspan="2" footerStyle="text-align:right" />
                <Column style="text-align:right" :footer="earningTotal" />
                <Column style="text-align:right" :footer="retroTotal" />
                <Column :colspan="2" ></Column>
 
            </Row>
        </ColumnGroup>
    </DataTable>
    <Toast></Toast>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { useCompensationStore } from '@/stores/compensation';
    import { FilterMatchMode } from '@primevue/core/api';
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();

    const dataList = ref();
    const columns = ref();
    const loading = ref(true);

    const editingRows = ref([]);
    const compensation_store = useCompensationStore();

    const retroTotal = ref(0.00);
    const earningTotal = ref(0.00);

    onMounted(async() => {

    });

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const onRowEditSave = async (event) => {
        let { newData, index } = event;
        dataList.value[index] = newData;

        let respObj = await compensation_store.save(newData);

        if(respObj.status == 'success'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }else{
            toast.add({ severity: 'error', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }
    };

    const computeTotals = () => {
        let reto_total = 0;
        let earning_total = 0;

        if(dataList.value != null){
            for(let row of dataList.value){
                reto_total += Number(row.retro_pay);
                earning_total += Number(row.earnings);
            }

            retroTotal.value = Number(reto_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2});
            earningTotal.value = Number(earning_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2});

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

    const setData = async (data) => {
        dataList.value = await data;
        computeTotals();
        loading.value = false;
    }

    const setLoading = async () => {
        loading.value = true;
        console.log("called");
    }

    defineExpose({
        setData,
        setLoading

    });
</script>

<style>

</style>