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

    // url is having problems many months ago
    // const response = await fetch('https://animechan.vercel.app/api/random')
    // const data = await response.json()
    // console.log(data)
    aniQuote.quote = data.quote
    aniQuote.character = data.character
    aniQuote.anime = data.anime;
}