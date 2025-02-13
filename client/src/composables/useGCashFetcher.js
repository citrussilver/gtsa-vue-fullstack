import { ref, reactive } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useGCashFetcher() {
    let gCashInfo = ref([])
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;

        try {
            const response = await fetch(`${resource}${consts.gcash_routes.accounts}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();

            // console.log(data);

            gCashInfo.value = data;

            // console.log(gCashInfo.value);

        } catch (error) {
             console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        gCashInfo,
        isLoading
    }
}