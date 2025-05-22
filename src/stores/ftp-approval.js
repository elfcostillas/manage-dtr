import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useFTPApprovalStore = defineStore("ftpApprovalStore", () => {
    const respData = ref();
    const respMessage = ref();
    const respStat = ref();

    const list = ref(null);

    const getList = async(emp_id) => {
        try{
            const { data } = await getFN(`api/timekeeping/ftp-approval/list/${emp_id}`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    };

    const approve = async (arrayData) => {
        try{
            const {  data,message,status } = await postFN(`api/timekeeping/ftp-approval/approve`,arrayData);
            setResp(data,message,status);   
           
        }catch(error){

        }

        return { resp: respData.value,message: respMessage.value,status: respStat.value, };
    };

    const setResp = (data,message,stat) => {
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };

    return {
        getList,
        approve
    };
});