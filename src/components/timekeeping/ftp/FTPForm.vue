<template>

    <Toolbar>
        <template #start>
            <Button @click="save" icon="pi pi-save" severity="primary" label="Save" class="mr-3" />
        </template>

        <template #center></template>
        <template #end></template>
    </Toolbar>
    <div class="grid grid-cols-4 gap-4 mt-2">
        <div class="col-span-2">
            <label for="employee_name"> Employee Name </label>
            <Select v-model="form.emp_id" filter :options="employees" optionLabel="label" optionValue="id" placeholder="Select an employee" class="w-full mt-1" />
        </div>
        <div class="col-span-1">
            <label for="employee_name"> FTP Type </label>
            <Select v-model="form.ftp_type" :options="ftp_type" optionLabel="label" optionValue="value" placeholder="Select FTP Type" class="w-full mt-1" />
        </div>
        <div class="col-span-1" >  
            <label for="employee_name"> FTP Date </label>
            <DatePicker v-model="form.ftp_date" class="w-full mt-1" showIcon iconDisplay="input" ></DatePicker> 
        </div>
        <div class="col-span-4" >
            <label for="employee_name"> Reason </label>
            <InputText v-model="form.ftp_reason" class="mt-1" fluid type="text" />
        </div>
        <div class="col-span-2" > 
            <Fieldset legend="Actual Clock-In "> 
                <DatePicker v-model="form.time_in_date" style="width:10rem" showIcon iconDisplay="input" dateFormat="mm/dd/yy" ></DatePicker> 
                <DatePicker v-model="form.time_in" class="ml-6" style="width:10rem" showIcon hourFormat="24" iconDisplay="input" timeOnly>
                    <template #inputicon="slotProps">
                        <i class="pi pi-clock" @click="slotProps.clickCallback" />
                    </template>
                </DatePicker> 
            </Fieldset> 
        </div>
        <div class="col-span-2" > 
            <Fieldset legend="Actual Clock-Out">
                <DatePicker v-model="form.time_out_date" style="width:10rem" showIcon iconDisplay="input" dateFormat="mm/dd/yy"></DatePicker> 
                <DatePicker v-model="form.time_out" class="ml-6" style="width:10rem" showIcon hourFormat="24" iconDisplay="input" timeOnly>
                    <template #inputicon="slotProps">
                        <i class="pi pi-clock" @click="slotProps.clickCallback" />
                    </template>
                </DatePicker> 
            </Fieldset> 
        </div>
        <div class="col-span-2" >
            <Fieldset legend="Actual OT Clock-In ">
                <DatePicker v-model="form.ot_in_date" style="width:10rem" showIcon iconDisplay="input" dateFormat="mm/dd/yy"></DatePicker> 
                <DatePicker v-model="form.ot_in" class="ml-6" style="width:10rem" showIcon hourFormat="24" iconDisplay="input" timeOnly>
                    <template #inputicon="slotProps">
                        <i class="pi pi-clock" @click="slotProps.clickCallback" />
                    </template>
                </DatePicker> 
            </Fieldset>
        </div>
        <div class="col-span-2" >
            <Fieldset legend="Actual OT Clock-Out">
                <DatePicker v-model="form.ot_out_date" style="width:10rem" showIcon iconDisplay="input" dateFormat="mm/dd/yy" ></DatePicker> 
                <DatePicker v-model="form.ot_out" class="ml-6" style="width:10rem" showIcon hourFormat="24" iconDisplay="input" timeOnly>
                    <template #inputicon="slotProps">
                        <i class="pi pi-clock" @click="slotProps.clickCallback" />
                    </template>
                </DatePicker> 
            </Fieldset>
        </div>
    </div>
    <Toast></Toast>
</template>

<script setup>
    import { ref } from 'vue';
    import { format } from 'date-fns';
    import { useToast } from "primevue/usetoast";

    import { useFTPStore } from '@/stores/ftp';

    const ftp_store = useFTPStore();

    const toast = useToast();

    const form = ref({
        id : null,
        emp_id : null,
        biometric_id : null,
        ftp_date : null,
        ftp_type : null,
        ftp_reason : null,
        created_by : null,
        created_on : null,
        time_in_date : null,
        time_in : null,
        time_out_date : null,
        time_out : null,
        ot_in_date : null,
        ot_in : null,
        ot_out_date : null,
        ot_out : null,
        ftp_status : null,
        isChecked : null,
    });

    const employees = ref();

    const ftp_type = ref([
        { label: "Official Business", value: "OB" },
        { label: "Personal Reason", value: "PR" }
    ]);

    const setEmployees = (emp) => {
        employees.value = emp;
    };

    

    const setFormData = (prop) => {
        Object.keys(prop).forEach(function(key,index) {
            // key: the name of the object key 
            // index: the ordinal position of the key within the object 
            if (form.value.hasOwnProperty(key)) { // prop[key] to access prop values
                if(key.includes('_date')){
                    // form.value[key] = (prop[key]) ?  format(prop[key],"MM/dd/yyyy") : null; 
                    if(prop[key]){
                        var arr = prop[key].split("-");
                        // console.log(key,prop[key],arr[0],arr[1],arr[2]);
                        form.value[key] = new Date(arr[0],arr[1]-1,arr[2]);
                    }
                }else{
                    if((key.includes('_in') || key.includes('_out')) && !key.includes('_date') ){
                       
                        if(prop[key]){
                            var time_arr = prop[key].split(":");
                            form.value[key] = new Date(0,0,0,time_arr[0],time_arr[1]);
                        }
                    }else{
                        form.value[key] = prop[key];
                    }
                    
                }
                

            }
     
        });

        // console.log(form.value);
    };

    defineExpose({  
        setEmployees,
        setFormData,
        // showLoadingBanner
    });

    const save = async() => {
        let formated_form = {};
        // formated_form = form.value;

        Object.keys(form.value).forEach(function(key,index) { 
            formated_form[key] = form.value[key];
        });

        console.log(form.value);

        // console.log(form.value.time_in_date,form.value.time_in_);

        formated_form.ftp_date = (form.value.ftp_date) ?  format(form.value.ftp_date,"MM/dd/yyyy") : null; 

        formated_form.time_in_date = (form.value.time_in_date) ?  format(form.value.time_in_date,"MM/dd/yyyy") : null; 
        formated_form.time_in = (form.value.time_in) ?  format(form.value.time_in,"HH:mm") : null; 

        formated_form.time_out_date = (form.value.time_out_date) ?  format(form.value.time_out_date,"MM/dd/yyyy") : null; 
        formated_form.time_out = (form.value.time_out) ?  format(form.value.time_out,"HH:mm") : null; 

        formated_form.ot_in_date = (form.value.ot_in_date) ?  format(form.value.ot_in_date,"MM/dd/yyyy") : null; 
        formated_form.ot_in = (form.value.ot_in) ?  format(form.value.ot_in,"HH:mm") : null; 

        formated_form.ot_out_date = (form.value.ot_out_date) ?  format(form.value.ot_out_date,"MM/dd/yyyy") : null; 
        formated_form.ot_out = (form.value.ot_out) ?  format(form.value.ot_out,"HH:mm") : null; 

       
        
        if(!hasErrors()){
            // toast.add({ severity: 'success', summary: 'Success', detail: '', life: 3000 });
            let resp = await ftp_store.save(formated_form);

            // console.log(resp.status);
            if(resp.status == 'success'){
                toast.add({ severity: 'success', summary: 'Success', detail: 'Saved successfully.', life: 3000 });
                emit("reload");
            }else{
                toast.add({ severity: 'error', summary: 'Error', detail: resp.message, life: 3000 });
            }
        }
    };

    const emit = defineEmits(['reload']);

    const hasErrors = () => {
        let error = false;
        let errorMsg = '';

        let set1 = false;
        let set2 = false;
        let set3 = false;
        let set4 = false;


        if(!form.value.emp_id){
            error = true;
            errorMsg += 'Please select Employee.\n';
        }

        if(!form.value.ftp_reason){
            error = true;
            errorMsg += 'Please input reason.\n';
        }

        if(!form.value.ftp_type){
            error = true;
            errorMsg += 'Please select FTP type.\n';
        }

        if(!form.value.ftp_date){
            error = true;
            errorMsg += 'Please select FTP Date.\n';
        }

        if((!form.value.time_in_date && form.value.time_in) || (form.value.time_in_date && !form.value.time_in)){
            error = true;
            errorMsg += 'Please input clock in date and clock in time.\n';
        }

        // if(!form.value.time_out_date || !form.value.time_out){
        if((!form.value.time_out_date && form.value.time_out) || (form.value.time_out_date && !form.value.time_out)){
            error = true;
            errorMsg += 'Please input clock out date and clock out time.\n';
        }

        // if(!form.value.ot_in_date || !form.value.ot_in){
        if((!form.value.ot_in_date && form.value.ot_in) || (form.value.ot_in_date && !form.value.ot_in)){
            error = true;
            errorMsg += 'Please input OT clock in date and OT clock in time.\n';
        }

        // if(!form.value.ot_out_date || !form.value.ot_out){
        if((!form.value.ot_out_date && form.value.ot_out) || (form.value.ot_out_date && !form.value.ot_out)){
            error = true;
            errorMsg += 'Please input OT clock out date and OT clock out time.\n';
        }

        if(form.value.time_in_date && form.value.time_in)
        {
            set1 = true;
        }

        if(form.value.time_out_date && form.value.time_out)
        {
            set2 = true;
        }

        if(form.value.ot_in_date && form.value.ot_in)
        {
            set3 = true;
        }

        if(form.value.ot_out_date && form.value.ot_out)
        {
            set4 = true;
        }

        if(!set1 && !set2 && !set3 && !set4){
            error = true;
            errorMsg += 'Please fill in atleast (1) date and time.\n';
        }

        if(error){
            toast.add({ severity: 'error', summary: 'Error Message', detail: errorMsg, life: 3000 });
        }
        
        return error;
    };

</script>

<style>

</style>