function docker_images(output, rows) {

    create_table(rows)

    const output_list = output.split('\n')
    output_list.forEach(value => {

        if(!value){
            console.log(value)
            return
        }

        var i = 0

        var temp = JSON.parse(value)
        const table = document.getElementById('mytab')
        const tr = document.createElement('tr')

        Object.entries(temp).forEach(([key, value]) =>{

            if (!rows.includes(key)){
                return
            }

            var td = document.createElement('td')
            tr.appendChild(td)
            tr.classList = ['item']
            tr.cells[i].appendChild(document.createTextNode(value))
            table.appendChild(tr)

            i++
        })
    })
}

function create_table(rows){

    const div = document.getElementById('output')

    console.log(div)

    while (div.lastElementChild)
    {
        div.removeChild(div.lastElementChild)
    }

    const table = document.createElement('table')
    const thead = document.createElement('thead')
    const tr = document.createElement('tr')

    rows.forEach((value, index) => {
        var th = document.createElement('th')
        tr.appendChild(th)
        tr.cells[index].appendChild(document.createTextNode(value))
    })

    thead.appendChild(tr)
    table.appendChild(thead)
    table.id = 'mytab'
    table.className = ['steelBlueCols']
    div.appendChild(table)
}