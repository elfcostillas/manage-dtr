<template>
    <div class="flex gap-2 justify-center">
        <Card style="width:auto;">
                <template #title>User Rights </template>
                <template #content>
                    <TablePage></TablePage>
                </template>
        </Card>
    </div>
</template>

<script setup>
    import TablePage from './TablePage.vue';
</script>

<style>

</style>