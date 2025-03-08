import { ref } from "vue";
import api from "@/components/api/api";

export const exportExcelFN = (url,filename) => {

    api.get('api/'+url,{responseType: 'arraybuffer'})
        .then(response => {
            var fileURL = window.URL.createObjectURL(new Blob([response.data]));
            var fileLink = document.createElement('a');
            
            fileLink.href = fileURL;
            fileLink.setAttribute('download', `${filename}.xls`);
            document.body.appendChild(fileLink);
            fileLink.click();
        })
    
};