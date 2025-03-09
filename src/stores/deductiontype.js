import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN } from '@/assets/composables/transmit'

export const useDeductionTypeStore = defineStore('deductiontype', () => {
    const dedtypes = ref()
    
    const getDeductionTypes = async () => {
        try{
            const { data } = await getFN('api/deduction-type/deduction-type-list',null);
            dedtypes.value = data;
        }catch(error){

        }

        return dedtypes;
    }

    const getLoanTypes = async () => {
        try{
            const { data } = await getFN('api/deduction-type/govt-type-list',null);
            dedtypes.value = data;
        }catch(error){

        }

        return dedtypes;
    }

    return { getDeductionTypes,getLoanTypes }
})

//api/employee/list