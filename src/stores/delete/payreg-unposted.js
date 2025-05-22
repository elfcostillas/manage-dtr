
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN,postFN } from '@/assets/composables/transmit'

export const usePayRegUnposted = defineStore('unposted', () => {
    const payreg_data = ref();
    const period_list = ref();

    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const getPayrollPeriods = async () => {
        
        try{
            const { data } = await getFN(`api/payroll-period/unposted`,null);
            period_list.value = data;
        }catch(error){

        }

        return period_list;
    }

    const postPayroll = async (period_id) => {
        const { data,message,status } = await postFN(`api/payroll-register/unposted/post`,{ period_id : period_id });
        setResp(data,message,status);   
        
        return { resp: respData.value,message: respMessage.value,status: respStat.value };
    };

    const processPayroll = async (id) => {
        
        try{
            const { data } = await getFN(`api/payroll-register/unposted/compute/${id}`,null);
            payreg_data.value = data;
        }catch(error){

        }

        return payreg_data;

    }

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };

    return { 
        getPayrollPeriods,
        processPayroll,
        postPayroll
    }


});