const btnRefresh = document.querySelector('button');
const errorMsg = document.querySelector('.errorMsg');
const places = document.querySelectorAll('.place')
const visitors = document.querySelectorAll('.visitors')

const dataset = 'bor_frequentation_piscine_tr'

btnRefresh.addEventListener('click', onRefresh)

async function fetchData() {
    try {
        const response = await fetch(`https://opendata.bordeaux-metropole.fr/api/records/1.0/search/?dataset=${dataset}`)

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
    let sortedRecords = [...data.records];
    sortedRecords.sort((a, b) => {
        let result = ((a.fields.fmicourante / a.fields.fmizonmax) - (b.fields.fmicourante / b.fields.fmizonmax)) * -1
        console.log(result);
        return result
    })
    sortedRecords.forEach((record, index) => {
        const currentPlace = places[index];
        const name = currentPlace.childNodes[1];
        name.textContent = `${record.fields.etablissement_etalib} (${record.fields.fmizonlib}) : `
        const info = currentPlace.childNodes[3];
        info.textContent = `${record.fields.fmicourante} / ${record.fields.fmizonmax}`
        record.fields.datemiseajour

        const ratio = (record.fields.fmicourante / record.fields.fmizonmax);
        visitors[index].style.transform = `scaleX(${ratio})`
    })
}