const btn = document.querySelector('button');
const places = document.querySelectorAll('.place')
const errorMsg = document.querySelector('.errorMsg');
const visitors = document.querySelectorAll('.visitors');

btn.addEventListener('click', (e) => {
    fetchData()
})

async function fetchData() {
    try {
        const response = await fetch(`http://localhost:3000/api/coworkings`)

        if (!response.ok) {
            throw new Error(`Erreur: ${response.status}`)
        }

        const data = await response.json()
        displayData(data)
    }
    catch (error) {
        //errorMsg.textContent = `${error}`
    }
}

function displayData(data) {
    console.log(data)
    // tri des données
    // data.records.sort((a, b) => {
    //     if (a.fields.fmicourante < b.fields.fmicourante) {
    //         return 1
    //     } else {
    //         return -1
    //     }
    // })

    for (let i = 0; i < data.length; i++) {
        const name = data[i].name;
        // const zoneName = data.records[i].fields.fmizonlib;
        // let nbVisitors = data.records[i].fields.fmicourante;
        // const capacity = data.records[i].fields.fmizonmax;

        // if (nbVisitors < 0) nbVisitors = 0;

        places[i].childNodes[1].textContent = `${name}`
        // places[i].childNodes[3].textContent = `${nbVisitors} / ${capacity}`

        // let ratio = Math.round((nbVisitors / capacity) * 100)
        // visitors[i].style.width = `${ratio}%`
    }
}