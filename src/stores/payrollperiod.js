//api/payroll-period/list


import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN } from '@/assets/composables/transmit'

export const usePayrolPeriod = defineStore('payrollperiod', () => {
    const list = ref();

    
    const getPayrollPeriods = async () => {
        
        try{
            const { data } = await getFN(`api/payroll-period/list`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    }

    return { 
        getPayrollPeriods
    }
})
