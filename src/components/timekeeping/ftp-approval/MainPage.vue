<template>
   <div class="flex gap-2 justify-center">
        <div class="flex-none">
            <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="viewFTPByEmp" ref="empList" ></EmployeeList>
        </div>
        <div class="flex-none">
            <TablePage @reload="reloadTable" ref="ftpTableRef" ></TablePage>
        </div>
    </div>
</template>

<script setup>
    import TablePage from './TablePage.vue';
    // import DynamicTable from '@/components/common/DynamicTable.vue';
    import EmployeeList from '@/components/common/EmployeeList.vue';
    import { useEmployeeStore } from '@/stores/employee';
    import { ref,onMounted } from 'vue';
    import { useFTPApprovalStore } from '@/stores/ftp-approval';

    const empList = ref();
    const ftpList = ref();
    const ftp_store = useFTPApprovalStore();

    const active_employees = ref();
    const inactive_employees = ref();
    const selectedEmployee = ref();
    const ftpTableRef = ref();

    const employee_store = useEmployeeStore();
    const activeTab = ref(); 

    onMounted(async() => {
        let employees = await employee_store.getEmployeeList();

        empList.value.setNames(employees);
        await getFTPList(0);

        active_employees.value = employees.value.active;
        inactive_employees.value = employees.value.inactive;

        setActive();
        ftpTableRef.value.setTableData(ftpList.value);
    });

    const setInActive = () => {
        activeTab.value = inactive_employees.value;
    };

    const setActive = () => {
        activeTab.value = active_employees.value;
    };

    const getFTPList = async (emp_id) => {
        let ftp = await ftp_store.getList(emp_id);
        ftpList.value = ftp.value;
    }

    const reloadTable = async () => {
        let value = (selectedEmployee.value) ? selectedEmployee.value : 0;
        await getFTPList(value);
        ftpTableRef.value.setTableData(ftpList.value);
    };

    const viewFTPByEmp = async (emp_id) => {
         if(emp_id != null){  
            await ftpTableRef.value.showLoadingBanner(true);
            await getFTPList(emp_id);
            ftpTableRef.value.setTableData(ftpList.value);
            await ftpTableRef.value.showLoadingBanner(false);

            selectedEmployee.value = emp_id;
        }
    }

</script>

<style>
    
</style>