import { ref } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useMayaAcctsFetcher() {
    let mayaTransacts = ref([])
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;
    
        try {
            const response = await fetch(`${resource}${consts.maya_routes.transactions}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }

            const data = await response.json();

            // console.log(data);

            mayaTransacts.value = data;

            // console.log(mayaTransacts.value);

        } catch (error) {
                console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        mayaTransacts,
        isLoading
    }
}