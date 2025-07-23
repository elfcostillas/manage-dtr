import { defineStore } from "pinia";
import { ref,computed } from "vue";
import { getFN,postFN } from "@/assets/composables/transmit";

export const useManageDTRStore = defineStore("manageDTRStore", () => {
    
    const dtr_data = ref(null);
    const selectedEmployee = ref(null);
    const selectedPeriod = ref(null);
    const dtr_rawlogs = ref(null);

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

    const getRawLogs = async(period_id,emp_id) => {
        try{
            const { data } = await getFN(`api/timekeeping/logs/data/${period_id}/${emp_id}`,null);
            dtr_rawlogs.value = data;
        }catch(error){

        }

        return dtr_rawlogs;
    };

    const drawLogs = async () => {
        let arrayData = {
            period_id : selectedPeriod.value,
            emp_id : selectedEmployee.value
        };

        try{
            //const { data } = await postFN(`api/timekeeping/manage-dtr-semi/draw-logs/${selectedPeriod.value}/${selectedEmployee.value}`,null);
            const { data } = await postFN(`api/timekeeping/manage-dtr-semi/draw-logs`,arrayData);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    const filloutLogout = async () => {
        let arrayData = {
            period_id : selectedPeriod.value,
            emp_id : selectedEmployee.value
        };

        try{
            const { data } = await getFN(`api/timekeeping/manage-dtr-semi/fill-out-logs/${selectedPeriod.value}/${selectedEmployee.value}`,null);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    const computeLogs = async () => {
        let arrayData = {
            period_id : selectedPeriod.value,
            emp_id : selectedEmployee.value
        };

        try{
            const { data } = await getFN(`api/timekeeping/manage-dtr-semi/compute-logs/${selectedPeriod.value}/${selectedEmployee.value}`,null);
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data;
    };

    const updateLog = async (arrayData) => {

        try{
            const { data } = await postFN(`api/timekeeping/manage-dtr-semi/update-logs`,arrayData);
            dtr_data.value = data;
           
        }catch(error){

        }

        return dtr_data;
    };

    const updateRawLog = async (arrayData) => {
        try{
            const data = await postFN(`api/timekeeping/logs/update-log`,arrayData);
            
            dtr_data.value = data;
        }catch(error){

        }

        return dtr_data.value;
    };

    return {
        getDTRData,
        setSelectedEmpAndPeriod,
        selectedEmployee,
        selectedPeriod,
        drawLogs,
        computeLogs,
        filloutLogout,
        updateLog,
        getRawLogs,
        updateRawLog
    };
});