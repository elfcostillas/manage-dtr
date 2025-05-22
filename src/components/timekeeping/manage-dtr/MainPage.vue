<template>
    <Card>
        <template #title >
            Manage DTR
        </template>
        <template #content >
            <div class="flex gap-2 justify-center">
                <div class="flex-none">
                    <EmployeeList @inactive="setInActive" @active="setActive" @employeeSelected="viewEmployeeDTR" ref="empList" ></EmployeeList>
                </div>
                <div class="flex-none">
                </div>
            </div>
        </template>
    </Card>
</template>

<script setup>
    import { ref,onMounted } from 'vue';
    import EmployeeList from '@/components/common/EmployeeList.vue';

    const setInActive = () => {
        activeTab.value = inactive_employees.value;
    };

    const setActive = () => {
        activeTab.value = active_employees.value;
    };

    const viewEmployeeDTR = () => {

    };

</script>

<style></style>