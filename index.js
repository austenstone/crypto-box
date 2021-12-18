import { GistBox } from 'gist-box'
import fetch from 'node-fetch'

const gistId = process.env.GIST_ID
const ghToken = process.env.GH_TOKEN
const productId = process.env.PRODUCT_ID || 'BTC-USD'

const updateGist = async (content) => {
    const box = new GistBox({ id: gistId, token: ghToken })
    await box.update({
        filename: `${productId}.txt`,
        description: `${productId} Stats. 📈`,
        content
    })
}

export const run = async () => {
    const stats = await fetch(`https://api.pro.coinbase.com/products/${productId}/stats`).then(r => r.json())

    let percentageChange = (stats.last - stats.open) / (stats.open * 100) * 10000
    percentageChange = Math.round(percentageChange * 100) / 100

    let line = `\
1₿ = $${stats.low}
${percentageChange > 0 ? 'Up' : 'Down'} ${percentageChange}% today
Last updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    await updateGist(line)
    console.log('Updated gist successfully! ✅')
}

run()