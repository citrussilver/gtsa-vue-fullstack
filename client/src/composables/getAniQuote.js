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

    // const response = await fetch('https://animechan.xyz/api/random')
    // const data = await response.json()
    
    // aniQuote.quote = data.quote
    // aniQuote.character = data.character
    // aniQuote.anime = data.anime;
}