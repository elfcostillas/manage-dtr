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
                    <TabPanel value="0"></TabPanel>
                    <TabPanel value="1"></TabPanel>
                    <TabPanel value="2"></TabPanel>
                    <TabPanel value="3"></TabPanel>
                    <TabPanel value="4"></TabPanel>
                    <TabPanel value="5"></TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Card>
</template>

<script setup>

</script>

<style>

</style>