import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useFTPStore = defineStore("ftpStore", () => {
    
    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const list = ref(null);

    const getList = async(emp_id) => {
        try{
            const { data } = await getFN(`api/timekeeping/ftp/list/${emp_id}`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    };

    const save = async (formdata) => {
        const { data,message,status } = await postFN(`api/timekeeping/ftp/store`,formdata);
        setResp(data,message,status);   
        
        return { resp: respData.value,message: respMessage.value,status: respStat.value, };
    }

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };

    return {
        getList,
        save
    };
});