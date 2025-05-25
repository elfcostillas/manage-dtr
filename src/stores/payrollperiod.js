import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const usePayrollPeriodStore = defineStore("payrollPeriodStore", () => {

    const list = ref(null);
    const periodata = ref(null);

    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const getList = async() => {
        try{
            const { data } = await getFN(`api/timekeeping/semi-payroll-period/list`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    };

    const getData = async() => {
        try{
            const { data } = await getFN(`api/timekeeping/semi-payroll-period/index`,null);
            periodata.value = data;
        }catch(error){

        }

        return periodata;
    };

    const prepareDTR = async (period_id) => {
        const { data,message,status } = await postFN(`api/timekeeping/semi-payroll-period/prepare`,{ period_id : period_id });
        setResp(data,message,status);   
        
        return { resp: respData.value,message: respMessage.value,status: respStat.value };
    };

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };



    return {
        getList,
        getData,
        prepareDTR
       
    };
});