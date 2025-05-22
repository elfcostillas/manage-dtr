<template>
    <DataTable v-model:editingRows="editingRows" v-model:filters="filters" editMode="row" :value="dataList" tableStyle="max-width:82rem;min-width:82rem;font-size:11pt;" dataKey="id"  
    @row-edit-save="onRowEditSave" scrollable scrollHeight="678px"  :globalFilterFields="['lastname', 'firstname', 'remarks2']" :loading="loading" >
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
        <Column style="width:8rem;text-align:right;" field="deductions" header="Cash Advance" >
            <template #body="{ data }">
                {{   Number(data.deductions).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="width:8rem;text-align:right;" field="canteen_bpn" header="BPN" >
            <template #body="{ data }">
                {{   Number(data.canteen_bpn).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="width:8rem;text-align:right;" field="canteen_bps" header="BPS" >
            <template #body="{ data }">
                {{   Number(data.canteen_bps).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
            <template #editor="{ data, field }">
               
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="width:8rem;text-align:right;" field="canteen_agg" header="AGG" >
            <template #body="{ data }">
                {{   Number(data.canteen_agg).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
            <template #editor="{ data, field }">
               
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column style="text-align:left;" field="remarks2" header="Remarks" >
            <template #editor="{ data, field }">
                <InputText v-model="data[field]" fluid />
            </template>
        </Column>
        <Column :rowEditor="true" style="width: 8rem; min-width: 8rem" bodyStyle="text-align:center"></Column>
        <ColumnGroup type="footer">
            <Row>
                <Column footer="Totals:" :colspan="2" footerStyle="text-align:right" />
                <Column style="text-align:right" :footer="bpn_canteen" />
                <Column style="text-align:right" :footer="bps_canteen" />
                <Column style="text-align:right" :footer="agg_canteen" />
                <Column :colspan="2" ></Column>
 
            </Row>
        </ColumnGroup>
    </DataTable>
    <Toast></Toast>
</template>
<script setup>
    import { computed, onMounted, ref } from 'vue';
    import { FilterMatchMode } from '@primevue/core/api';
    import { useToast } from 'primevue/usetoast';
    import { useCanteenDeduction } from '@/stores/canteen';

    const toast = useToast();
    const dataList = ref();
    const canteen_store = useCanteenDeduction();
    const editingRows = ref([]);
    const loading = ref(true);

    const filters = ref({
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    
    const onRowEditSave = async (event) => {
        let { newData, index } = event;
        dataList.value[index] = newData;

        let respObj = await canteen_store.save(newData);

        if(respObj.status == 'success'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }else{
            toast.add({ severity: 'error', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
        }
    };

    const bpn_canteen = ref(0.00);
    const bps_canteen = ref(0.00);
    const agg_canteen = ref(0.00);

    const computeTotals = () => {
        let bpn_total = 0;
        let bps_total = 0;
        let agg_total = 0;

        if(dataList.value != null){
            for(let row of dataList.value){
                bpn_total += Number(row.canteen_bpn);
                bps_total += Number(row.canteen_bps);
                agg_total += Number(row.canteen_agg);
            }

            bpn_canteen.value = Number(bpn_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2});
            bps_canteen.value = Number(bps_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2});
            agg_canteen.value = Number(agg_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2});

        }
    };


    onMounted(async() => {

    });

    const setData = async (data) => {
        dataList.value = await data;
        computeTotals();
        loading.value = false;
    }

    const setLoading = async () => {
        loading.value = true;
    }

    defineExpose({
        setData,
        setLoading
    });


</script>
