import { ref } from 'vue'

export default function useAniQuoteFetcher() {
    const state = ref([]);
    const quote = ref('');
    const character = ref('');
    const anime = ref('');
    const isLoading = ref(false);

    const executeFetcher = async () => {
        isLoading.value = true;

        try {
            console.log(import.meta.env.VITE_BASE_URL_2);

            const response = await fetch(`https://proxy.corsfix.com/?${import.meta.env.VITE_BASE_URL_2}/quotes/random`)

            if(!response.ok) {
                throw new Error("Could not fetch resource");
            }
            
            const data = await response.json();

            state.value = data.data;

            quote.value = state.value.content
            character.value = state.value.character.name
            anime.value = state.value.anime.name;

        } catch (error) {
            console.error(error)
        } finally {
            isLoading.value = false;
        }
    }

    executeFetcher();

    return {
        quote,
        character,
        anime,
        isLoading
    }
}