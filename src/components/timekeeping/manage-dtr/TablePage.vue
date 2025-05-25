<template>
    <Card style="width:68.5vw;height:50rem;">
        <template #title>Daily Time Record</template>
        <template #content>
            <Tabs value="0">
                <TabList>
                    <Tab value="0" >Regular Day</Tab>
                    <Tab value="1" >RestDay</Tab>
                    <Tab value="2" >Special Holiday</Tab>
                    <Tab value="3" >Legal Holiday</Tab>
                    <Tab value="4" >Double Special Holiday</Tab>
                    <Tab value="5" >Double Legal Holiday</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0"><RegularDay ref="refRegularDay"></RegularDay></TabPanel>
                    <TabPanel value="1"><Restday ref="refRestDay"></Restday></TabPanel>
                    <TabPanel value="2"><SpecialHoliday ref="refSpecialHoliday"></SpecialHoliday></TabPanel>
                    <TabPanel value="3"><LegalHoliday ref="refLegalHoliday"></LegalHoliday></TabPanel>
                    <TabPanel value="4"><DoubleSpecialHoliday ref="refDblSpecialHoliday"></DoubleSpecialHoliday></TabPanel>
                    <TabPanel value="5"><DoubleLegalHoliday ref="refDblLegalHoliday"></DoubleLegalHoliday></TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Card>
</template>

<script setup>
    import { ref,onMounted } from 'vue';

    import RegularDay from './RegularDay.vue';
    import Restday from './Restday.vue';
    import SpecialHoliday from './SpecialHoliday.vue';
    import LegalHoliday from './LegalHoliday.vue';
    import DoubleSpecialHoliday from './DoubleSpecialHoliday.vue';
    import DoubleLegalHoliday from './DoubleLegalHoliday.vue';

    const dtrData = ref();

    const refRegularDay = ref();
    const refRestDay = ref();
    const refSpecialHoliday = ref();
    const refLegalHoliday = ref();
    const refDblSpecialHoliday = ref();
    const refDblLegalHoliday = ref();

    onMounted(async () => {
        // refRegularDay.value.setData();
        // console.log(dtrData.value);
    });

    const setData = (data) => {
        dtrData.value = data;
        // console.log(data.value.regular);

        refRegularDay.value.setData(data.value.regular);

      
    };

    defineExpose({
        setData
    });

</script>

<style>

</style>