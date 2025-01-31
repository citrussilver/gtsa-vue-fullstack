import { reactive } from 'vue'

export let aniQuote = reactive(
    {
        quote: '',
        character: '',
        anime: ''
    }
)

// animechan vercel
export const generateAniQuote = async () => {

    console.log(import.meta.env.VITE_BASE_URL_2);

    const response = await fetch(`https://proxy.corsfix.com/?${import.meta.env.VITE_BASE_URL_2}/quotes/random`)
    const dataObj = await response.json()
    const data = dataObj.data
    
    aniQuote.quote = data.content
    aniQuote.character = data.character.name
    aniQuote.anime = data.anime.name;
}