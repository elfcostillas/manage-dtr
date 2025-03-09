<template>
    <div class="flex gap-2" >
        <div class="flex-none">
            <DynamicList :style="`font-size:${fontsize};width:16rem;`" ref="deductionTypeList" @filter="fnReloadByDedType" />
        </div>
        <div class="flex-none">
            <DynamicList :style="`font-size:${fontsize};width:16rem;`" ref="empList" @filter="fnReloadByEmployee" />
        </div>
        <div class="flex-none">
            <Card style="width:auto;">
                <template #title>Deductions - Installments</template>
                <template #content>
                    <DynamicTable @view=viewRow @create=showForm @clearFilter=clearFilter ref="mainTable" />
                </template>
            </Card>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Loan Details" :style="{ width: '64rem' }">
        <Toolbar>
            <template #start>
                <Button @click="save" icon="pi pi-save" severity="primary" label="Save" class="mr-3" />
            </template>

            <template #center></template>
            <template #end></template>
        </Toolbar>
        <div class="grid grid-cols-6 gap-4 mt-2">
            <div class="col-span-2">
                <label class="" for="employee_name"> Employee Name </label>
                <Select v-model="form.emp_id" filter :options="employees" optionLabel="label" optionValue="id" placeholder="Select an employee" class="w-full mt-1" />
            </div>
            <div style="" class="col-span-2">
                <label> Start of Deduction </label>
                <Select v-model="form.period_id" :options="payrollperiod" optionLabel="label" optionValue="id" placeholder="Select payroll period" class="w-full mt-1" />
            </div>
            <div class="col-span-2">
                <label> Type of Deduction </label>
                <Select v-model="form.deduction_type" filter :options="deductiontypes" optionLabel="label" optionValue="id" placeholder="Select type" class="w-full mt-1" />
            </div>
            <div style="" class="col-span-2">
                <label> Amount </label>
                <InputNumber v-model="form.total_amount" @blur="computeAmmortization" inputId="total_amount" locale="en-US" :maxFractionDigits="2" :minFractionDigits="2"  class="w-full mt-1" fluid />
            </div>
            <div style="" class="col-span-1">
                <label> Terms </label>
                <InputNumber v-model="form.terms" @blur="computeAmmortization" inputId="terms" locale="en-US" :maxFractionDigits="0" class="w-full mt-1" fluid  />
            </div>
            <div style="" class="col-span-2">
                <label> Ammortization </label>
                <InputNumber v-model="form.ammortization" inputId="ammortization" locale="en-US" :maxFractionDigits="2" :minFractionDigits="2" class="w-full mt-1" fluid  />
            </div>
            <div style="" class="col-span-1">
                <label> Stop </label>
                <Select v-model="form.is_stopped" :options="isStoped" optionLabel="name" optionValue="value"  placeholder="" class="mt-1" fluid />
            </div>
            <div style="" class="col-span-6">
                <label> Remarks </label>
                <InputText type="text" v-model="form.remarks" fluid class="mt-1" />
            </div>

           
        </div>
    </Dialog>
    <Toast></Toast>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>

    import { onMounted, ref } from 'vue';
    import { useEmployeeStore } from '@/stores/employee';
    import { useDeductionTypeStore } from '@/stores/deductiontype';
    import { useDeductionStore } from '@/stores/deductions';
    import { usePayrolPeriod } from '@/stores/payrollperiod';
    import { showEmpty } from '@/assets/composables/showEmpty';

    const fontsize = ref(10);

    import DynamicList from '../common/DynamicList.vue';
    import DynamicTable from '../common/DynamicTable.vue';

    import { useToast } from 'primevue/usetoast';
    import { useConfirm } from "primevue/useconfirm";

    const toast = useToast();
    const confirm = useConfirm();

    const selectedStop = ref();

    const selectedFromList = ref({
        employee : 'ALL',
        type : 'ALL'
    });

    const form = ref();

    const isStoped = ref([
        { name: 'No', value: 'N' },
        { name: 'Yes', value: 'Y' },
    ]);

    /****  local variables ****/
    const employees = ref();
    const deductiontypes = ref();
    const payrollperiod = ref();
    /*************************/


    const selectedEmployee = ref();
    const selectedType = ref();
    const selectdPayrollPeriod = ref();

    const visible = ref(false);

    const employee_store = useEmployeeStore();
    const deductiontype_store = useDeductionTypeStore();
    const deduction_store = useDeductionStore();
    const payrollperiod_store = usePayrolPeriod();

    const empList  = ref(); //ref to EmpList component
    const deductionTypeList  = ref(); //ref to deductionType component
    const mainTable = ref(); // ref to main table

    /*DataTable values*/
    
    const tableData = ref();
    const colHeader = ref();

    const viewed = ref();

    const loadTable = async () => {
        let deduction = await deduction_store.getDeductionList(selectedFromList.value.employee,selectedFromList.value.type);
        let cols = await deduction_store.getTableHeaders();

        tableData.value = deduction.value;
        colHeader.value = cols.value;

        mainTable.value.setData(tableData.value,colHeader.value);

    }

    onMounted(async () => {

        clearForm();

        let data = await employee_store.getEmployees();
        let types = await deductiontype_store.getDeductionTypes();
     
        let periods =  await payrollperiod_store.getPayrollPeriods();

        loadTable();

        /* set ref components data/values */
        empList.value.setData(data.value);
        deductionTypeList.value.setData(types.value);

        /* local */
        employees.value = data.value;
        deductiontypes.value = types.value;
        payrollperiod.value = periods.value;
        
    });

    const computeAmmortization = () => {
      
        if( (form.value.total_amount != null && form.value.total_amount != undefined && form.value.total_amount > 0 ) && (form.value.terms != null && form.value.terms != undefined && form.value.terms > 0 ) )
        {
            form.value.ammortization = form.value.total_amount / form.value.terms;
        }
    };

    const save = async () => {

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
                label: 'Save'
            },
            accept: async () => {
                let error = showEmpty(form.value);
             
                if(typeof(error)==='object'){
                    toast.add(error);
                }else{
                    let respObj = await deduction_store.postDeduction(form.value);
                    // console.log(typeof(respObj),respObj);
                    if(respObj.status == 'success'){
                        toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
                        await reloadTable();
                        closeAfterSave();

                    }else{
                       // work on error
                    }

                }

            },
            reject: () => {
                // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    };

    const closeAfterSave = () => {
        setTimeout(() => { 
            clearForm();
            visible.value = false; 
        }, 1500);
    };

    const fnReloadByEmployee = async (employee) => {
        selectedFromList.value.employee = employee;

        let deduction = await deduction_store.getDeductionList(selectedFromList.value.employee,selectedFromList.value.type);
        tableData.value = deduction.value;
        reloadTable();
    }

    const fnReloadByDedType =  async (type) => {
        selectedFromList.value.type = type;

        let deduction = await deduction_store.getDeductionList(selectedFromList.value.employee,selectedFromList.value.type);
        tableData.value = deduction.value;
        reloadTable();
    }

    const clearFilter = async () => {
        selectedFromList.value.employee = 'ALL';
        selectedFromList.value.type = 'ALL';

        let deduction = await deduction_store.getDeductionList(selectedFromList.value.employee,selectedFromList.value.type);
        tableData.value = deduction.value;
        reloadTable();

    };

    const reloadTable = async () => {
        let deduction = await deduction_store.getDeductionList(selectedFromList.value.employee,selectedFromList.value.type);
        tableData.value = deduction.value;
        mainTable.value.setData(tableData.value,colHeader.value);
    };

    const viewRow = async(props) => {
        viewed.value = props;
        visible.value = true;

        const keys = Object.keys(form.value);

        for (let index of keys) {
            form.value[index] = viewed.value[index];
        }
    }

    
    const showForm = async() => {
        clearForm();
        visible.value = true;
    }

    const clearForm = () => {
            form.value = {
            id : null,
            terms : 0,
            total_amount : 0.00,
            ammortization : 0.00,
            remarks : '',
            is_stopped : 'N',
            deduction_type : null,
            period_id : null,
            emp_id : null
        };
    }




</script>

<style>

</style>