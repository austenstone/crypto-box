const { GistBox } = require('gist-box')
const fetch = require('node-fetch')

const gistId = process.env.GIST_ID || "40b6a7b4e19c1526619df8f99fbd522a"
const token = process.env.GITHUB_TOKEN
const productId = process.env.PRODUCT_ID || 'BTC-USD'
const products = productId.split('-');
const timeZone = process.env.TIME_ZONE || 'America/New_York'

const updateGist = async (content) => {
    const box = new GistBox({ id: gistId, token: token })
    await box.update({
        filename: `${productId}.txt`,
        description: `${productId} Stats. 📈`,
        content
    })
}

const run = async () => {
    let stats;
    stats = await fetch(`https://api.pro.coinbase.com/products/${productId}/stats`).then(r => r.json())
    console.log('Got coinbase API stats ✅', stats)

    let percentChange = (stats.last - stats.open) / (stats.open * 100) * 10000
    percentChange = Math.round(percentChange * 100) / 100

    let todaysChange = Math.round((stats.last - stats.open) * 100) / 100

    let content = `\
1 ${products[0]} = ${stats.last} ${products[1]}
${todaysChange} (${percentChange}%)${percentChange > 0 ? '👍' : '👎'} today
⌚ ${new Date().toLocaleString('en-US', {
        timeZone,
        timeZoneName: 'short'
    })}`
    console.log(`\n${content}\n`)

    await updateGist(content)

    console.log('Updated gist successfully ✅')
}

run().catch((err) => console.error('Failure ❌', err))