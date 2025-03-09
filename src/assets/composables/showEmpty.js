import { ref } from "vue";

export const showEmpty = (object) => {
    const keys = Object.keys(object);

    const error = ref(false);

    for (const key of keys) 
    {   
        // console.log(typeof(key) + '=>' + key + ':' + object[key]);
        
        if(typeof(key)==='object'){
            console.log(key,'im object');
        }else {
            if((object[key]=='' || object[key]== null || object[key]== 0) && (key != 'id')){
                // console.log(key + ':' + object[key]);
                error.value = true;
            }else{
                // console.log(key + ':' + object[key]);
            }
        }
    }

    if(error.value){
        return { severity: 'error', summary: 'Error', detail: 'Please fill up required fields.', life: 3000 };
        
    }

    return false;

};