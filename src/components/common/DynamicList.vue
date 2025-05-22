<template>
    <div>
        <Card>
            <template #title>
                Payroll Period
            </template>
            <template #content>
                <Listbox @change="triggerChange" v-model="selected" :highlightOnSelect="true" listStyle="min-height:45rem;max-height:45rem;width:14rem" :options="data_list" optionLabel="label" optionValue="id"  @click="filterBySelected" />
            </template>
        </Card>
    </div>
</template>

<script setup>

    import { ref,onMounted } from 'vue';

    const selected = ref();
    const data_list = ref([]);

    onMounted(async () => {
       
    });

    const triggerChange = () => {
        console.log(selected.value)
    };

    const emit =  defineEmits(['filter']);

    const filterBySelected = () => {
        emit('filter', selected.value )
    };
    
    const setData = (data) => {
        data_list.value = data;
    };

    defineExpose({
        setData
    });

</script>

<style>

</style>