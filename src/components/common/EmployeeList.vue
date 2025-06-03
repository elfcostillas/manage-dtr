<template>
    <Card style="width:18rem;height:50rem;">
        <template #title>
            Employees
        </template>
        <template #content>
            <!-- {{ employees.value.active }} -->
            <Tabs value="0">
                <TabList>
                    <Tab value="0" @click="activeSelected">Active</Tab>
                    <Tab value="1" @click="inActiveSelected">Inactive</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel value="0" >
                        <Listbox listStyle="min-height:36rem;max-height:36rem;font-size:11pt;" @click="selectEvent" v-model="selectedEmployee" :options="active_employees" filter optionLabel="emp_name" optionValue="id"  />
                    </TabPanel>
                    <TabPanel value="1">
                        <Listbox listStyle="min-height:36rem;max-height:36rem;font-size:11pt;" @click="selectEvent" v-model="selectedEmployee" :options="inactive_employees" filter optionLabel="emp_name" optionValue="id" />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </template>
    </Card>
</template>

<script setup>

    import { ref,computed,onMounted } from 'vue';

    const employees = ref();
    const selectedEmployee = ref();

    const active_employees = ref();
    const inactive_employees = ref();

    onMounted(async() => {
      
    });

    const setNames = (employee_list) => {
        
        employees.value = employee_list.value;
        active_employees.value = employee_list.value.active;
        inactive_employees.value = employee_list.value.inactive;
       
    };

    const activeSelected = () => {
        emit("active");
    };

    const selectEvent = () => {
        // console.log(selectedEmployee.value);
        emit('employeeSelected',selectedEmployee.value);
    };


    const inActiveSelected = () => {
        emit("inactive");
    };

    const emit = defineEmits(['active','inactive','employeeSelected']);
    
    defineExpose({  
        setNames
    });

</script>

<style>

</style>