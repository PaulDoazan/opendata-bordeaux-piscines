const btnRefresh = document.querySelector('button');
const errorMsg = document.querySelector('.errorMsg');
const places = document.querySelectorAll('.place')
const visitors = document.querySelectorAll('.visitors')

const dataset = 'bor_frequentation_piscine_tr'

btnRefresh.addEventListener('click', onRefresh)

async function fetchData() {
    try {
        const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/explore/v2.1/catalog/datasets/bor_frequentation_piscine_tr/records?limit=20`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        const data = await response.json()
        btnChange()
        displayData(data);
    }
    catch (error) {
        btnChange()
        errorMsg.textContent = `${error}`
    }
}

function onRefresh(e) {
    btnChange('search')
    fetchData();
}

function btnChange(state) {
    if (state === 'search') {
        btnRefresh.classList.add("searching");
        btnRefresh.textContent = '...'
    } else {
        btnRefresh.classList.remove("searching");
        btnRefresh.textContent = 'Actualiser'
    }
}

function displayData(data) {
    console.log(data);
    let sortedRecords = [...data.results];
    sortedRecords.sort((a, b) => {
        let result = ((a.entree / a.fmizonmax) - (b.entree / b.fmizonmax)) * -1
        return result
    })
    sortedRecords.forEach((record, index) => {
        let current = 0;
        if (record.entree > 0) current = record.entree;

        const currentPlace = places[index];
        const name = currentPlace.childNodes[1];
        name.textContent = `${record.etablissement_etalib} (${record.fmizonlib}) : `
        const info = currentPlace.childNodes[3];
        info.textContent = `${current} / ${record.fmizonmax}`
        record.datemiseajour

        let ratio = (current / record.fmizonmax);

        console.log(ratio)

        visitors[index].style.width = `${ratio * 100}%`
    })
}