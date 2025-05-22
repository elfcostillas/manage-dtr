<template>
    <!-- <Card style="background-color: #FAF9F6;">
        <template #title>

        </template>
        <template #content> -->
            <div class="flex gap-2 justify-center">
                <div class="flex-none">
                    <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="viewFTPByEmp" ref="empList" ></EmployeeList>
                </div>
                <div class="flex-none">
                    <DynamicTable ref="ftpTableRef" @view=viewRow @create=showForm @clearFilter=clearFilter></DynamicTable>
                </div>
            </div>

            <Dialog v-model:visible="visible" modal header="FTP Form" :style="{ width: '54rem' }">
                <FTPForm ref="ftpRef" @reload="reloadTable"></FTPForm>
            </Dialog>
<!--            
        </template>
    </Card> -->
</template>

<script setup>
    import EmployeeList from '@/components/common/EmployeeList.vue';
    import { useEmployeeStore } from '@/stores/employee';
    import { useFTPStore } from '@/stores/ftp';
    import DynamicTable from '@/components/common/DynamicTable.vue';
    import FTPForm from './FTPForm.vue';

    import { ref,onMounted } from 'vue';

    const visible = ref(false);
    const ftpRef = ref();
    const ftpTableRef = ref();

    const employee_store = useEmployeeStore();
    const ftp_store = useFTPStore();

    const empList = ref();
    const ftpList = ref();

    const active_employees = ref();
    const inactive_employees = ref();
    const selectedEmployee = ref();

    const activeTab = ref(); // holds employee list base on active tab
    
    const reloadTable = async () => {
        let value = (selectedEmployee.value) ? selectedEmployee.value : 0;
        await getFTPList(value);
        ftpTableRef.value.setTableData(ftpList.value);
    };

    onMounted(async () => {

        let employees = await employee_store.getEmployeeList();

        empList.value.setNames(employees);
        await getFTPList(0); // read FTP

        active_employees.value = employees.value.active;
        inactive_employees.value = employees.value.inactive;

        setActive();
        ftpTableRef.value.setTableData(ftpList.value);
    });

    const getFTPList = async (emp_id) => {
        let ftp = await ftp_store.getList(emp_id);
        ftpList.value = ftp.value;
    }

    const setInActive = () => {
        // console.log('active');
        // ftpRef.value.setEmployees(inactive_employees.value);
        activeTab.value = inactive_employees.value;

    };

    const setActive = () => {
        // console.log('in active');
        // ftpRef.value.setEmployees(active_employees.value);
        activeTab.value = active_employees.value;
    };

    const clearFilter = () => {};

    const viewFTPByEmp = async (emp_id) => {
       
        if(emp_id != null){  
            await ftpTableRef.value.showLoadingBanner(true);
            await getFTPList(emp_id);
            ftpTableRef.value.setTableData(ftpList.value);
            await ftpTableRef.value.showLoadingBanner(false);

            selectedEmployee.value = emp_id;
        }
      
    };

    const viewRow = async (props) => {
        // console.log(props,props.id);
        await showDialog();
        await ftpRef.value.setEmployees(activeTab.value);
        await ftpRef.value.setFormData(props);
    };

    const showForm = async () => {
       await showDialog();
       await ftpRef.value.setEmployees(activeTab.value);
       
    };

    const showDialog = () => {
        visible.value = true;
    };


</script>

<style>

</style>