import { reactive } from 'vue'

export let aniQuote = reactive(
    {
        quote: '',
        character: '',
        anime: ''
    }
)

export const generateAniQuote = async () => {
    await fetch('https://animechan.vercel.app/api/random')
    .then((response) => response.json())
    .then((quote) => {
        aniQuote.quote = quote.quote
        aniQuote.character = quote.character
        aniQuote.anime = quote.anime;
    })
    .catch(error => console.log(error))
}