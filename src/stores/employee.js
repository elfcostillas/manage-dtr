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

    const getEmployeeListSG = async () => {
        
        try {
            const { data } = await getFN(`api/master-data/employee/list`,null);
            employees.value = data;
        }catch(error){

        }
        
        return employees;
    };

    const getEmployeeListByLevel = async (type) => {
        
        try {
            let url = `api/master-data/employee/list-by-level/${type}`;

            const { data } = await getFN(url,null);
            employees.value = data;
        }catch(error){

        }
        
        return employees;
    };

    return {
        getEmployeeList,
        getEmployeeListByLevel
    };
});