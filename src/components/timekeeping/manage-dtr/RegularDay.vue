<template>
     <Toolbar>
        <template #start>
            <Button icon="pi pi-calculator" @click="computeLogs" class="mr-2" severity="secondary" label="Compute" /> 
            <Button icon="pi pi-list" @click="showLogs" class="mr-2" severity="secondary" label="Show Logs" /> 
            <Button icon="pi pi-download" @click="drawLogs" class="mr-2" severity="secondary" label="Draw Logs" /> 
        </template>
        <template #center ></template>
        <template #end ></template>
    </Toolbar>
    <DataTable :value="dataTable" :rowStyle="fnBackGround" scrollable scrollHeight ="36rem" style="font-size: 10pt;" :loading="loading">
        <template #loading> Processing. Please wait. </template>
        <template #empty > <div style="text-align: center;">  No records found. </div> </template>
        <Column field="" header="Week Day">
            <template #body="slotProps">
                <div style="text-align:center;">
                    {{ (slotProps.data.dtr_date) ? format(slotProps.data.dtr_date,"EEE") : ''  }}
                </div>
            </template>
        </Column>
        <Column field="" header="Date" >
            <template #body="slotProps">
                <div style="text-align:center;">
                    {{ (slotProps.data.dtr_date) ? format(slotProps.data.dtr_date,"MM/dd/yyyy") : ''  }}
                </div>
            </template>
        </Column>
        <Column header="Schedule">
            <template #body="slotProps">
                {{ slotProps.data.sched_time_in }}-{{ slotProps.data.sched_time_out }}
            </template>
        </Column>
        <Column field="time_in" header="Time In"></Column>
        <Column field="time_out" header="Time Out"></Column>
        <Column field="ot_in" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
               Time In <br> (Over Time)
            </template>
        </Column>
        <Column field="ot_out" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
                Time Out <br> (Over Time)
            </template>
        </Column>

        <Column field="" header="Work Hours"></Column>
        <Column field="" header="Day"></Column>
        <Column field="late" header="Late">
            <template #body="slotProps">
                {{ (slotProps.data.late > 0) ? 1 : '' }}
            </template>
        </Column>
        <Column field="" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
                Night Diff <br> (Hrs)
            </template>
        </Column>
        <Column field="" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
                Over Time <br> (Hrs)
            </template>
        </Column>

    </DataTable>
    <ConfirmDialog></ConfirmDialog>
    <Toast></Toast>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import { format } from 'date-fns';
    import { useManageDTRStore } from '@/stores/manage-dtr';
    import { useToast } from 'primevue/usetoast';
    import { useConfirm } from 'primevue';

    const confirm = useConfirm();

    const toast = useToast();
    const dtr_store = useManageDTRStore();

    const props = defineProps(['data']);
    
    const computeLogs = () => {
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
                label: 'Compute'
            },
            accept: async () => {
                await dtr_store.computeLogs();
                emit('reloadLogs')

            },
            reject: () => {
              
            }
        });
    };

    const emit =  defineEmits(['showLogs','reloadLogs']);

    const drawLogs = async () => {
        // console.log(dtr_store.selectedEmployee,dtr_store.selectedPeriod);

        if(dtr_store.selectedEmployee,dtr_store.selectedPeriod){    
            await dtr_store.drawLogs();
            emit('reloadLogs')
        }else{
            toast.add({ severity: 'error', summary: 'Error', detail: 'Please select a period and an employee.', life: 3000 });
        }
    };

    const showLogs = () => {
        emit('showLogs')
    };

    const dataTable = ref();
    const loading = ref(false);

    onMounted(async() => {
        
    });

    const setData = (data) => {
        dataTable.value = data;
        loading.value = false;
    };

    const setLoadingState = (val) => {
        loading.value = val;
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


    defineExpose({  
        setData,
        setLoadingState
    });
</script>

<style>
   
</style>

