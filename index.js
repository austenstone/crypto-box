const { GistBox } = require('gist-box')
const fetch = require('node-fetch')

const gistId = process.env.GIST_ID
const ghToken = process.env.GH_TOKEN
const productId = process.env.PRODUCT_ID || 'BTC-USD'
const timeZone = process.env.TIME_ZONE || 'America/New_York'

const updateGist = async (content) => {
    const box = new GistBox({ id: gistId, token: ghToken })
    await box.update({
        filename: `${productId}.txt`,
        description: `${productId} Stats. 📈`,
        content
    })
}

const run = async () => {
    let stats;
    stats = await fetch(`https://api.pro.coinbase.com/products/${productId}/stats`).then(r => r.json())
    console.log('Got coinbase API stats ✅')

    let percentChange = (stats.last - stats.open) / (stats.open * 100) * 10000
    percentChange = Math.round(percentChange * 100) / 100

    let content = `\
1₿ = $${stats.low}
${percentChange > 0 ? 'Up' : 'Down'} ${percentChange}% today
Updated at ${new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone })} (EST)`
    console.log(`\n${content}\n`)

    await updateGist(content)

    console.log('Updated gist successfully ✅')
}

run().catch((err) => console.error('Failure ❌', err))