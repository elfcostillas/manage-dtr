<template>
    <div>
        <Card >
            <template #title>
                Payroll Period
            </template>
            <template #content>
                <Listbox @change="triggerChange" v-model="selected" :highlightOnSelect="true" listStyle="min-height:45rem;max-height:45rem;width:15rem" :options="data_list" optionLabel="label" optionValue="id"  />
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
         emit('listSelected', selected.value )
    };

    const emit =  defineEmits(['listSelected']);
    
    const setData = (data) => {
        data_list.value = data;
    };

    defineExpose({
        setData
    });

</script>

<style>

</style>