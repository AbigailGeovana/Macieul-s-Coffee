$(document).ready(function () {
    const MENU_BOLOS = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/produto.php?token=FE1508&idCategoria=1';
    
    const ADD_PEDIDO = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/pedido.php';
    
    let arrPedido = [];
    
    init();

    function init(){
        componentInit();
        carregaMenuBolos();
        addRemoveItem();
        limparPedido();
        limparPedidoBtn();
        checkOrder();
        order();
        //initManterProduto();
    }

    function componentInit(){
        $.tab();
        $.tab('change tab', 'tab-bolos');
        $('#menu .menu-item').click(function () {
            let abaAtiva = $(this).attr('data-tab-name');
            $.tab('change tab', abaAtiva);
        });
        $('.special.cards .image').dimmer({ on: 'click' });
    }

    function us2brl(valor) {
        return Number(valor).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function checkOrder() {
        $('#btn-confirmar').click(function () {
            $('#resumo-pedido').empty();
            $('.ui.modal').modal('show');
            let arrQuantidade = $('.quantidade');
            let nomeProduto;
            let valorUnitario;
            let valorTotal;
            let valorTotalPedido = 0;
            let conteudoResumo = '';
            let obj;

            // $('.quantidade').each(function(){
            //     console.log('--->', $(this).text());
            // });

            $.each(arrQuantidade, function (index, value) {
                quantidade = $(this).text();
                if (quantidade > 0) {
                    obj = {};
                    nomeProduto = $(this).attr('data-name');
                    valorUnitario = $(this).attr('data-price');
                    valorTotal = parseInt(quantidade) * valorUnitario;
                    valorTotalPedido += valorTotal;

                    // {nome: 'Ameixa', quantidade: '2'}
                    obj.nome = nomeProduto;
                    obj.quantidade = quantidade;
                    arrPedido.push(obj);

                    conteudoResumo += `<tr>
                                <td class="collapsing">${nomeProduto}</td>
                                <td class="collapsing ui center aligned">${quantidade}</td>
                                <td class="collapsing right">${us2brl(valorTotal)}</td>
                            </tr>`;
                }
            });

            $('#resumo-pedido').append(conteudoResumo);
            $('#valor-total').text(us2brl(valorTotalPedido));

        });
    }

    function order() {
        $('#btn-realizar-pedido').click(function () {
            $.ajax({
                url: ADD_PEDIDO,
                method: 'POST',
                data: {
                    token: 'FE1508',
                    mesa: $('#numero-mesa').val(),
                    total: $('#valor-total').text(),
                    pedido: JSON.stringify(arrPedido)
                },
                success: function (a, b, c) {

                    if (c.status === 201) {
                        limparPedido();
                        $('.ui.modal').modal('hide');
                        Swal.fire({
                            title: "Uhulll",
                            text: "Pedido realizado com sucesso!",
                            timer: 3000,
                            icon: "success",
                            showConfirmButton: false,
                        });
                    } else {
                        Swal.fire({
                            title: "Erro!",
                            text: "Faça o pedido novamente!",
                            timer: 3000,
                            icon: "error",
                            showConfirmButton: false,
                        });
                    }
                },
                error: function (error) {
                    console.error('Erro:', error);
                }
            });
        });
    }

    function addRemoveItem() {
        $('#menu-bolos').on('click', '.adicionar-remover-item', function () {
            let $element = $(this).parent().find('.quantidade');
            let operacao = $(this).attr('data-item');
            let quantidade = operacao === 'del' ? parseInt($element.text()) - 1 : parseInt($element.text()) + 1;
            quantidade = quantidade < 0 ? 0 : quantidade;
            $element.text(quantidade);
        });
    }

    function limparPedido() {
        $('.quantidade').text('0');
        $('#numero-mesa').val('');
    }

    function limparPedidoBtn() {
        $('#btn-limpar-pedido').click(function () {
            limparPedido();
        });
    }

    function carregaMenuBolos() {
        let conteudoMenu = '';
        $.getJSON(MENU_BOLOS, function (response) {
            response.forEach((item) => {
                conteudoMenu += `<div class="ui card fluid">
                                                <div class="ui top brown attached label">${item.nome}</div>
                                                <div class="blurring dimmable image">
                                                    <div class="ui dimmer">
                                                        <div class="content">
                                                            <div class="center">
                                                                <div class="ui inverted button">${item.descricao}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="ui green bottom right attached label">${us2brl(item.preco)}</div>
                                                    <img src="${item.foto}">
                                                </div>
                                                <div class="extra content">
                                                    <div class="ui three buttons">
                                                        <div class="ui icon button basic adicionar-remover-item" data-item="del">
                                                            <i class="minus icon"></i>
                                                        </div>
                                                        <div class="ui basic button quantidade" data-name="${item.nome}" data-price="${item.preco}">0
                                                        </div>
                                                        <div class="ui icon button basic adicionar-remover-item" data-item="add">
                                                            <i class="add icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
            });
            $('#menu-bolos').append(conteudoMenu);

        });

        // $.ajax({
        //     url: MENU_BOLOS,
        //     method: 'GET',
        //     dataType: 'json',
        //     success: function (response) {
        //         response.forEach((item) => {
        //             conteudoMenu += `<div class="ui card fluid">
        //                                 <div class="ui top brown attached label">${item.nome}</div>
        //                                 <div class="blurring dimmable image">
        //                                     <div class="ui dimmer">
        //                                         <div class="content">
        //                                             <div class="center">
        //                                                 <div class="ui inverted button">${item.descricao}</div>
        //                                             </div>
        //                                         </div>
        //                                     </div>
        //                                     <div class="ui green bottom right attached label">${item.preco}</div>
        //                                     <img src="${item.foto}">
        //                                 </div>
        //                                 <div class="extra content">
        //                                     <div class="ui three buttons">
        //                                         <div class="ui icon button basic adicionar-remover-item" data-item="del">
        //                                             <i class="minus icon"></i>
        //                                         </div>
        //                                         <div class="ui basic button quantidade">0
        //                                         </div>
        //                                         <div class="ui icon button basic adicionar-remover-item" data-item="add">
        //                                             <i class="add icon"></i>
        //                                         </div>
        //                                     </div>
        //                                 </div>
        //                             </div>`;
        //         });
        //         $('#menu-bolos').append(conteudoMenu);
        //     },
        //     error: function (error) {
        //         console.log(error);
        //     }
        // });
    }
});