import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useUserStore = defineStore('userStore',() => {
    
    const list = ref(null);
    const modules_list = ref();

    const getList = async() => {
        try{
            const { data } = await getFN(`api/user-settings/user-rights/user-list`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    };

    const getModules = async() => {
        try{
            const { data } = await getFN(`api/user-settings/user-rights/user-modules`,null);
            modules_list.value = data;
        }catch(error){

        }

        return modules_list;
    };
    
    const saveRights = async(rights,user) => {
        let obj = {
            user : user,
            rights : rights
        };
        try {
            const { data } = await postFN('api/user-settings/user-rights/save-rights',obj);
        }catch(error){

        }
    };

    return {
        getList,
        getModules,
        saveRights
    };

});
