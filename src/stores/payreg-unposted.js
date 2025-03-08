
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN } from '@/assets/composables/transmit'

export const usePayRegUnposted = defineStore('unposted', () => {
    const payreg_data = ref();
    const period_list = ref();

    const getPayrollPeriods = async () => {
        
        try{
            const { data } = await getFN(`api/payroll-period/unposted`,null);
            period_list.value = data;
        }catch(error){

        }

        return period_list;
    }

    const processPayroll = async (id) => {
        
        try{
            const { data } = await getFN(`api/payroll-register/unposted/compute/${id}`,null);
            payreg_data.value = data;
        }catch(error){

        }

        return payreg_data;
    }

    return { 
        getPayrollPeriods,
        processPayroll
    }


});