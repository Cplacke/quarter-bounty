import { connect, Collection, disconnect, getKv } from "jsr:@easykv/easykv";

interface QuarterBounty {
    name: string,
    status: boolean,
    user: string,
    date?: number
}

class QuarterCollection<T> extends Collection {
    constructor(collection: string) {
        super(collection)
    }
    async updateOrCreate(value: QuarterBounty) {
        // attempt to update record matching name first
        const updated = await this.findOneAndUpdate(
            { name: value.name },
            { ...value, date: Date.now()}
        )
        if (updated.ok) {
            this.log(`'name:${value.name}' updated`);
            return
        }

        // create if no record matching found
        const created = await this.save({ ...value, date: Date.now() })
        this.log(`'name:${value.name}' record created ${created.id.toLocaleString()}`)
    }

    log(msg: string) {
        console.log(`KV:${this.collection} - ${msg}`)
    }

    async logCount() {
        const allClaimed = await this.findMany({})
        this.log(`${allClaimed.length} records found`)
    }
}

// Connect to the database (optional: specify a path)
await connect("local");

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
