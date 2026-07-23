// import staticFiles from "https://deno.land/x/static_files@1.1.6/mod.ts";
import originalStateQuarters from './collections/state-quarters.ts';
import americaTheBeautiful from './collections/america-the-beautiful.ts';
import './src/kv.ts'

const router = async (req: Request): Promise<Response> => {

    // if bounty page url then send requested page
    if (/original-state-quarters/.test(req.url)) {
        console.log('serving `original-state-quarters` html page')
        const bountyPageHtml = await Deno.readTextFile('./pages/bounty-page.html')
        return new Response(
            bountyPageHtml
                .replace("{{DATA}}", JSON.stringify(originalStateQuarters))
                .replace("{{TITLE}}", 'Original State Quarters (1999 - 2008)'),
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
    }

    if (/america-the-beautiful/.test(req.url)) {
        console.log('serving `america-the-beautiful` html page')
        const bountyPageHtml = await Deno.readTextFile('./pages/bounty-page.html')
        return new Response(
            bountyPageHtml
                .replace("{{DATA}}", JSON.stringify(americaTheBeautiful))
                .replace("{{TITLE}}", 'America the Beautiful Quarters (2010 - 2020)'),
            {
                headers: { 'Content-Type': 'text/html' }
            }
        )
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

Deno.serve({ port: 4200 }, router);