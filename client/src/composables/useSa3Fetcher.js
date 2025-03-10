import { ref } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useSa3Fetcher() {
    let sa3Info = ref([])
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;
    
        try {
            const response = await fetch(`${resource}${consts.savings_acct_routes.sa3_transactions}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();

            sa3Info.value = data;

            // console.log(sa3Info.value);

        } catch (error) {
                console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        sa3Info,
        isLoading
    }
}