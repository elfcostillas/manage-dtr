import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useManageDTRStore = defineStore("manageDTRStore", () => {
    
    const dtr_data = ref(null);

    const getDTRData = async(period_id,emp_id) => {
        try{
            const { data } = await getFN(`api/timekeeping/manag-dtr-semi/data/${period_id}/${emp_id}`,null);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    return {
        getDTRData
    };
});