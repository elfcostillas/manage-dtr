<template>
    
</template>

<script setup>
    import { ref,onMounted } from 'vue';

    const reloadNavBar = () => {
        emit('reloadNavBar');
    };

    const emit = defineEmits(['reloadNavBar']);

    onMounted(async() => {
        reloadNavBar();
    });
</script>

