// import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";
import originalStateQuarters from './collections/state-quarters.ts';
import americaTheBeautiful from './collections/america-the-beautiful.ts';
import { claimed } from './src/kv.ts'
import { handleBountyChange } from './src/api.ts';

const router = async (req: Request): Promise<Response> => {

    // if bounty page url then send requested page
    if (/original-state-quarters/.test(req.url)) {
        console.log('serving `original-state-quarters` html page')
        const bountyPageHtml = await Deno.readTextFile('./pages/bounty-page.html')
        const claimedData = await claimed.getAllValues()
        return new Response(
            bountyPageHtml
                .replace("{{TITLE}}", 'Original State Quarters (1999 - 2008)')
                .replace("{{DATA}}", JSON.stringify(originalStateQuarters))
                .replace("{{CLAIMED}}", JSON.stringify(claimedData)),
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
    }

    if (/america-the-beautiful/.test(req.url)) {
        console.log('serving `america-the-beautiful` html page')
        const bountyPageHtml = await Deno.readTextFile('./pages/bounty-page.html')
        const claimedData = await claimed.getAllValues()
        return new Response(
            bountyPageHtml
                .replace("{{TITLE}}", 'America the Beautiful Quarters (2010 - 2020)')
                .replace("{{DATA}}", JSON.stringify(americaTheBeautiful))
                .replace("{{CLAIMED}}", JSON.stringify(claimedData)),
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
    }

    if (/admin/.test(req.url)) {
        const adminHtml = await Deno.readTextFile('./pages/admin.html')
        return new Response(
            adminHtml,
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
    }

    if (/api\/claim/.test(req.url)) {
         return await handleBountyChange(req)
    }
    
    // else redirect to home page
    const homePageHtml = await Deno.readTextFile("./pages/home.html");
    return new Response(
        homePageHtml,
        {
            headers: { 'Content-Type': 'text/html' }
        }
    )
    // return staticFiles('build')({ 
    //     request: req,
    //     respondWith: (r: Response) => r,
    // });
}

Deno.serve({ port: 8000 }, router);