import { ref, reactive } from "vue";

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useGlobalFetch(route) {

    console.log(route);

    let state = reactive({});
    const isLoading = ref(false);

    const executeFetcher = async () => {
        
        isLoading.value = true;

        try {

            console.log(`${resource}${route}`);
    
            const response = await fetch(`${resource}${route}`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }
            
            const data = await response.json();

            console.log(data);

            state = [{...data}];

            console.log(state);
            
        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false;
        }

    }

    executeFetcher();

    return {
        state,
        isLoading
    }

}
