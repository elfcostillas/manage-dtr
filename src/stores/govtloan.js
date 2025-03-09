import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN,postFN } from '@/assets/composables/transmit'

export const useGovtLoanStore = defineStore('govtlaon', (emp_id,deduction_id) => {
    const list = ref();
    const col_list = ref();

    const respData = ref();
    const respMessage = ref();
    const respStat = ref();
    
    const getDeductionList = async (emp_id,deduction_id) => {
        
        try{
            const { data } = await getFN(`api/govt-loan/list/${emp_id}/${deduction_id}`,null);
            list.value = data;
        }catch(error){

        }

        return list;
    }

    const getTableHeaders = async () => {
        
        try{
            const { data } = await getFN(`api/govt-loan/table-headers`,null);
            col_list.value = data;
        }catch(error){

        }

        return col_list;
    }

    const postDeduction = async (formdata) => {
        
        try{
            if(formdata.id == null){
                const { data,message,status } = await postFN(`api/govt-loan/create`,formdata);
                setResp(data,message,status);
            }else{
                const { data,message,status } = await postFN(`api/govt-loan/update`,formdata);
                setResp(data,message,status);
            }
           
            
        }catch(error){

        }

        return { resp: respData.value,message: respMessage.value,status: respStat.value, };
    }

    const setResp = (data,message,stat) => {
      
        respData.value = data;
        respMessage.value = message;
        respStat.value = stat;
    };

    return { 
        getDeductionList,
        getTableHeaders,
        postDeduction
    }
})

//api/deduction/list/all/all