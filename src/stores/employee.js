import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useEmployeeStore = defineStore("employeeStore",() => {

    const employees = ref(null);

    const getEmployeeList = async () => {
        
        try {
            const { data } = await getFN(`api/master-data/employee/list`,null);
            employees.value = data;
        }catch(error){

        }
        
        return employees;
    };

    return {
        getEmployeeList
    };
});