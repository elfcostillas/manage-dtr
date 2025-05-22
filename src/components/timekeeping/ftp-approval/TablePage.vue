<template>
    <Card style="width:99rem;height:50rem;" >
        <template #title>
            Failure To Punch - Approval
        </template>
       <template #content>
            <DataTable :value="dataTable" paginator :rows="8" scrollable scrollHeight="72vh" :loading="loading" style="font-size: 11pt;" >
                <template #loading> Processing. Please wait. </template>
                <Column style="width:6rem" field="id" header="FTP ID" > </Column>
                <Column  style="width:12rem"  field="emp_name" header="Employee" > </Column>
                <Column style="width:7rem" field="ftp_date" header="Date" > 
                    <template #body="slotProps">
                        <div>{{ (slotProps.data.ftp_date) ? format(slotProps.data.ftp_date,"MM/dd/yyyy") : '' }}</div>
                    </template>
                </Column>
                <Column field="ftp_reason" header="Reason" > </Column>

                <Column style="width:7rem"  field="time_in" header="Time In" >
                    <template #body="slotProps">
                        <div style="text-align:center;">
                           {{ (slotProps.data.time_in_date) ? format(slotProps.data.time_in_date,"MM/dd/yyyy") : ''  }} <br> 
                           {{ slotProps.data.time_in }}
                        </div>
                    </template>
                </Column>
                <Column style="width:7rem"  field="time_out" header="Time Out" > 
                    <template #body="slotProps">
                        <div style="text-align:center;">
                           {{ (slotProps.data.time_out_date) ? format(slotProps.data.time_out_date,"MM/dd/yyyy") : ''  }} <br> 
                           {{ slotProps.data.time_out }}
                        </div>
                    </template>
                </Column>

                <Column style="width:7rem"  field="ot_in" header="OT In" >
                    <template #body="slotProps">
                        <div style="text-align:center;">
                            {{ (slotProps.data.ot_in_date) ? format(slotProps.data.ot_in_date,"MM/dd/yyyy") : ''  }} <br> 
                            {{ slotProps.data.ot_in }}
                        </div>
                    </template>
                </Column>
                <Column style="width:7rem"  field="ot_out" header="OT Out" >
                    <template #body="slotProps">
                        <div style="text-align:center;">
                            {{ (slotProps.data.ot_out_date) ? format(slotProps.data.ot_out_date,"MM/dd/yyyy") : ''  }} <br> 
                            {{ slotProps.data.ot_out }}
                        </div>
                    </template>
                </Column>
                <Column style="width:12rem;font-size:10pt">
                    <template #body="slotProps">
                        <Button icon="pi pi-check-circle"  label="Approve" @click="approve(slotProps.data)">  </Button>
                    </template>
                </Column>
            </DataTable>
            <ConfirmDialog></ConfirmDialog>
        </template>
    </Card>
    <Toast></Toast>
</template>


<script setup>
    import { ref,computed,onMounted } from 'vue';
    import { format } from 'date-fns';
    import { useConfirm } from "primevue/useconfirm";
    import { useFTPApprovalStore } from '@/stores/ftp-approval';
    import { useToast } from "primevue/usetoast";

    const toast = useToast();
    
    const dataTable = ref();
    const loading = ref(true);
    const ftp_store = useFTPApprovalStore();

    const confirm = useConfirm();

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

    const approve = (row) => {
        confirm.require({
            message: 'Are you sure you want to approve?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            rejectProps: {
                label: 'Cancel',
                severity: 'secondary',
                outlined: true
            },
            acceptProps: {
                label: 'Approve'
            },
            accept: async () => {
                // console.log(row);
                let resp = await ftp_store.approve(row);

                if(resp.status == 'success'){
                    toast.add({ severity: 'success', summary: 'Success', detail: 'Approved successfully.', life: 3000 });
                    emit("reload");
                }else{
                    toast.add({ severity: 'error', summary: 'Error', detail: resp.message, life: 3000 });
                }
            },
            reject: () => {
                // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
            }
        });
    }


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

