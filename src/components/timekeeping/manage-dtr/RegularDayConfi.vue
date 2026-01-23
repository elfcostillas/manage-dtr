<template>
     <Toolbar>
        <template #start>
            <Button v-if="authStore.user.edit_dtr=='Y'" icon="pi pi-calculator" @click="computeLogs" class="mr-2" severity="secondary" label="Compute" /> 
            <Button icon="pi pi-list" @click="showLogs" class="mr-2" severity="secondary" label="Show Logs" /> 
            <Button v-if="authStore.user.edit_dtr=='Y'" icon="pi pi-download" @click="drawLogs" class="mr-2" severity="secondary" label="Draw Logs" /> 
            <Button v-if="authStore.user.edit_dtr=='Y'" icon="pi pi-pen-to-square" @click="filloutLogout" class="mr-2" severity="secondary" label="Fill in Logout" /> 
            <Button v-if="authStore.user.edit_dtr=='Y'" icon="pi pi-pen-to-square" @click="completeLog" class="mr-2" severity="secondary" label="Complete Logs" /> 
            <Button v-if="authStore.user.edit_dtr=='Y'" icon="pi pi-trash" @click="clearLog" class="mr-2" severity="secondary" label="Clear Generated Logs" /> 
        </template>
        <template #center ></template>
        <template #end ></template>
    </Toolbar>
    <DataTable editMode="cell" dataKey="id" @cell-edit-complete="onCellEditComplete" :value="dataTable" :rowStyle="fnBackGround" scrollable scrollHeight ="36rem" style="font-size: 10pt;" :loading="loading">
        <template #loading> Processing. Please wait. </template>
        <template #empty > <div style="text-align: center;">  No records found. </div> </template>
       
        <Column field="" header="Date" headerStyle="text-align:center;" style="text-align: center;" >
            <template #body="slotProps">
                <div style="text-align:center;">
                    {{ (slotProps.data.dtr_date) ? format(slotProps.data.dtr_date,"EEE") : ''  }} <br>
                    {{ (slotProps.data.dtr_date) ? format(slotProps.data.dtr_date,"MM/dd/yyyy") : ''  }}
                </div>
            </template>
          
        </Column>
        <Column header="Schedule" field="schedule_id" style="text-align: center;width:10rem;">
            <template  v-if="authStore.user.edit_dtr=='Y'"  #editor="{ data, field }">
                <Select style="width:8rem" v-model="data[field]" :options="sched_options" optionLabel="label" optionValue="id" placeholder="Select" ></Select>
            </template>
            <template #body="slotProps">
                <div style="background-color: #daf0ff;">{{ slotProps.data.sched_time_in }}</div>
                <div style="background-color: #6ac5f3;">{{ slotProps.data.sched_time_out }}</div>
            </template>
          
        </Column>
        <Column field="time_in" header="Time In" style="text-align: center;"></Column>
        <Column field="time_out" header="Time Out" style="text-align: center;"></Column>
       

        <Column field="hrs" header="Work Hours" style="text-align: center;" >
            <template #body="slotProps">
                {{ (slotProps.data.hrs > 0) ? slotProps.data.hrs : '' }}
            </template></Column>
        <Column field="ndays" header="Day" bodyStyle="text-align: center;"  headerStyle="text-align: center;" >
            <template #body="slotProps">
                {{ (slotProps.data.ndays > 0) ? slotProps.data.ndays : '' }}
            </template>
        </Column>
        <Column field="late" header="Late" style="text-align: center;" bodyStyle="text-align:center;color:#FF4D00;font-weight:bold;">
            <template #body="slotProps">
                {{ (slotProps.data.late > 0) ? slotProps.data.late : '' }}
            </template>
        </Column>
        <Column field="under_time" header="" headerStyle="font-weight:500;text-align:center;" style="text-align: center;" bodyStyle="text-align:center;color:#FF4D00;font-weight:bold;">
            <template #header>
                Under <br> Time
            </template>
            <template #body="slotProps">
                {{ (Number(slotProps.data.under_time) > 0) ? Number(slotProps.data.under_time) : '' }}
            </template>
        </Column>
        <Column field="night_diff" header="" headerStyle="font-weight:500;text-align:center;" bodyStyle="text-align:center;">
            <template #header>
                Night Diff <br> (Hrs)
            </template>
            <template #body="slotProps">
                {{ (Number(slotProps.data.night_diff) > 0) ? Number(slotProps.data.night_diff) : '' }}
            </template>
        </Column>
        <Column field="awol" header="AWOL" headerStyle="font-weight:500;text-align:center;" bodyStyle="text-align:center;color:#FF4D00;font-weight:bold;">
           <template #body="slotProps">
                {{ (Number(slotProps.data.awol) > 0) ? Number(slotProps.data.awol) : '' }}
            </template>
        </Column>

    </DataTable>
    <!-- <ConfirmDialog></ConfirmDialog> -->
    <Toast></Toast>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import { format } from 'date-fns';
    import { useManageDTRStore } from '@/stores/manage-dtr';
    import { useToast } from 'primevue/usetoast';
    import { useConfirm } from 'primevue';

    import { useAuthStore } from '@/stores/auth';

    const authStore = useAuthStore();

    const confirm = useConfirm();

    const toast = useToast();
    const dtr_store = useManageDTRStore();
    const sched_options = ref();
    const cellEditing = ref();

    const props = defineProps(['data']);

    const onCellEditComplete = async (event) => {
        let { data, newValue, field } = event;
        // console.log(event);
        // console.log('data :' + data[field] + 'newvalue :' + newValue + 'field : ' + field);
       
        if( data[field] != newValue){
            confirm.require({       
                message: 'Are you sure you want to change schedule?',
                header: 'Confirmation',
                icon: 'pi pi-exclamation-triangle',
                rejectProps: {
                    label: 'Cancel',
                    severity: 'secondary',
                    outlined: true
                },
                acceptProps: {
                    label: 'Proceed'
                },
                accept: async () => {
                    data[field] = newValue
                    let result = await dtr_store.updateLog(data);
                    emit('reloadLogs');
                    // await dtr_store.filloutLogout();
                    // emit('reloadLogs')

                    // console.log(data[field] = newValue);
                    // console.log(event);
                
                },
                reject: () => {
                
                }
            });
        }
        
    };

    const filloutLogout = () => {
        confirm.require({       
            message: 'Are you sure you want to fill out missing logout for overtime?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Fill Out'
            },
            accept: async () => {
                await dtr_store.filloutLogout();
                emit('reloadLogs')

            },
            reject: () => {
              
            }
        });
    };

    const completeLog = () => {
        confirm.require({       
            message: 'Are you sure you want to fill out Log In and Log out.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Proceed'
            },
            accept: async () => {
                await dtr_store.completeLog();
                emit('reloadLogs')

            },
            reject: () => {
              
            }
        });
    };

    const clearLog = () => {
        confirm.require({       
            message: 'Are you sure you want to clear out generated Logs.',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Proceed'
            },
            accept: async () => {
                await dtr_store.clearLog();
                emit('reloadLogs')

            },
            reject: () => {
              
            }
        });
    };
    
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
            loading.value = true;
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
        // console.log(authStore.user.edit_dtr);
    });

    const setData = (data,sched) => {
        dataTable.value = data;
     
        sched_options.value = sched;
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

