import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN,postFN } from '@/assets/composables/transmit'

export const useCompensationStore = defineStore('compensation', ()=> {

    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const list = ref();

    const compensations_by_period = async (period_id) => {
        
        try{
            const { data } = await getFN(`api/compensations/list/${period_id}`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    }

    const save = async (formdata) => {
        const { data,message,status } = await postFN(`api/compensations/save`,formdata);
        setResp(data,message,status);   
        
        return { resp: respData.value,message: respMessage.value,status: respStat.value, };
    }

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };


    return { 
        compensations_by_period,
        save
    }

});