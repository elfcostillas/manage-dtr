<template>
 <div class="flex gap-2 justify-center">
    <div class="flex-none">
        <DynamicList ref="payperiodList" @listSelected="setSelectedPeriod" ></DynamicList>
    </div>
    <div class="flex-none">
        <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="setSelectedEmployee" ref="empList" ></EmployeeList>
    </div>
    <div class="flex-none">
        <Card style="height: 50rem;">
            <template #title>Biometric Logs</template>
            <template #content>
                <DataTable :value="rawLogs" paginator :rows="9" :loading="loading" @row-edit-save="onRowEditSave"
                    v-model:editingRows="editingRows" editMode="row"
                    :rowStyle="fnBackGround" scrollable scrollHeight="50rem" 
                    style="width: 48rem;"
                >
                    <template #loading> Loading raw logs. Please wait. </template>
                    <Column style="width:8rem;max-width:8rem" header="Date" field="punch_date" >
                        <template  #body="slotProps">
                            {{ (slotProps.data.punch_date) ? format(slotProps.data.punch_date,"MM/dd/yyyy") : '' }}
                              <!-- {{ slotProps.data.punch_date }} -->
                        </template>
                    </Column>
                    <Column style="min-width:8rem;max-width:8rem" header="Clock In" field="punch_time" ></Column>
                    <Column style="min-width:8rem;max-width:8rem" header="State" field="cstate" ></Column>
                    <Column style="min-width:8rem;max-width:8rem" header="New State" field="new_cstate" >
                        <template #editor="{ data, field }">
                            <Select style="width:7rem" v-model="data[field]" :options="cstates" optionLabel="label" optionValue="id" placeholder="Select" ></Select>
                        </template>
                    </Column>
                    <Column :rowEditor="true" style="min-width:12rem" bodyStyle="text-align:center"></Column>
                </DataTable>
            </template>
        </Card>
    </div>

    
</div>
</template>
<script setup>
    import { ref,onMounted } from 'vue';
    import { format } from 'date-fns';
    import DynamicList from '@/components/common/DynamicList.vue';
    import EmployeeList from '@/components/common/EmployeeList.vue';
    import { useEmployeeStore } from '@/stores/employee';
    import { usePayrollPeriodStore } from '@/stores/payrollperiod';
    import { useManageDTRStore } from '@/stores/manage-dtr';
    import { useToast } from 'primevue/usetoast';
    
    const toast = useToast();
    
    const editingRows = ref([]);

    const payperiodList = ref();
    const payrollperiod = ref();

    const rawLogs = ref();
    
    const payrollperiod_store = usePayrollPeriodStore();
    const employee_store = useEmployeeStore();
    const empList = ref();
    const dtr_store = useManageDTRStore()

    const selectedPeriod = ref();
    const selectedEmployee = ref();
    const loading = ref(false);

    const cstates = [
        { id : 'C/In', label : 'C/In' },
        { id : 'C/Out', label : 'C/Out' },
        { id : 'OT/In', label : 'OT/In' },
        { id : 'OT/Out', label : 'OT/Out' },
        { id : 'B/In', label : 'B/In' },
        { id : 'B/In', label : 'B/In' },
        { id : 'OT/InAM', label : 'OT/InAM' },
        { id : 'OT/OutAM', label : 'OT/OutAM' },
    ];

    onMounted(async() => {
        let periods = await payrollperiod_store.getList();
        payrollperiod.value = periods.value;

        let employees = await employee_store.getEmployeeList();
        empList.value.setNames(employees);

        payperiodList.value.setData(payrollperiod.value);
    });

    const onRowEditSave = async (event) => {
        let { newData, index } = event;
        rawLogs.value[index] = newData;

        let respObj = await dtr_store.updateRawLog(newData);

        console.log(respObj);

        if(respObj.status == 'success'){
            toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
            viewEmployeeDTR();
        }else{
            toast.add({ severity: 'error', summary: 'Error', detail: 'Error occured.', life: 3000 });
        }

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

    const viewEmployeeDTR = async () => {
        // console.log(selectedPeriod.value,selectedEmployee.value);
        loading.value = true;
        let data = await dtr_store.getRawLogs(selectedPeriod.value,selectedEmployee.value);
        // console.log(data.value.raw_logs)
        rawLogs.value = data.value.raw_logs;
        loading.value = false;
    };

    const fnBackGround = (type) => {
   
        let style = null;
        
        switch(type.hol_code){
            case 'reghol' :
                style = 'background-color:#40FF40'; // #00C000
            break;

            case 'sphol' :
                style = 'background-color:#FFFF8F'; // #FFEA00
            break;

            case 'dblreghol' :
                style = 'background-color:#00C000'; // #
            break;

            case 'dblsphol' :
                style = 'background-color:#FFEA00'; // #
            break;
        }

        return style;
    }

</script>
<style>

</style>