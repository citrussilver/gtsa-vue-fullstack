import { ref } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useCcFetcher() {
    let ccInfo = ref([])
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;
    
        try {
            const response = await fetch(`${resource}${consts.cc_routes.accounts}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();

            ccInfo.value = data;

        } catch (error) {
                console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        ccInfo,
        isLoading
    }
}