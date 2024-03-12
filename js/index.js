const statusFiltro = document.querySelector('.status-filtro')
const svgFiltro = document.querySelector('.icon-arrow')
const listaFiltros = document.querySelector('.lista-filtros')
const conteudoItems = document.querySelector('#conteudo-items')

let clickFiltro = true

statusFiltro.addEventListener('click', () => {
    if (clickFiltro === true) {
        svgFiltro.classList.add('arrow-up')
        listaFiltros.style.display = 'block'
        clickFiltro = false
    }
    if (tema.getAttribute('src') !== 'assets/icon-moon.svg') {
        listaFiltros.style.color = 'white'
    } else {
        listaFiltros.style.color = 'black'
    }
})
listaFiltros.addEventListener('mouseleave', () => {
    if (clickFiltro === false) {
        svgFiltro.classList.remove('arrow-up')
        listaFiltros.removeAttribute('style')
        clickFiltro = true
    }
})

const select = document.querySelector('.select')
const ulPaymentTerms = document.querySelector('#payment-terms')

select.addEventListener('click', () => {
    ulPaymentTerms.style.display = 'block'
})
ulPaymentTerms.addEventListener('mouseleave', () => {
    ulPaymentTerms.style.display = 'none'
})

const botaoDiscard = document.querySelector('#botao-discard')
const saveDraft = document.querySelector('#save-draft')
const saveSend = document.querySelector('#save-send')
const buttonCancel = document.querySelector('#cancel')
const buttonSaveChanges = document.querySelector('#save-changes')
const botoesFinalForm = document.querySelector('.botoes-final-form')

function addButtonEdit() {
    botaoDiscard.style.display = "none"
    saveDraft.style.display = "none"
    saveSend.style.display = "none"
    botoesFinalForm.style.justifyContent = 'end'
    botoesFinalForm.style.gap = '15px'
    buttonCancel.style.display = 'block'
    buttonSaveChanges.style.display = 'block'
}
buttonCancel.addEventListener('click', () => {
    fundoCinza.removeAttribute('style')
    retirarItemsAnteriores(false, true)
})
botaoDiscard.addEventListener('click', () => {
    fundoCinza.removeAttribute('style')
})

// Criar Nova Fatura

const botaoCriarNovaFatura = document.querySelector('.nova-fatura')
const fundoCinza = document.querySelector('#conteiner-nova-fatura')
const criarNovaFatura = document.querySelector('#criar-nova-fatura')
const formNovaFatura = document.querySelector('#conteudo-nova-fatura')
const nameEdit = document.querySelector('#conteudo-nova-fatura h2')
const inputSenderAddress = document.querySelector('#conta-de #address')
const inputSenderCity = document.querySelector('#conta-de #city')
const inputSenderPostalCode = document.querySelector('#conta-de #postalCode')
const inputSenderCountry = document.querySelector('#conta-de #country')
const inputClientName = document.querySelector('#conta-para #name')
const inputClientEmail = document.querySelector('#conta-para #email')
const inputClientAddress = document.querySelector('#conta-para #address')
const inputClientCity = document.querySelector('#conta-para #city')
const inputClientPostalCode = document.querySelector('#conta-para #postalCode')
const inputClientCountry = document.querySelector('#conta-para #country')
const inputDescription = document.querySelector('#conta-para #description')
const inputCreated = document.querySelector('#conta-para #date')

botaoCriarNovaFatura.addEventListener('click', () => {
    fundoCinza.style.display = 'block'
    criarNovaFatura.style.left = '0px'
    formNovaFatura.style.left = '160px'
    nameEdit.innerHTML = "New Invoice"
    inputSenderAddress.setAttribute('value', '')
    inputSenderCity.setAttribute('value', '')
    inputSenderPostalCode.setAttribute('value', '')
    inputSenderCountry.setAttribute('value', '')
    inputClientName.setAttribute('value', '')
    inputClientEmail.setAttribute('value', '')
    inputClientAddress.setAttribute('value', '')
    inputClientCity.setAttribute('value', '')
    inputClientPostalCode.setAttribute('value', '')
    inputClientCountry.setAttribute('value', '')
    inputDescription.setAttribute('value', '')

    botaoDiscard.removeAttribute('style')
    saveDraft.removeAttribute('style')
    saveSend.removeAttribute('style')
    botoesFinalForm.removeAttribute('style')
    botoesFinalForm.removeAttribute('style')
    buttonCancel.removeAttribute('style')
    buttonSaveChanges.removeAttribute('style')
})

// Adicionar novo item

const botaoAddNovoItem = document.querySelector('#button-add-novo-item')
const listaItems = document.querySelector('#lista-items')
let contadorItem = 0

function NovoItem(itemName, qty, price, total) {
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

    inputName.setAttribute('value', itemName)
    inputQuantidade.setAttribute('value', qty)
    inputPreco.setAttribute('value', price)
    somaTotal.innerHTML = total

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
        e.addEventListener('click', () => {
            divNovoItem[i].remove()
            contadorItem--
        })
    })

    // Atualizar a Soma dos itens
    const quantidadeItem = document.querySelectorAll('.input-quantidade')
    const precoItem = document.querySelectorAll('.input-preco')
    let somaValorTotal = document.querySelectorAll('.soma-valor-total')

    somaValorTotal.forEach((e, i) => [
        precoItem[i].addEventListener('keyup', () => {
            e.innerHTML = (quantidadeItem[i].value * precoItem[i].value).toFixed(2)
        }),
        quantidadeItem[i].addEventListener('keyup', () => {
            e.innerHTML = (quantidadeItem[i].value * precoItem[i].value).toFixed(2)
        })
    ])

}
botaoAddNovoItem.addEventListener('click', () => {
    NovoItem('Item name', 'Qty.', '0.00', '0.00')
    contadorItem++
})

function formatacaoData(data) {
    return data.substring(5, 7)
}

let mesExtenso = 0

function formatarData(date) {
    switch (formatacaoData(date)) {
        case '01':
            mesExtenso = "January"
            break
        case '02':
            mesExtenso = "February"
            break
        case '03':
            mesExtenso = "March"
            break
        case '04':
            mesExtenso = "April"
            break
        case '05':
            mesExtenso = "May"
            break
        case '06':
            mesExtenso = "June"
            break
        case '07':
            mesExtenso = "July"
            break
        case '08':
            mesExtenso = "August"
            break
        case '09':
            mesExtenso = "September"
            break
        case '10':
            mesExtenso = "October"
            break
        case '11':
            mesExtenso = "November"
            break
        case '12':
            mesExtenso = "December"
            break
    }
    return mesExtenso
}

const botaoDelete = document.querySelector('.botao-delete')
const conteinerPaginaPrincipal = document.querySelector('#conteiner-pagina-principal')
const conteinerInvoice = document.querySelector('#conteiner-invoice')
const goBack = document.querySelector('.go-back')
const idInvoices = document.querySelector('.id-invoice2 strong')
const conteinerStatus2 = document.querySelector('.conteiner-status2')
const statusInvoice2 = document.querySelector('.status-invoice2')
const invoiceDate = document.querySelector('.invoice-date')
const paymentDue2 = document.querySelector('.paymentDue2')
const clientName2 = document.querySelector('.clientName2')
const clientStreet = document.querySelector('.client-street')
const clientCity = document.querySelector('.client-city')
const clientPostCode = document.querySelector('.client-postCode')
const clientCountry = document.querySelector('.client-country')
const clientEmail = document.querySelector('.client-email')
const senderStreet = document.querySelector('.sender-street')
const senderCity = document.querySelector('.sender-city')
const senderPostCode = document.querySelector('.sender-postCode')
const senderCountry = document.querySelector('.sender-country')
const botaoMarcarPago = document.querySelector('.botao-marcar-pago')
const qtdInvoices = document.querySelector('#qtd-invoices')
const filtroDraft = document.querySelector('.draft')
const filtroPaid = document.querySelector('.paid')
const filtroPending = document.querySelector('.pending')
const botaoEdit = document.querySelector('.botao-edit')
const descricaoInvoice = document.querySelector('.descricao-invoice')
const somaItems = document.querySelector('.soma-items')


// Página Principal com Invoices

fetch("data.json").then(resposta => {
    resposta.json().then(data => {
        qtdInvoices.innerHTML = `There are ${data.length} total invoices`
        data.forEach((e, i) => {
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

            if (e.status === 'paid') {
                divConteinerStatus.style.backgroundColor = 'rgb(0 255 178 / 5%)'
                divConteinerStatus.style.color = '#33d69f'
            } else if (e.status === 'pending') {
                divConteinerStatus.style.backgroundColor = 'rgb(249 149 0 / 5%)'
                divConteinerStatus.style.color = '#ff8f00'
            } else if (e.status === 'draft') {
                divConteinerStatus.style.backgroundColor = 'rgb(0 0 255 / 5%)'
                divConteinerStatus.style.color = 'rgb(89 112 246)'
            }

            strongIdInvoice.innerHTML = e.id
            h5PaymentDue.innerHTML = 'Due ' + e.paymentDue.substring(8, 10) + ' ' + formatarData(e.paymentDue).substring(0, 3) + ' ' + e.paymentDue.substring(0, 4)
            h5ClientName.innerHTML = e.clientName
            h4InvoiceTotal.innerHTML = `£ ${(e.total).toFixed(2)}`
            h4Statusinvoice.innerHTML = e.status[0].toUpperCase() + e.status.substring(1)

            // Filtro

            const statusInvoice = document.querySelectorAll('.status-invoice')
            const blocoInvoice = document.querySelectorAll('.bloco-invoice')

            filtroDraft.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    blocoInvoice[i].style.display = 'none'
                    if (e.innerHTML === 'Draft') {
                        blocoInvoice[i].style.display = 'flex'
                    }
                })
            })

            filtroPaid.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    blocoInvoice[i].style.display = 'none'
                    if (e.innerHTML === 'Paid') {
                        blocoInvoice[i].style.display = 'flex'
                    }
                })
            })

            filtroPending.addEventListener('click', () => {
                statusInvoice.forEach((e, i) => {
                    blocoInvoice[i].style.display = 'none'
                    if (e.innerHTML === 'Pending') {
                        blocoInvoice[i].style.display = 'flex'
                    }
                })
            })

            blocoInvoice[i].addEventListener('click', () => {
                blocoInvoice[i].classList.add('bloco-ativo')
                conteinerPaginaPrincipal.style.display = 'none'
                conteinerInvoice.style.display = 'block'
                idInvoices.innerHTML = data[i].id
                statusInvoice2.innerHTML = data[i].status[0].toUpperCase() + data[i].status.substring(1)
                invoiceDate.innerHTML = data[i].createdAt.substring(8, 10) + ' ' + formatarData(data[i].createdAt).substring(0, 3) + ' ' + data[i].createdAt.substring(0, 4)
                paymentDue2.innerHTML = data[i].paymentDue.substring(8, 10) + ' ' + formatarData(data[i].paymentDue).substring(0, 3) + ' ' + data[i].paymentDue.substring(0, 4)
                clientName2.innerHTML = data[i].clientName
                clientStreet.innerHTML = data[i].clientAddress.street
                clientCity.innerHTML = data[i].clientAddress.city
                clientPostCode.innerHTML = data[i].clientAddress.postCode
                clientCountry.innerHTML = data[i].clientAddress.country
                clientEmail.innerHTML = data[i].clientEmail
                senderStreet.innerHTML = data[i].senderAddress.street
                senderCity.innerHTML = data[i].senderAddress.city
                senderPostCode.innerHTML = data[i].senderAddress.postCode
                senderCountry.innerHTML = data[i].senderAddress.country
                descricaoInvoice.innerHTML = data[i].description
                somaItems.innerHTML = "£ " + data[i].total.toFixed(2)

                if (data[i].status === 'paid') {
                    conteinerStatus2.style.backgroundColor = 'rgb(0 255 178 / 5%)'
                    conteinerStatus2.style.color = '#33d69f'
                } else if (data[i].status === 'pending') {
                    conteinerStatus2.style.backgroundColor = 'rgb(249 149 0 / 5%)'
                    conteinerStatus2.style.color = '#ff8f00'
                } else if (data[i].status === 'draft') {
                    conteinerStatus2.style.backgroundColor = 'rgb(0 0 255 / 5%)'
                    conteinerStatus2.style.color = 'rgb(89 112 246)'
                }

                for (let ind = 0; ind < data[i].items.length; ind++) {

                    const listaItemsInvoice = document.createElement('div')
                    listaItemsInvoice.setAttribute('class', 'lista-items-invoice')

                    const itemName = document.createElement('h5')
                    itemName.setAttribute('class', 'item-name')
                    listaItemsInvoice.appendChild(itemName)

                    const itemQuantity = document.createElement('h5')
                    itemQuantity.setAttribute('class', 'item-quantity')
                    listaItemsInvoice.appendChild(itemQuantity)

                    const itemPrice = document.createElement('h5')
                    itemPrice.setAttribute('class', 'item-price')
                    listaItemsInvoice.appendChild(itemPrice)

                    const invoiceTotal = document.createElement('h5')
                    invoiceTotal.setAttribute('class', 'invoice-total')
                    listaItemsInvoice.appendChild(invoiceTotal)

                    conteudoItems.appendChild(listaItemsInvoice)

                    itemName.innerHTML = data[i].items[ind].name
                    itemQuantity.innerHTML = data[i].items[ind].quantity
                    itemPrice.innerHTML = "£ " + (data[i].items[ind].price)
                    invoiceTotal.innerHTML = "£ " + (data[i].items[ind].total)

                    if (tema.getAttribute('src') !== 'assets/icon-moon.svg') {
                        listaItemsInvoice.style.color = 'white'
                    } else {
                        listaItemsInvoice.style.color = 'black'
                    }
                }

                botaoMarcarPago.addEventListener('click', () => {
                    if (statusInvoice[i].textContent != 'Paid' && blocoInvoice[i].classList.contains('bloco-ativo')) {
                        conteinerStatus2.style.backgroundColor = 'rgb(0 255 178 / 5%)'
                        conteinerStatus2.style.color = '#33d69f'
                        divConteinerStatus.style.backgroundColor = 'rgb(0 255 178 / 5%)'
                        divConteinerStatus.style.color = '#33d69f'
                        statusInvoice[i].innerHTML = "Paid"
                        statusInvoice2.innerHTML = "Paid"
                    }
                })
                botaoEdit.addEventListener('click', () => {
                    if (blocoInvoice[i].classList.contains('bloco-ativo')) {
                        fundoCinza.style.display = 'block'
                        criarNovaFatura.style.left = '0px'
                        formNovaFatura.style.left = '160px'
                        nameEdit.innerHTML = "Edit " + "#" + data[i].id
                        inputSenderAddress.setAttribute('value', data[i].senderAddress.street)
                        inputSenderCity.setAttribute('value', data[i].senderAddress.city)
                        inputSenderPostalCode.setAttribute('value', data[i].senderAddress.postCode)
                        inputSenderCountry.setAttribute('value', data[i].senderAddress.country)
                        inputClientName.setAttribute('value', data[i].clientName)
                        inputClientEmail.setAttribute('value', data[i].clientEmail)
                        inputClientAddress.setAttribute('value', data[i].clientAddress.street)
                        inputClientCity.setAttribute('value', data[i].clientAddress.city)
                        inputClientPostalCode.setAttribute('value', data[i].clientAddress.postCode)
                        inputClientCountry.setAttribute('value', data[i].clientAddress.country)
                        inputDescription.setAttribute('value', data[i].description)
                        inputCreated.setAttribute('value', data[i].createdAt.substring(8, 10) + '/' + data[i].createdAt.substring(5, 7) + '/' + data[i].createdAt.substring(0,4))
                        addButtonEdit()

                        for (let ind = 0; ind < data[i].items.length; ind++) {
                            NovoItem(data[i].items[ind].name, data[i].items[ind].quantity, parseFloat((data[i].items[ind].price)).toFixed(2), parseFloat((data[i].items[ind].total)).toFixed(2))
                        }
                    }
                })
                goBack.addEventListener('click', () => {
                    if (blocoInvoice[i].classList.contains('bloco-ativo')) {
                        conteinerPaginaPrincipal.removeAttribute('style')
                        conteinerInvoice.removeAttribute('style')
                        blocoInvoice[i].classList.remove('bloco-ativo')
                        retirarItemsAnteriores(true, true)
                    }
                })
                botaoDelete.addEventListener('click', () => {
                    if (blocoInvoice[i].classList.contains('bloco-ativo')) {
                        blocoInvoice[i].remove()
                        conteinerPaginaPrincipal.removeAttribute('style')
                        conteinerInvoice.removeAttribute('style')
                        retirarItemsAnteriores(true, true)
                        puxarDados('', i, false)
                    }
                })
                buttonSaveChanges.addEventListener('click', () => {
                    if(blocoInvoice[i].classList.contains('bloco-ativo')) {
                        const clientName = document.querySelector('#name').value
                        const paymentDue = document.querySelector('#date').value
                        let paymentDueFormatado = paymentDue.substring(6, 10) + '-' + paymentDue.substring(3, 5) + '-' + paymentDue.substring(0, 2)
                        const description = document.querySelector('#description').value
                        const clientEmail = document.querySelector('#email').value
                        const dados = {
                            id: data[i].id,
                            createdAt: data[i].createdAt,
                            paymentDue: paymentDueFormatado,
                            description: description,
                            clientName: clientName,
                            clientEmail: clientEmail,
                            status: data[i].status,
                            senderAddress: {
                                street: inputSenderAddress.value,
                                city: inputSenderCity.value,
                                postCode: inputSenderPostalCode.value,
                                country: inputSenderCountry.value
                            },
                            clientAddress: {
                                street: inputClientAddress.value,
                                city: inputClientCity.value,
                                postCode: inputClientPostalCode.value,
                                country: inputClientCountry.value
                            },
                            items: [],
                            total: []
                        }
                        objItems()
                        function objItems() {
                            const itemName = document.querySelectorAll('.input-nome')
                            const itemQtd = document.querySelectorAll('.input-quantidade')
                            const itemPreco = document.querySelectorAll('.input-preco')
                            const itemTotal = document.querySelectorAll('.soma-valor-total')
                            let soma = 0
                            for (let i = 0; i < itemName.length; i++) {
                                dados.items.push({ name: itemName[i].value, quantity: itemQtd[i].value, price: itemPreco[i].value, total: itemTotal[i].innerHTML })
                                soma = soma + parseFloat(itemTotal[i].innerHTML)
                            }
                            dados.total = soma
                        }
                        // data.splice(2, 1, dados)
                        // console.log(data)
                        puxarDados(dados, i, true)
                    }
                })
            })
        })
    })
})

function retirarItemsAnteriores(formItems, invoiceItems) {
    if (formItems === true) {
        const listaDosItems = document.querySelectorAll('.lista-items-invoice')
        listaDosItems.forEach((e, i) => {
            e.remove()
        })
        return listaDosItems
    }
    if (invoiceItems === true) {
        const novoItem = document.querySelectorAll('.novo-item')
        novoItem.forEach(el => {
            el.remove()
        })
        return novoItem
    }
}

const tema = document.querySelector('#tema')
const body = document.querySelector('body')
const conteudoTopH2 = document.querySelector('.conteudo-top-esquerdo h2')
const conteinerTop = document.querySelector('.conteiner-top')
const conteinerInfo = document.querySelector('.conteiner-info-invoice')
const idInvoice2 = document.querySelector('.id-invoice2 strong')
const conteinerSomaitems = document.querySelector('#conteiner-soma-items')
const goBackH5 = document.querySelector('.go-back h5')

tema.addEventListener('click', () => {
    if (tema.getAttribute('src') === 'assets/icon-moon.svg') {
        TemaDark()
        getIdStrong('white', '#1e2139')
        MudarCorInput('white')
    } else {
        TemaClean()
        getIdStrong('black', 'white')
        MudarCorInput('black')
    }
})
function TemaDark() {
    body.style.backgroundColor = '#141625'
    conteudoTopH2.style.color = 'white'
    tema.setAttribute('src', 'assets/icon-sun.svg')
    statusFiltro.style.color = 'white'
    listaFiltros.style.color = 'white'
    idInvoice2.style.color = 'white'
    clientEmail.style.color = 'white'
    clientName2.style.color = 'white'
    invoiceDate.style.color = 'white'
    paymentDue2.style.color = 'white'
    goBackH5.style.color = 'white'
    nameEdit.style.color = 'white'
    criarNovaFatura.style.backgroundColor = '#141625'
    conteinerSomaitems.style.backgroundColor = '#0c0e16'
    listaFiltros.setAttribute('bck-dark', '')
    conteinerInfo.setAttribute('bck-dark', '')
    conteinerTop.setAttribute('bck-dark', '')
    botaoAddNovoItem.style.backgroundColor = '#373b53'
    ulPaymentTerms.style.backgroundColor = '#272937'
    ulPaymentTerms.style.color = 'white'
    ulPaymentTerms.style.boxShadow = '0px 6px 16px -2px #060606'
}

function TemaClean() {
    body.removeAttribute('style')
    conteudoTopH2.removeAttribute('style')
    tema.setAttribute('src', 'assets/icon-moon.svg')
    statusFiltro.removeAttribute('style')
    listaFiltros.removeAttribute('style')
    idInvoice2.removeAttribute('style')
    clientEmail.removeAttribute('style')
    clientName2.removeAttribute('style')
    invoiceDate.removeAttribute('style')
    paymentDue2.removeAttribute('style')
    goBackH5.removeAttribute('style')
    nameEdit.removeAttribute('style')
    criarNovaFatura.style.backgroundColor = 'white'
    conteinerSomaitems.removeAttribute('style')
    listaFiltros.removeAttribute('style')
    conteinerInfo.removeAttribute('bck-dark')
    conteinerTop.removeAttribute('bck-dark')
    botaoAddNovoItem.removeAttribute('style')
    ulPaymentTerms.removeAttribute('style')
}

function getIdStrong(cor, bck) {
    const getIdInvoiceStrong = document.querySelectorAll('.id-invoice strong')
    const getInvoiceTotal = document.querySelectorAll('.invoice-total')
    const getBlocoInvoice = document.querySelectorAll('.bloco-invoice')
    getIdInvoiceStrong.forEach((e, i) => {
        e.style.color = cor
        getInvoiceTotal[i].style.color = cor
        getBlocoInvoice[i].style.backgroundColor = bck
    })
}
const input = document.querySelectorAll('input')
function MudarCorInput(cor) {
    input.forEach(e => {
        e.style.color = cor
    })
}

let id = 'SN0000'
let statusDados = 'pending'

function enviarFormulario() {
    let dataHoje = new Date().toLocaleDateString('pt-br')
    const clientName = document.querySelector('#name').value
    const createdAt = dataHoje.substring(6, 10) + '-' + dataHoje.substring(3, 5) + '-' + dataHoje.substring(0, 2)
    const paymentDue = document.querySelector('#date').value
    let paymentDueFormatado = paymentDue.substring(6, 10) + '-' + paymentDue.substring(3, 5) + '-' + paymentDue.substring(0, 2)
    const description = document.querySelector('#description').value
    const clientEmail = document.querySelector('#email').value

    const dados = {
        id: id,
        createdAt: createdAt,
        paymentDue: paymentDueFormatado,
        description: description,
        clientName: clientName,
        clientEmail: clientEmail,
        status: statusDados,
        senderAddress: {
            street: inputSenderAddress.value,
            city: inputSenderCity.value,
            postCode: inputSenderPostalCode.value,
            country: inputSenderCountry.value
        },
        clientAddress: {
            street: inputClientAddress.value,
            city: inputClientCity.value,
            postCode: inputClientPostalCode.value,
            country: inputClientCountry.value
        },
        items: [],
        total: []
    }

    objItems()

    function objItems() {
        const itemName = document.querySelectorAll('.input-nome')
        const itemQtd = document.querySelectorAll('.input-quantidade')
        const itemPreco = document.querySelectorAll('.input-preco')
        const itemTotal = document.querySelectorAll('.soma-valor-total')
        let soma = 0
        for (let i = 0; i < contadorItem; i++) {
            dados.items.push({ name: itemName[i].value, quantity: itemQtd[i].value, price: itemPreco[i].value, total: itemTotal[i].innerHTML })
            soma = soma + parseFloat(itemTotal[i].innerHTML)
        }
        dados.total = soma
    }
    puxarDados(dados, '', false)

}


function puxarDados(dados, index, editar) {
    fetch("data.json").then(resposta => {
        resposta.json().then(data => {
            if(typeof dados === 'object' && editar === false) {
                data.splice(0, 1, dados, data[0])
            } else if(typeof index === 'number' && editar === false) {
                data.splice(index, 1)
            } else if(editar === true) {
                data.splice(index, 1, dados)
            }

            fetch("data.json", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                // .then(response => {
                //     if (!response.ok) {
                //         throw new Error('Erro ao adicionar dados.');
                //     }
                //     return response.text();
                // })
                .then(data => {
                    alert(data); // Exibir mensagem de sucesso
                })
                .catch(error => {
                    console.error(error);
                    alert('Ocorreu um erro. Por favor, tente novamente.');
                });
        })
    })
}