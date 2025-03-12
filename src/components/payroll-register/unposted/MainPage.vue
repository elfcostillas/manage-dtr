<template>

    <Card style="width: 26rem; margin:1rem auto;font-size:10pt;" >
        <template #title>Payroll Register - Unposted</template>
        <template #content>
            <div class="grid grid-cols-1 gap-3">
                <div class="colspan-1">
                    <label for=""> Select payroll period </label>
                    <Select v-model="selectedPeriod" :options="period" optionLabel="label" optionValue="id" class="mt-1" fluid> </Select>
                </div>
                <div class="colspan-1" style="text-align: center;">
                    <Button @click="process" class="mx-2 min-w-32" icon="pi pi-spinner-dotted" label="Compute" > </Button>
                    <Button @click="view" class="mx-2 min-w-32" icon="pi pi-folder-open" label="View" > </Button>
                </div>
            </div>
        </template>
    </Card>
    
    <Dialog v-model:visible="visible" class="w-full h-full" :header="`Payroll Register`">
        <PayRegTable ref="mainTable" class="w-full">  </PayRegTable>
    </Dialog>
</template>

<script setup>

    import { onMounted, ref } from 'vue';
    import { usePayRegUnposted } from '@/stores/payreg-unposted';
    import PayRegTable from '@/components/deductions/common/PayRegTable.vue';

    const selectedPeriod = ref();

    const payreg_store = usePayRegUnposted();

    const period = ref();
    const periodLabel = ref();

    const visible = ref(false);

    const dataTables = ref();
    const dataColumns = ref();
    const mainTable = ref();

    const installmentColumns = ref();
    const govLoanColumns = ref();

    onMounted(async () => {
        let periods = await payreg_store.getPayrollPeriods();
        period.value = periods.value;
    });

    const process = async () => {

        if(selectedPeriod.value != undefined)
        {
            visible.value = true;

            let resp = await payreg_store.processPayroll(selectedPeriod.value);
          
            dataTables.value = resp.value.table;
            dataColumns.value = resp.value.cols;
            installmentColumns.value = resp.value.installment_cols;
            govLoanColumns.value = resp.value.loans_cols;

            mainTable.value.setData(dataTables.value,dataColumns.value,installmentColumns.value,govLoanColumns.value);

            
        }
        

        
    };

</script>

<style scoped>
    * {
        font-size : 10pt;
    }
</style>