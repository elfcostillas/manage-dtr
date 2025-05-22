<template>
    <Card style="width:99rem;height:50rem;" >
        <template #title >
            Failure To Punch
        </template>
        <template #content>

            <Toolbar>
                <template #start>
                    <Button icon="pi pi-plus" @click="create" class="mr-2" severity="secondary" label="Create" /> 
                </template>
                <template #center ></template>
                <template #end ></template>
            </Toolbar>
            <DataTable :value="dataTable" paginator :rows="8" scrollable scrollHeight="72vh" :loading="loading" >
                <template #loading> Processing. Please wait. </template>
                <Column style="width:6rem" field="id" header="FTP ID" > </Column>
                <Column  style="width:12rem"  field="emp_name" header="Employee" > </Column>
                <Column style="width:7rem" field="ftp_date" header="Date" > 
                    <template #body="slotProps">
                        <div>{{ (slotProps.data.ftp_date) ? format(slotProps.data.ftp_date,"MM/dd/yyyy") : '' }}</div>
                    </template>
                </Column>
                <Column field="ftp_reason" header="Reason" > </Column>

                <Column style="width:7rem"  field="time_in" header="Time In" > </Column>
                <Column style="width:7rem"  field="time_out" header="Time Out" > </Column>

                <Column style="width:7rem"  field="ot_in" header="OT In" > </Column>
                <Column style="width:7rem"  field="ot_out" header="OT Out" > </Column>
                <Column style="width:12rem;font-size:10pt">
                    <template #body="slotProps">
                        <Button icon="pi pi-folder-open"  label="View" @click="view(slotProps.data)">  </Button>
                    </template>
                </Column>
            </DataTable>
        </template>
    </Card>
</template>

<script setup>
    import { ref,computed,onMounted } from 'vue';
    import { format } from 'date-fns';
    const dataTable = ref();
    const loading = ref(true);

    const create = (props) => {
        emit('create',props);
    };

    const view = (props) => {
        emit('view',props);
    };

    const clearFilter = () => {
        emit('clearFilter');
    };

    onMounted(async() => {
        
    });

    const showLoadingBanner = (value) => {
        loading.value = value;
    };

    const emit = defineEmits(['view','create','clearFilter']);

    const setTableData = (tableData) => {
      
        dataTable.value = tableData;
        loading.value = false;
    };

    defineExpose({  
        setTableData,
        showLoadingBanner
    });

</script>

<style>

</style>