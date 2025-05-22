import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const usePostedPayrollStore  = defineStore("postedStore",() => {
    const payreg_data = ref();
    const period_list = ref();

    const getPayrollPeriods = async () => {
            
        try{
            const { data } = await getFN(`api/payroll-period/posted`,null);
            period_list.value = data;
        }catch(error){

        }

        return period_list;
    }

    const getPostedPayroll = async (id) => {
        try{
            const { data } = await getFN(`api/payroll-register/unposted/compute/${id}`,null);
            payreg_data.value = data;
        }catch(error){

        }

        return payreg_data;
    }

    return {
        getPayrollPeriods,
        getPostedPayroll
    };
});