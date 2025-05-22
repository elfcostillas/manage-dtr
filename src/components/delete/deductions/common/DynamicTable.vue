<template>
    <Toolbar>
        <template #start>
            <Button icon="pi pi-plus" @click="create" class="mr-2" severity="secondary" label="Create" /> 
            
        </template>

        <template #center>
        
        </template>

        <template #end>
            <Button label="" icon="pi pi-refresh" @click="clearFilter" />
        </template>
    </Toolbar>

    <DataTable :value="deduction" paginator :rows="9" tableStyle="max-width:82rem;min-width:82rem;font-size:11pt;" scrollable scrollHeight="620px" >
        <!-- <Column v-for="col in columns" :key="col.field" :field="col.col_value" :header="col.col_name"></Column> -->
        <Column v-for="col in columns" :key="col.id" :field="col.col_value" :header="col.col_name" :style="`color:${col.color};width:${col.width};text-align:${col.alignment};`" >
            <template #body="{ data }">
                {{  (col.data_type == 'number_formated') ?  Number(data[col.col_value]).toLocaleString("en-US", {maximumFractionDigits:2,minimumFractionDigits:2}) : data[col.col_value] }}
            </template>
        </Column>
        <Column style="width:12rem;font-size:10pt">
            <template #body="slotProps">
                <Button icon="pi pi-folder-open"  label="View" @click="view(slotProps.data)">  </Button>
            </template>
        </Column>
        
    </DataTable>
</template>

<script setup>
    import { computed, onMounted, ref } from 'vue';

    const deduction = ref();
    const columns = ref();

    onMounted(async() => {

    });


    const view = (props) => {
        emit('view',props);
    };

    const create = (props) => {
        emit('create',props);
    };

    const emit = defineEmits(['view','create','clearFilter']);

    const setData = (data,cols) => {
        deduction.value = data;
        columns.value = cols;
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