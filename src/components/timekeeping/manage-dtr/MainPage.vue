<template>
     <div class="flex gap-2 justify-center">
        <div class="flex-none">
            <DynamicList ref="payperiodList" ></DynamicList>
        </div>
        <div class="flex-none">
            <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="viewEmployeeDTR" ref="empList" ></EmployeeList>
        </div>
        <div class="flex-none">
            <TablePage></TablePage>
        </div>
    </div>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import EmployeeList from '@/components/common/EmployeeList.vue';
    import { useEmployeeStore } from '@/stores/employee';
    import DynamicList from '@/components/common/DynamicList.vue';
    import { usePayrollPeriodStore } from '@/stores/payrollperiod';
    import TablePage from './TablePage.vue';

    const payrollperiod_store = usePayrollPeriodStore();

    const payrollperiod = ref();
    const empList = ref();
    const activeTab = ref(); 
    const employee_store = useEmployeeStore();
    const payperiodList = ref();

    onMounted(async() => {
        let periods = await payrollperiod_store.getList();
        payrollperiod.value = periods.value;

        payperiodList.value.setData(payrollperiod.value);

        let employees = await employee_store.getEmployeeList();
        empList.value.setNames(employees);

        active_employees.value = employees.value.active;
        inactive_employees.value = employees.value.inactive;

        setActive();
    });

    const setInActive = () => {
        activeTab.value = inactive_employees.value;
    };

    const setActive = () => {
        activeTab.value = active_employees.value;
    };

    const viewEmployeeDTR = () => {

    };

</script>

<style></style>