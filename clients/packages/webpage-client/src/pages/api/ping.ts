export default async function handler(req, res) {
    try {
        console.log('up');
        res.status(200).json({})
    } catch (err) {
        res.status(500).json({ error: 'failed to load data' })
    }
}
