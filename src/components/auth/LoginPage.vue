<template>
    <div class="card flex justify-center" >
        <Image style="margin:4rem auto;" src="public/images/jlr_logo.png" alt="Image" width="250" />
    </div>    
    <Card style="width: 26rem; margin:0rem auto;font-size:10pt;" >
        <template #title>Log In</template>
        <template #content>
            <form @submit.prevent="submit" action="">
                <div class="grid grid-cols-1 gap-4 pt-6">
                    <InputText name="username" type="text" placeholder="Username" />
                    <Password placeholder="Password" :feedback="false" toggleMask fluid />
                </div>
                <Button icon="pi pi-sign-in" class="mt-4" label="Log In" type="submit" />
            </form>
        </template>
        
    </Card>
    
</template>

<script setup>
    const submit = () => {
        console.log('submit called');
    }
</script>

<style>

</style>