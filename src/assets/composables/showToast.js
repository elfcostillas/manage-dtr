
    import { ref } from "vue";

    export const popToast = (responseData,responseStatus) => {
         const errorMsg = ref('');

        if(responseStatus.value==200)
        {
            // toast.add();
            return { severity: 'success', summary: 'Success Message', detail: 'Request was saved successfully.', life: 3000 };
        }else {
            // console.log(responseData.value)
            // Object.keys(responseData.value).forEach(key => {
            //     console.log(key,responseData.value[key]);
            // });

            /*
            Object.values(responseData.value).forEach(val => {
                if('error' in val){

                }else{
                    val.forEach(function(item){
                        errorMsg.value += item +" ";
                    });
                }
                
            });
            */
            // console.log(responseData,responseStatus);
            const keys = Object.keys(responseData.value);

            // console.log(keys);

            for (const key of keys) {
                if(typeof(responseData.value[key])==='object'){
                    let newObj=responseData.value[key]
                    const keys2 = Object.keys(newObj);
                    for (const key2 of keys2) {
                        errorMsg.value += newObj[key2]+'\n';
                    }
                }else{
                    errorMsg.value += responseData.value[key]+'\n';
                }
            }

            return { severity: 'error', summary: 'Error Message', detail: errorMsg.value, life: 3000 };
        }

       

    };
    /*
    var errObj = e.responseJSON;
	 
	const keys = Object.keys(errObj);
	var errMsg='';
	  for (const key of keys) {
		//console.log(key +":"+ errObj[key] );
		if(typeof(errObj[key])==='object'){
			let newObj=errObj[key];
			const keys2 = Object.keys(newObj);
			for (const key2 of keys2) {
				errMsg += newObj[key2]+'\n';
			}
		}else{
			errMsg += errObj[key]+'\n';
		}
	  }
      */
