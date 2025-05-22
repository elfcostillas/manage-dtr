import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN,postFN } from '@/assets/composables/transmit'

export const useCanteenDeduction = defineStore('canteen', ()=> {

    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const list = ref();

    const canteen_by_period = async (period_id) => {
        
        try{
            const { data } = await getFN(`api/canteen-deduction/list/${period_id}`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    }

    const save = async (formdata) => {
        const { data,message,status } = await postFN(`api/canteen-deduction/save`,formdata);
        setResp(data,message,status);   
        
        return { resp: respData.value,message: respMessage.value,status: respStat.value, };
    }

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };


    return { 
        canteen_by_period,
        save
    }

});