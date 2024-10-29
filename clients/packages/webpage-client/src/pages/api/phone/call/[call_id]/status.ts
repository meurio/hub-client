import getConfig from 'next/config'

interface Request {
    method: 'GET',
    query: {
        call_id: number
    }
}

const {
    publicRuntimeConfig: { openApiUrl },
    serverRuntimeConfig: { 
        // openApiToken
    }
} = getConfig();

export default async (req: Request, res: any) => {
    if (req.method === 'GET') {
        const { call_id } = req.query
        const endpoint = `${openApiUrl}/api/phone/call/${call_id}/status/`;
        const response = await fetch(endpoint, {
            method: 'GET',
            // headers: { 'Content-Type': 'application/json', 'OpenAPI-Token': openApiToken },
            headers: { 'Content-Type': 'application/json' }
        })

        return res.status(200).json(await response.json())
    }

    return res.status(400)
}