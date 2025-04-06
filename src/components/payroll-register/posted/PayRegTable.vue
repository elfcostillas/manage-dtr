<template>
     <Toolbar>
        <template #start>
            <Button icon="pi pi-file-excel" @click="downloadExcel" class="mr-2" severity="success" label="Excel" /> 
            <Button icon="pi pi-file-pdf" @click="downloadPDF" class="mr-2" severity="danger" label="PDF" /> 
            <Button icon="pi pi-save" @click="postPayroll" class="mr-2" severity="info" label="POST" /> 
        </template>
    </Toolbar>
    <DataTable v-model:selection="selectedRow" :value="datatable" tableStyle="font-size:11pt;" scrollable scrollHeight="65vh" selectionMode="multiple" :loading="loading">
        <template #loading> Processing. Please wait. </template>
        
        <Column field="dept_name" header="Department" frozen headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:left;" style="min-width:10rem;">
            <template #body="{ data }">
                {{  data.dept_name }}
            </template>
        </Column>
        <Column field="job_title_name" header="Job Title" frozen headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:left;" style="min-width:10rem;">
            <template #body="{ data }">
                {{  data.job_title_name }}
            </template>
        </Column>
        <Column field="employee_name" header="Name" frozen headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:left;" style="min-width:12rem;">
            <template #body="{ data }">
                {{  data.employee_name }}
            </template>
        </Column>

        <Column v-for="col in columns" :key="col.id" :field="col.col_value" :header="col.col_name" :style="`color:${col.color};min-width:${col.width};text-align:${col.alignment};`" headerStyle="text-align:center;" bodyStyle="font-size:9pt" >
            <template #body="{ data }">
                {{  (col.data_type == 'number_formated') ? ((data[col.col_value] > 0) ? Number(data[col.col_value]).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '') : data[col.col_value] }}
            </template>
        </Column>

        <Column field="retro_pay" header="Retro Pay" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{  (data.retro_pay > 0) ? Number(data.retro_pay).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>

        <Column field="earnings" header="Other Earnings" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{  (data.earnings > 0) ? Number(data.earnings).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>

        <Column field="gross_total" header="Gross Pay" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{   Number(data.gross_total).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) }}
            </template>
        </Column>

        <Column field="hdmf_contri" header="HDMF Contri" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{ (data.hdmf_contri > 0) ?  Number(data.hdmf_contri).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>
        <Column field="sss_prem" header="SSS Prem" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{ (data.sss_prem > 0) ?  Number(data.sss_prem).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>
        <Column field="phil_prem" header="Phil Contri" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{ (data.phil_prem > 0) ?  Number(data.phil_prem).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>

        <Column field="canteen" header="Canteen" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
               {{ (data.canteen > 0) ?  Number(data.canteen).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>
        <Column field="ca" header="Cash Advance" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{ (data.ca > 0) ?  Number(data.ca).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : '' }}
            </template>
        </Column>
        <!-- 
        <Column field="canteen_bps" header="Canteen (BPS)" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{   Number(data.canteen_bps).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})}}
            </template>
        </Column>

        <Column field="canteen_agg" header="Canteen (AGG)" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{   Number(data.canteen_agg).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})    }}
            </template>
        </Column> -->
        <Column v-for="col in installments_col" :key="col.id" :field="col.col_value" :header="col.col_name" headerStyle="text-align:center;" bodyStyle="font-size:9pt;text-align:right;min-width: 8rem;" >
            <template #body="{ data }">
                    {{ (isNaN(data.deductions[col.col_value])) ? '' :  Number(data.deductions[col.col_value]).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
        </Column>

        <Column v-for="col in loans_cols" :key="col.id" :field="col.col_value" :header="col.col_name" headerStyle="text-align:center;" bodyStyle="font-size:9pt;text-align:right;min-width: 8rem;" >
            <template #body="{ data }">
                    {{ (isNaN(data.gov_loans[col.col_value])) ? '' :  Number(data.gov_loans[col.col_value]).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
        </Column>

        <Column field="total_deduction" header="Total Deduction" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{   Number(data.total_deduction).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})    }}
            </template>
        </Column>
        <Column field="net_pay" header="Net Pay" headerStyle="text-align:center;font-size:11pt;color:black;" bodyStyle="font-size:9pt;text-align:right;" style="min-width:8rem;">
            <template #body="{ data }">
                {{ Number(data.net_pay).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2})  }}
            </template>
        </Column>
        <template #footer> {{ datatable ? datatable.length : 0 }} employees. </template>
    </DataTable>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
    import { exportExcelFN } from '@/assets/composables/export';
    import { computed, onMounted, ref } from 'vue';
    import { base_url } from '@/components/api/url';
    // import { useConfirm } from 'primevue';
    import { useConfirm } from "primevue/useconfirm";
    import { usePayRegUnposted } from '@/stores/payreg-unposted';
    const payreg_store = usePayRegUnposted();

    const confirm = useConfirm();

    const datatable = ref();
    const columns = ref();

    const selectedRow = ref();
    const loading = ref(true);
    const installments_col = ref();
    const loans_cols = ref();

    const selectedPeriod = ref();

    onMounted(async() => {

    });

    // const view = (props) => {
    //     emit('view',props);
    // };

    // const create = (props) => {
    //     emit('create',props);
    // };

    // const emit = defineEmits(['view','create','clearFilter']);

    const setData = (period,data,cols,installments,gov_loans) => {
        datatable.value = data;
        columns.value = cols;
        installments_col.value = installments;
        loans_cols.value = gov_loans;

        selectedPeriod.value = period;
        loading.value = false;
    }

    const clearFilter = () => {
        emit('clearFilter');
    };

    const downloadExcel = () => {
        console.log(selectedPeriod.value);

        let url = `payroll-register/unposted/excel/${selectedPeriod.value}`;
        exportExcelFN(url,'PayrollReister'+selectedPeriod.value +' - Unposted' );

        /*
             let url = `finance/aras/generate-xls/${bp}/${as_of}`;
        exportExcelFN(url,'AccountsReceivableAgingSchedule');*/

    };

    const downloadPDF = () => {
        
        let url = base_url + `/api/payroll-register/unposted/pdf/${selectedPeriod.value}`;
        window.open(url);
    };

    const postPayroll = () => {
       
        confirm.require({
            message: 'Are you sure you want to proceed?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Post'
            },
            accept: async () => {
               let respObj = await payreg_store.postPayroll(selectedPeriod.value);

            },
            reject: () => {
                // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }

    

    defineExpose({
        setData
    });
</script>

<style>

</style>