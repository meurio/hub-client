import getConfig from 'next/config'

interface Request {
    method: 'POST',
    body: {
        person: {
            given_name: string,
            family_name?: string,
            phone_number: string,
            locality?: string,
            region?: string
        },
        targets: number[]
    }
}

const {
    publicRuntimeConfig: { openApiUrl, openApiCampaignId },
    serverRuntimeConfig: { openApiToken }
} = getConfig();

const campaign_id = openApiCampaignId;

export default async (req: Request, res: any) => {
    if (req.method === 'POST') {
        // const { widget_id } = req.query
        const endpoint = `${openApiUrl}/api/campaigns/${campaign_id}/phone/`;
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'OpenAPI-Token': openApiToken },
            body: JSON.stringify(req.body)
        })

        return res.status(200).json(await response.json())
    }

    return res.status(400)
}