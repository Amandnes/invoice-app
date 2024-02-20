const statusFiltro = document.querySelector('.status-filtro')
const svgFiltro = document.querySelector('.icon-arrow')
const listaFiltros = document.querySelector('.lista-filtros')

let clickFiltro = true

statusFiltro.addEventListener('click', () => {
    if(clickFiltro === true) {
        svgFiltro.classList.add('arrow-up')
        listaFiltros.style.display = 'block'
        clickFiltro = false
    } else {
        svgFiltro.classList.remove('arrow-up')
        listaFiltros.removeAttribute('style')
        clickFiltro = true
    }
})

// Criar Nova Fatura

const botaoCriarNovaFatura = document.querySelector('.nova-fatura')
const fundoCinza = document.querySelector('#conteiner-nova-fatura')
const criarNovaFatura = document.querySelector('#criar-nova-fatura')
const formNovaFatura = document.querySelector('#conteudo-nova-fatura')

botaoCriarNovaFatura.addEventListener('click', ()=> {
    fundoCinza.style.display = 'block'
    criarNovaFatura.style.left = '0px'
    formNovaFatura.style.left = '160px'
})

// Adicionar novo item

const botaoAddNovoItem = document.querySelector('#button-add-novo-item')
const listaItems = document.querySelector('#lista-items')


function NovoItem() {
    const div = document.createElement('div')
    const inputName = document.createElement('input')
    const inputQuantidade = document.createElement('input')
    const inputPreco = document.createElement('input')
    const somaTotal = document.createElement('h4')
    const imgDelete = document.createElement('img')

    div.setAttribute('class', 'novo-item')
    inputName.setAttribute('type', 'text')
    inputName.setAttribute('class', 'input-nome')

    inputQuantidade.setAttribute('type', 'number')
    inputQuantidade.setAttribute('class', 'input-quantidade')
    inputQuantidade.setAttribute('placeholder', '0')

    inputPreco.setAttribute('type', 'number')
    inputPreco.setAttribute('class', 'input-preco')
    inputPreco.setAttribute('placeholder', '0.00')

    somaTotal.setAttribute('class', 'soma-valor-total')
    somaTotal.innerHTML = '0.00'

    imgDelete.setAttribute('src', 'assets/icon-delete.svg')
    imgDelete.setAttribute('class', 'img-delete')

    div.appendChild(inputName)
    div.appendChild(inputQuantidade)
    div.appendChild(inputPreco)
    div.appendChild(somaTotal)
    div.appendChild(imgDelete)
    listaItems.appendChild(div)

    // Remover o item
    const imgDel = document.querySelectorAll('.img-delete')
    const divNovoItem = document.querySelectorAll('.novo-item')

    imgDel.forEach((e, i) => {
        e.addEventListener('click', ()=> {
            divNovoItem[i].remove()
            console.log('ola')
        })
    })

    // Atualizar a Soma dos itens
    const quantidadeItem = document.querySelectorAll('.input-quantidade')
    const precoItem = document.querySelectorAll('.input-preco')
    let somaValorTotal = document.querySelectorAll('.soma-valor-total')

    somaValorTotal.forEach((e, i) => [
        precoItem[i].addEventListener('keyup', ()=> {
            e.innerHTML = (quantidadeItem[i].value * precoItem[i].value).toFixed(2)
        }),
        quantidadeItem[i].addEventListener('keyup', ()=> {
            e.innerHTML = (quantidadeItem[i].value * precoItem[i].value).toFixed(2)
        })
    ])
}

botaoAddNovoItem.addEventListener('click', ()=> {
    NovoItem()
})

// Página Principal com Invoices
const qtdInvoices = document.querySelector('#qtd-invoices')

fetch("data.json").then(resposta => {
    resposta.json().then(data => {
        qtdInvoices.innerHTML = `There are ${data.length} total invoices`
        data.forEach((e) => {
            const conteudoInvoices = document.querySelector('#conteudo-invoices')
            const divBlocoInvoice = document.createElement('div')
            divBlocoInvoice.setAttribute('class', 'bloco-invoice')

            const h4IdInvoice = document.createElement('h4')
            h4IdInvoice.setAttribute('class', 'id-invoice')
            h4IdInvoice.innerHTML = '#'
            const strongIdInvoice = document.createElement('strong')
            h4IdInvoice.appendChild(strongIdInvoice)
            divBlocoInvoice.appendChild(h4IdInvoice)

            const h5PaymentDue = document.createElement('h5')
            h5PaymentDue.setAttribute('class', 'paymentDue')
            divBlocoInvoice.appendChild(h5PaymentDue)

            const h5ClientName = document.createElement('h5')
            h5ClientName.setAttribute('class', 'clientName')
            divBlocoInvoice.appendChild(h5ClientName)

            const h4InvoiceTotal = document.createElement('h4')
            h4InvoiceTotal.setAttribute('class', 'invoice-total')
            divBlocoInvoice.appendChild(h4InvoiceTotal)

            const divConteinerStatus = document.createElement('div')
            divConteinerStatus.setAttribute('class', 'conteiner-status')
            divBlocoInvoice.appendChild(divConteinerStatus)

            const li = document.createElement('li')
            divConteinerStatus.appendChild(li)

            const h4Statusinvoice = document.createElement('h4')
            h4Statusinvoice.setAttribute('class', 'status-invoice')
            divConteinerStatus.appendChild(h4Statusinvoice)

            const imgBlocoInvoice = document.createElement('img')
            imgBlocoInvoice.setAttribute('src', 'assets/icon-arrow-right.svg')
            divBlocoInvoice.appendChild(imgBlocoInvoice)
            conteudoInvoices.appendChild(divBlocoInvoice)

            if(e.status === 'paid') {
                divConteinerStatus.style.backgroundColor = '#f3fdfa'
                divConteinerStatus.style.color = '#33d69f'
            } else if(e.status === 'pending') {
                divConteinerStatus.style.backgroundColor = '#fff9f0'
                divConteinerStatus.style.color = '#ff8f00'
            } else if(e.status === 'draft') {
                divConteinerStatus.style.backgroundColor = '#f4f4f5'
                divConteinerStatus.style.color = '#373b53'
            }

            strongIdInvoice.innerHTML = e.id
            h5PaymentDue.innerHTML = e.paymentDue
            h5ClientName.innerHTML = e.clientName
            h4InvoiceTotal.innerHTML = `£ ${(e.total).toFixed(2)}`
            h4Statusinvoice.innerHTML = e.status[0].toUpperCase() + e.status.substring(1)

            // Filtro

            const filtroDraft = document.querySelector('#draft')
            const filtroPaid = document.querySelector('#paid')
            const filtroPending = document.querySelector('#pending')
            const statusInvoice = document.querySelectorAll('.status-invoice')
            const blocoInvoice = document.querySelectorAll('.bloco-invoice')

            let multClick = 0
            filtroDraft.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    if(e.innerHTML !== 'Draft') {
                        blocoInvoice[i].style.display = 'none'
                    } else {
                        blocoInvoice[i].removeAttribute('style')
                    }

                    if(blocoInvoice[i].style.display === 'none' && multClick === 1) {
                        blocoInvoice[i].removeAttribute('style')
                    }
                })
                multClick++
                if(multClick > 1) {
                    multClick = 0
                }
            })

            filtroPaid.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    if(e.innerHTML !== 'Paid') {
                        blocoInvoice[i].style.display = 'none'
                    } else {
                        blocoInvoice[i].removeAttribute('style')
                    }
                })
            })

            filtroPending.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    if(e.innerHTML !== 'Pending') {
                        blocoInvoice[i].style.display = 'none'
                    } else {
                        blocoInvoice[i].removeAttribute('style')
                    }
                })
            })
        })
    })
})


