import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const usePayrollPeriodStore = defineStore("payrollPeriodStore", () => {

    const list = ref(null);

    const getList = async() => {
        try{
            const { data } = await getFN(`api/timekeeping/semi-payroll-period/list`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    };

     return {
        getList,
       
    };
});