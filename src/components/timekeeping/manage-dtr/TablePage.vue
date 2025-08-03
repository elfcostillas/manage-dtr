<template>
    <Card style="width:68.5vw;height:50rem;">
        <template #title>Daily Time Record</template>
        <template #content>
            <Tabs value="0">
                <TabList>
                    <Tab value="0" >Regular Day</Tab>
                    <Tab value="1" >Overtime</Tab>
                    <Tab value="2" >Special Holiday</Tab>
                    <Tab value="3" >Legal Holiday</Tab>
                    <Tab value="4" >Double Special Holiday</Tab>
                    <Tab value="5" >Double Legal Holiday</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0"><RegularDay ref="refRegularDay" @showLogs="showLogs" @reloadLogs="reloadLogs"></RegularDay></TabPanel>
                    <TabPanel value="1"><OverTime ref="refOvertime" @showLogs="showLogs" @reloadLogs="reloadLogs"></OverTime></TabPanel>
                    <TabPanel value="2"><SpecialHoliday ref="refSpecialHoliday"></SpecialHoliday></TabPanel>
                    <TabPanel value="3"><LegalHoliday ref="refLegalHoliday"></LegalHoliday></TabPanel>
                    <TabPanel value="4"><DoubleSpecialHoliday ref="refDblSpecialHoliday"></DoubleSpecialHoliday></TabPanel>
                    <TabPanel value="5"><DoubleLegalHoliday ref="refDblLegalHoliday"></DoubleLegalHoliday></TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Card>
    <Drawer v-model:visible="visibleRight" ref="refRawLogs" position="right" header="Raw Logs" style="width:22rem">
        <DataTable :value="rawLogs" :rowStyle="fnBackGround" scrollable scrollHeight="50rem" >
            <Column  style="font-size: 9pt;" header="Date" field="punch_date" >
               <template  #body="slotProps">
                    {{ (slotProps.data.punch_date) ? format(slotProps.data.punch_date,"MM/dd/yyyy") : '' }}
               </template>
            </Column>
            <Column style="font-size: 9pt;" header="Clock In" field="punch_time" ></Column>
            <Column style="font-size: 9pt;" header="State" field="cstate" >
                <template  #body="slotProps">
                
                    {{ (slotProps.data.new_cstate != '' && slotProps.data.new_cstate != null) ? slotProps.data.new_cstate : slotProps.data.cstate  }}

                    
                </template>
            </Column>
        </DataTable>
    </Drawer>
    <ConfirmDialog></ConfirmDialog>
</template>

<script setup>
    /*  :rowStyle="({src}) => (src =='ftp') ? 'background-color:#FFE5B4' : 'background-color:none' " */
    import { ref,onMounted } from 'vue';
    import { format } from 'date-fns';
    import RegularDay from './RegularDay.vue';
    import Restday from './Restday.vue';
    import SpecialHoliday from './SpecialHoliday.vue';
    import LegalHoliday from './LegalHoliday.vue';
    import DoubleSpecialHoliday from './DoubleSpecialHoliday.vue';
    import DoubleLegalHoliday from './DoubleLegalHoliday.vue';
import OverTime from './OverTime.vue';

    const visibleRight = ref(false);
    const dtrData = ref();

    const refRegularDay = ref();
    const refOvertime = ref();
    const refRestDay = ref();
    const refSpecialHoliday = ref();
    const refLegalHoliday = ref();
    const refDblSpecialHoliday = ref();
    const refDblLegalHoliday = ref();

    const rawLogs = ref();

    const showLogs = () => {
        visibleRight.value = true;
    };

    const emit =  defineEmits(['reloadLogs']);

    const reloadLogs = () => {
        emit('reloadLogs')
    };

    onMounted(async () => {
        // refRegularDay.value.setData();
        // console.log(dtrData.value);
    });

    const setData = async (data) => {
        dtrData.value = data;
        
        // refRegularDay.value.setLoadingState(true);
        await refRegularDay.value.setData(data.value.regular,data.value.sched);
        await refOvertime.value.setData(data.value.regular,data.value.sched);
        // refRegularDay.value.setLoadingState(false);

        rawLogs.value = data.value.raw_logs;

    };

    const setLoadingState = (value) => {
        refRegularDay.value.setLoadingState(value);
    };


    const fnBackGround = (type) => {
        // console.log(type.src);
        let style = '';
        const punch_types = ['C/In','C/Out'];
        
        switch(type.src){
            case 'ftp' :
                style = 'background-color:#FFE5B4;'; //
            break;

            case 'fill-out' :
                style = 'background-color:#FAA0A0;';
            break;
            
        }

     

        if(!punch_types.includes(type.cstate))
        {
           
            style += 'font-weight:bold;';
        }

    
        return style;
    }

    defineExpose({
        setData,
        setLoadingState

    });

</script>

<style >

</style>