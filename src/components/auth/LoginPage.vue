<template>
    <div class="card flex justify-center" >
        <Image style="margin:4rem auto;" src="images/jlr_logo.png" alt="Image" width="250" />
    </div>    
    <Card style="width: 26rem; margin:0rem auto;font-size:10pt;" >
        <template #title>Log In</template>
        <template #content>
            <form @submit.prevent="submit" action="">
                <div class="grid grid-cols-1 gap-4 pt-6">
                    <InputText name="username" type="text" placeholder="Username" v-model="email" />
                    <Password placeholder="Password" :feedback="false" toggleMask fluid v-model="password" />
                </div>
                <Button icon="pi pi-sign-in" class="mt-4" label="Log In" type="submit" />
            </form>
        </template>
        
    </Card>
    
</template>

<script setup>
    // const submit = () => {
    //     console.log('submit called');
    // }

    // import { useAuthStore } from  "@/stores/auth.js"
    // import { ref } from "vue";

    // import { useRouter } from "vue-router";

    // import { useToast } from "primevue/usetoast";
    // import { popToast } from "@/composables/showToast"
    // const toast = useToast();


    // const router = useRouter();

    import { useRouter } from "vue-router";

    const email = ref(null);
    const password = ref(null);

    import { ref } from "vue";
    import { useAuthStore } from  "@/stores/auth.js"
    import { useToast } from "primevue/usetoast";
    import { popToast } from "@/assets/composables/showToast";
    const toast = useToast();
    const router = useRouter();

    const store = useAuthStore();

    const submit = async () => {

        const responseData = ref();
        const responseStatus = ref();

        const credintials = { email : email.value, password : password.value  };
        // await store.handleLogin(credintials);

        const {d,s} = await store.handleLogin(credintials);

        responseData.value = d;
        responseStatus.value = s;

        if(store.isLoggedIn){
            router.push({ name : 'dashboard' });
        }else{
            const toastObj = await popToast(responseData,responseStatus);
            toast.add(toastObj);
        }

    } 

</script>

<style>

</style>