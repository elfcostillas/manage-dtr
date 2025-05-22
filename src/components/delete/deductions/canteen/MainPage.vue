<template>
    <div class="flex gap-2 justify-center">
        <div class="flex-none">
            <DynamicList :style="`font-size:${fontsize};width:16rem;`" ref="payperiodList" @filter="fnReloadByPeriod" />
        </div>
        <div class="flex-none">
            <Card style="width:auto;">
                <template #title>Canteen Deductions ({{ label }})</template>
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
    import DynamicList from '../common/DynamicList.vue';
    import DynamicEditableTable from '../common/DynamicEditableTable.vue';
    import { useCanteenDeduction } from '@/stores/canteen';

    const payrollperiod_store = usePayrolPeriod();

    const canteen_store = useCanteenDeduction();

    const payperiodList = ref();
    const selectedPeriod = ref();
    const canteen_list = ref();

    const mainTable = ref();

    onMounted(async()=> {
        let periods =  await payrollperiod_store.getPayrollPeriods();
        payperiodList.value.setData(periods.value);

        let mainList = await canteen_store.canteen_by_period(0);
        canteen_list.value = mainList.value;

        mainTable.value.setData(mainList.value);
    });

    const fnReloadByPeriod = async (period) => {
        selectedPeriod.value = period;
        
        if(selectedPeriod.value != null){
            mainTable.value.setLoading();

            let mainList = await canteen_store.canteen_by_period(selectedPeriod.value);
            canteen_list.value = mainList.value;
            mainTable.value.setData(mainList.value);
        }

    };

</script>

<style>

</style>