<template>
    <Card>
        <template #title > Payroll Period</template>
        <template #content >
             <Toolbar>
                <template #start>
                    <Button icon="pi pi-plus" @click="create" class="mr-2" severity="secondary" label="Create" /> 
                </template>
                <template #center ></template>
                <template #end ></template>
            </Toolbar>
            <DataTable :value="payrollperiod" paginator :rows="8" scrollable scrollHeight="72vh" :loading="loading" >
                <template #loading> Processing. Please wait. </template>
                <Column field="id" header="ID" > </Column>
                <Column style="" field="date_from" header="Date From" >
                    <template #body="slotProps">
                        <div>{{ (slotProps.data.date_from) ? format(slotProps.data.date_from,"MMMM dd, yyyy") : '' }}</div>
                    </template>
                </Column>
                <Column style="" field="date_to" header="Date To" > 
                    <template #body="slotProps">
                        <div>{{ (slotProps.data.date_to) ? format(slotProps.data.date_to,"MMMM dd, yyyy") : '' }}</div>
                    </template>
                </Column>
                <Column style="" field="pyear" header="Year" > </Column>
                <Column style="" field="cut_off" header="Cut Off" > </Column>
                <Column style="font-size:10pt">
                    <template #body="slotProps">
                        <Button icon="pi pi-folder-open"  label="View" @click="view(slotProps.data)">  </Button>
                    </template>
                </Column>
                <Column style="font-size:10pt">
                    <template #body="slotProps">
                        <Button icon="pi pi-address-book" severity="contrast" label="Prepare" @click="prepare(slotProps.data)">  </Button>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
    <Toast></Toast>
</template>

<script setup>
    import { ref,computed,onMounted } from 'vue';
    import { format } from 'date-fns';
    import TablePage from './TablePage.vue';
    import { usePayrollPeriodSGStore } from '@/stores/payrollperiod-sg';
    import { useToast } from 'primevue/usetoast';
    const toast = useToast();

    const payrollperiod_store = usePayrollPeriodSGStore();
    const payrollperiod = ref();

    const dataTable = ref();
    const loading = ref(true);

    const create = (props) => {
        emit('create',props);
    };

    const view = (props) => {
        emit('view',props);
    };

    const clearFilter = () => {
        emit('clearFilter');
    };

    onMounted(async() => {
        fetchData();
    });

    const fetchData =  async () => {
        console.log('called');
        let periods = await payrollperiod_store.getData();
        payrollperiod.value = periods.value;
        loading.value = false;
    };

    const showLoadingBanner = (value) => {
        loading.value = value;
    };

    const emit = defineEmits(['view','create','clearFilter']);

    const setTableData = (tableData) => {
      
        dataTable.value = tableData;
        loading.value = false;
    };

    const prepare = async (data) => {
        // console.log(data,'logs prapared');
        console.log(data.id);
        let respObj = await payrollperiod_store.prepareDTR(data.id);
        toast.add({ severity: 'success', summary: 'Success', detail: 'Employee DTR prepared.', life: 3000 });
       
    };

    defineExpose({  
        setTableData,
        showLoadingBanner
    });
</script>

<style>

</style>