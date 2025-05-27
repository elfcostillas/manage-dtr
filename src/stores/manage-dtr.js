import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useManageDTRStore = defineStore("manageDTRStore", () => {
    
    const dtr_data = ref(null);
    const selectedEmployee = ref();
    const selectedPeriod = ref();

    const setSelectedEmpAndPeriod = (period_id,emp_id) => {
        selectedEmployee.value = emp_id;
        selectedPeriod.value = period_id;
    };

    const getDTRData = async(period_id,emp_id) => {
        try{
            const { data } = await getFN(`api/timekeeping/manage-dtr-semi/data/${period_id}/${emp_id}`,null);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    const drawLogs = async () => {
        try{
            const { data } = await getFN(`api/timekeeping/manage-dtr-semi/draw-logs/${selectedPeriod.value}/${selectedEmployee.value}`,null);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    return {
        getDTRData,
        setSelectedEmpAndPeriod,
        selectedEmployee,
        selectedPeriod,
        drawLogs
    };
});