<template>
    <DataTable v-model:selection="selectedRow" :value="datatable" tableStyle="font-size:11pt;" scrollable scrollHeight="76vh" selectionMode="multiple" :loading="loading">
        <template #loading> Prcoesssing. Please wait. </template>
        <Column v-for="col in columns" :key="col.id" :field="col.col_value" :header="col.col_name" :style="`color:${col.color};min-width:${col.width};text-align:${col.alignment};`" headerStyle="text-align:center;" bodyStyle="font-size:9pt" >
            <template #body="{ data }">
                {{  (col.data_type == 'number_formated') ?  Number(data[col.col_value]).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : data[col.col_value] }}
            </template>
        </Column>

        <Column field="gross_total" header="Gross Total" headerStyle="text-align:center;" bodyStyle="font-size:9pt" ></Column>
        <template #footer> {{ datatable ? datatable.length : 0 }} employees. </template>
    </DataTable>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';

    const datatable = ref();
    const columns = ref();

    const selectedRow = ref();
    const loading = ref(true);

    onMounted(async() => {

    });

    // const view = (props) => {
    //     emit('view',props);
    // };

    // const create = (props) => {
    //     emit('create',props);
    // };

    // const emit = defineEmits(['view','create','clearFilter']);

    const setData = (data,cols) => {
        datatable.value = data;
        columns.value = cols;
        loading.value = false;
    }

    const clearFilter = () => {
        emit('clearFilter');
    };

    defineExpose({
        setData
    });
</script>

<style>

</style>