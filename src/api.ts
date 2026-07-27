import { claimed, offers } from './kv.ts'

const GUILD_CODE = 'washington'

export const handleBountyChange = async (req: Request) => {

    const json = await req.json()
    let user = 'unknown'
    let kv = offers;

    // cheaply authenticated users can alter records
    if (json.guildCode === GUILD_CODE) {
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

export const checkAdmin = async (req: Request) => {
    const json = await req.json()
    console.log(json);
    return new Response(
        JSON.stringify({
            admin: json.guildCode === GUILD_CODE
        }),
        { headers: { 'Content-Type': 'application/json' } }
    )
}