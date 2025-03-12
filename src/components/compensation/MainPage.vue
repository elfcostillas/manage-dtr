<template>
    <div class="flex gap-2 justify-center">
        <div class="flex-none">
            <DynamicList :style="`font-size:${fontsize};width:16rem;`" ref="payperiodList" @filter="fnReloadByPeriod" />
        </div>
        <div class="flex-none">
            <Card style="width:auto;">
                <template #title>Other Income / Retro Pay ({{ label }})</template>
                <template #content>
                    <DynamicEditableTable ref="mainTable" />
                </template>
            </Card>
        </div>
    </div>
</template>

<script setup>

    import { onMounted, ref } from 'vue';

    import { usePayrolPeriod } from '@/stores/payrollperiod';
    import { useCompensationStore } from '@/stores/compensation';
    import DynamicList from '../deductions/common/DynamicList.vue';
    import DynamicEditableTable from '@/assets/common/DynamicEditableTable.vue';

    const fontsize = ref(10);

    const payrollperiod_store = usePayrolPeriod();
    const compensation_store = useCompensationStore();

    const payperiodList = ref();
    const selectedPeriod = ref();
    const compensation_list = ref();

    const label = ref('');

    const mainTable = ref();

    onMounted(async()=> {
        let periods =  await payrollperiod_store.getPayrollPeriods();
        payperiodList.value.setData(periods.value);

        let mainList = await compensation_store.compensations_by_period(0);
        compensation_list.value = mainList.value;

        mainTable.value.setData(mainList.value);
    });

    const fnReloadByPeriod = async (period) => {
        selectedPeriod.value = period;

        if(selectedPeriod.value != null){
            mainTable.value.setLoading();

            let mainList = await compensation_store.compensations_by_period(selectedPeriod.value);
            compensation_list.value = mainList.value;
            mainTable.value.setData(mainList.value);
        }
    };

</script>

<style>

</style>