import { ref } from 'vue';
import consts from '../constants/constants.js'

const baseURL = import.meta.env.VITE_BASE_URL
const apiPath = import.meta.env.VITE_API_PATH

const resource = `${baseURL}${apiPath}`;

export default function useShopeePayWalletFetcher() {
    let shopeePayWalletInfo = ref([])
    
        const isLoading = ref(false)
    
        const executeFetcher = async () => {
            isLoading.value = true;
        
            try {
                const response = await fetch(`${resource}${consts.shopee_routes.wallet}`)
    
                if(!response.ok) {
                    throw new Error("Could not fetch resource");
                }
    
                const data = await response.json();
    
                shopeePayWalletInfo.value = data;
    
            } catch (error) {
                    console.error(error)
            } finally {
                isLoading.value = false;
            }
        }
    
        executeFetcher();
    
        return {
            shopeePayWalletInfo,
            isLoading
        }
}