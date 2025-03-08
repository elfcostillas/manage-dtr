<template>
    <div>
        <Listbox listStyle="min-height:48rem;max-height:48rem;"  v-model="selected" :options="data_list" filter optionLabel="label" optionValue="id"  @click="filterBySelected" />
    </div>
</template>

<script setup>

    import { ref,onMounted } from 'vue';

    const selected = ref();
    const data_list = ref([]);

    onMounted(async () => {
       
    });

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