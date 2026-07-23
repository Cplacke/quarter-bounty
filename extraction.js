/**
 * script used to extract data from the wikipidea table for quarter collection data
 * 
 * may need to be modified if extracting from new collection table
 */

data = []
rows = $('#mwRg')[0].querySelectorAll('tr')

rows.forEach((rowEle, i) => {
    let td = [ ... rowEle.querySelectorAll('td') ]
    let offset = 0;
    if (td.length == 13) {
        offset = 1
        year = td[0].innerText
    }
    let jusrisdiction = td[1+offset].innerText
    let site = td[2+offset].innerText
    let img = td[4+offset].querySelector('img').getAttribute('src')

    data.push({
        year,
        img,
        state: `${jusrisdiction} - ${site}`
    })
})