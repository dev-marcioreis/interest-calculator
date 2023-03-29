const context = document.getElementById('data-set').getContext('2d')
let line = new Chart(context, {})

const initialamount = document.getElementById('initialamount')
const years = document.getElementById('years')
const rates = document.getElementById('rates')
const compound = document.getElementById('compound')
const button = document.querySelector('.input-group button')
const messege = document.getElementById('messege')

button.addEventListener('click', calculateGrowth)

const data = []
const labels = []

function calculateGrowth(e) {
    e.preventDefault()
    data.length = 0
    labels.length = 0

    let growth = 0

    try {

        const initial = parseInt(initialamount.value)
        const period = parseInt(years.value)
        const interest = parseInt(rates.value)
        const comp = parseInt(compound.value)

        for(let i = 1; i <= period; i++) {
            const final = initial * Math.pow(1 + ((interest / 100) / comp), comp * i)
            data.push(toDecimal(final, 2))
            labels.push('Ano ' + i)
            growth = toDecimal(final, 2)
        }

        messege.innerText = `Valor acumulado: R$ ${growth}`

        drawGraph()

    } catch (error) {
        console.error(error)
    }
}

function drawGraph() {
    line.destroy()
    line =  new Chart(context, {
        type: 'line',
        data: {
            labels,
            datasets: [
                {
                    label: 'Juros Compostos',
                    data,
                    fill: true,
                    backgroundColor: 'rgba(12, 141, 0, 0.7)',
                    borderWidth: 3
                }
            ]
        }
    })
}

function toDecimal(value, decimals) {
    return +value.toFixed(decimals)
}