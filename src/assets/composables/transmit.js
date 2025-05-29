import api from '@/components/api/api'
import { ref } from 'vue'

export const postFN = async (url, params) => {
  const data_arr = ref(null)
  const status = ref(null)
  const message = ref(null)
  const count = ref(null)

  try {
    const { data } = await api.post(url, params)
    ;(data_arr.value = data.data),
      (status.value = data.status),
      (message.value = data.message),
      (count.value = data.count)
  } catch (error) {}

  return {
    data: data_arr.value,
    status: status.value,
    message: message.value,
    count: count.value,
  }
}

export const getFN = async (url, params) => {
  const data_arr = ref(null)
  const status = ref(null)
  const message = ref(null)
  const count = ref(null)

  try {
    const { data } = await api.get(url)
    ;(data_arr.value = data.data),
      (status.value = data.status),
      (message.value = data.message),
      (count.value = data.count)
  } catch (error) {}

  return {
    data: data_arr.value,
    status: status.value,
    message: message.value,
    count: count.value,
  }
}

export const window_open = (url) => {
  // window.open('http://172.17.42.108/ts-report-api/' + url, '_blank')
  // window.open('http://172.17.56.65/sap_api/' + url, '_blank')
  window.open('http://localhost/sap_api/' + url, '_blank')
}

// api.post(url,$params);
