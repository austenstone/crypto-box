const { GistBox } = require('gist-box')
const fetch = require('node-fetch');

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

const run = async () => {
    const stats = await fetch(`https://api.pro.coinbase.com/products/${productId}/stats`).then(r => r.json())

    let percentChange = (stats.last - stats.open) / (stats.open * 100) * 10000
    percentChange = Math.round(percentChange * 100) / 100

    let line = `\
1₿ = $${stats.low}
${percentChange > 0 ? 'Up' : 'Down'} ${percentChange}% today
Last updated at ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`

    await updateGist(line)
    console.log('Updated gist successfully ✅')
}

run()