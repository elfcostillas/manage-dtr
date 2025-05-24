<template>
     <div class="flex gap-2 justify-center">
        <div class="flex-none">
            <DynamicList ref="payperiodList" @listSelected="setSelectedPeriod" ></DynamicList>
        </div>
        <div class="flex-none">
            <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="setSelectedEmployee" ref="empList" ></EmployeeList>
        </div>
        <div class="flex-none">
            <TablePage ref="dtrTable" ></TablePage>
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
    import { useManageDTRStore } from '@/stores/manage-dtr';

    const payrollperiod_store = usePayrollPeriodStore();

    const payrollperiod = ref();
    const empList = ref();
    const activeTab = ref(); 
    const employee_store = useEmployeeStore();
    const payperiodList = ref();

    const dtr_store = useManageDTRStore();

    const active_employees = ref();
    const inactive_employees = ref();

    const selectedPeriod = ref();
    const selectedEmployee = ref();
    const dtrTable = ref();

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

    const viewEmployeeDTR = async () => {
        // console.log(selectedPeriod.value,selectedEmployee.value);
        let data = await dtr_store.getDTRData(selectedPeriod.value,selectedEmployee.value);

    };

    const setSelectedPeriod = (period_id) => {
        selectedPeriod.value = period_id;
        if(selectedPeriod.value != null && selectedEmployee.value!= null){
            viewEmployeeDTR();
        }
    };

    const setSelectedEmployee = (emp_id) => {
        selectedEmployee.value = emp_id;
        if(selectedPeriod.value != null && selectedEmployee.value!= null){
            viewEmployeeDTR();
        }
    };

</script>

<style></style>