import { claimed, offers } from './kv.ts'

export const handleBountyChange = async (req: Request) => {

    const json = await req.json()
    let user = 'unknown'
    let kv = offers;

    // cheaply authenticated users can alter records
    if (json.guildCode === 'washington') {
        user = 'admin'
        kv = claimed
    }

    await kv.updateOrCreateByName({
        name: json.name,
        status: json.status,
        user: user
    })

    const records = await kv.findMany({ name: json.name })

    return new Response(
        JSON.stringify(records.map((r) => (r.value ))),
        { headers: { 'Content-Type': 'application/json' } }
    )


}

export const getClaimedBountyStatus = async () => {
    const records = await claimed.findMany({ }) // find all 

    return new Response(
        JSON.stringify(records.map((r) => { r.value })),
        { headers: { 'Content-Type': 'application/json' } }
    )
}