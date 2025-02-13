import { ref } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useSa1Fetcher() {
    let sa1Info = ref([])
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;
    
        try {
            const response = await fetch(`${resource}${consts.savings_acct_routes.sa1_transactions}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();

            sa1Info.value = data;

            // console.log(sa1Info.value);

        } catch (error) {
                console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        sa1Info,
        isLoading
    }
}