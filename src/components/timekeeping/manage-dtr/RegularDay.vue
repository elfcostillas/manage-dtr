<template>
     <Toolbar>
        <template #start>
            <Button icon="pi pi-calculator" @click="computeLogs" class="mr-2" severity="secondary" label="Compute" /> 
            <Button icon="pi pi-list" @click="showLogs" class="mr-2" severity="secondary" label="Show Logs" /> 
            <Button icon="pi pi-download" @click="computeLogs" class="mr-2" severity="secondary" label="Draw Logs" /> 
        </template>
        <template #center ></template>
        <template #end ></template>
    </Toolbar>
    <DataTable :value="dataTable" scrollable scrollHeight ="36rem" style="font-size: 10pt;" :loading="loading">
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
        <Column field="" header="Time In"></Column>
        <Column field="" header="Time Out"></Column>
        <Column field="" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
               Time In <br> (Over Time)
            </template>
        </Column>
        <Column field="" header="" headerStyle="font-weight:500;text-align:center;">
            <template #header>
                Time Out <br> (Over Time)
            </template>
        </Column>

        <Column field="" header="Work Hours"></Column>
        <Column field="" header="Day"></Column>
        <Column field="" header="Late"></Column>
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
    
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import { format } from 'date-fns';

    const computeLogs = () => {

    };

    const emit =  defineEmits(['showLogs']);

    const drawLogs = () => {

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


    defineExpose({  
        setData,
        setLoadingState
    });
</script>

<style>

</style>

