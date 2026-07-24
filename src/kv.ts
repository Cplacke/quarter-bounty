import { connect, Collection, disconnect, getKv } from "jsr:@easykv/easykv";

interface QuarterBounty {
    name: string,
    id?: string,
    status: boolean,
    user: string,
    date?: number
}

class QuarterCollection<T> extends Collection {
    constructor(collection: string) {
        super(collection)
    }
    async updateOrCreateByName(value: QuarterBounty) {
        await this.deleteMany({ name: value.name })
        // create if no ID, create record
        const created = await this.save({ ...value, date: Date.now() })
        this.log(`CREATE - 'name:${value.name}' ${created.id.toLocaleString()}`)
    }
    async getAllValues() {
        return (await this.findMany({})).map((r) => (r.value))
    }

    log(msg: string) {
        console.log(`KV:${this.collection} - ${msg}`)
    }

    async logCount() {
        const allClaimed = await this.findMany({})
        this.log(`${allClaimed.length} records found`)
    }
}

// local testing instance
await connect();
// remove deployment instance
// await connect("https://api.deno.com/v2/databases/tarot/connect");

// Create a collection instance
export const claimed = new QuarterCollection<QuarterBounty>("claimed");
export const offers = new QuarterCollection<QuarterBounty>("offers");


/**
 *  KV TESTING CODE 
 */
const _clearAllKV = async () => {
    await claimed.deleteMany({})
    await offers.deleteMany({})
}
// await _clearAllKV()
// await claimed.updateOrCreate({
//     name: 'SC',
//     status: false,
//     user: 'admin'
// })
// await offers.updateOrCreate({
//     name: 'Ohio',
//     status: false,
//     user: 'admin'
// })

await claimed.logCount()
await offers.logCount()
