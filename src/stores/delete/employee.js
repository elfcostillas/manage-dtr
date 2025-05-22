import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFN } from '@/assets/composables/transmit'

export const useEmployeeStore = defineStore('employee', () => {
    const employees = ref()
    
    const getEmployees = async () => {
        try{
            const { data } = await getFN('api/employee/list',null);
            employees.value = data;
        }catch(error){

        }

        return employees;
    }

    return { getEmployees }
})

//api/employee/list