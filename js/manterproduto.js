const TOKEN = '73f0b83ef01dce03717091bd11a7a64efc607b32';
const END_FUNCIONAL = `https://cipaon.com.br/api/produto.php?token=${TOKEN}&idCategoria=1`;
const ADD_PEDIDO = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/pedido.php'; //end point com mal funcionamento


    initManterProduto();

    function initManterProduto(){
        //criarProduto();
        carregaMenuProdutos();
        componentInit();
    }

    function componentInit(){
        $.tab();
        $.tab('change tab', 'tab-produtos');
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

    function criarProduto() {
        $.ajax({
            url: "https://cipaon.com.br/api/produto.php",
            method: "POST",
            data: {
                token: "73f0b83ef01dce03717091bd11a7a64efc607b32",
                nome: "Goiaba",
                idCategoria: 2,
                foto: "www.biga.com/goiaba.png",
                preco: 54.00,
                descricao: "fresco e bom"
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            }
        })
    }

    /*function carregaMenuProdutos(){
        console.log('entrei lista');
        $.ajax({
            url: END_FUNCIONAL,
            method: 'GET',
            dataType: 'json',
            success: function(data) {
            console.log(data);
            },
            error: function(error) {
            console.error('Erro:', status, error);
            }
            });

    }*/

    function carregaMenuProdutos(){
        let conteudoProduto = '';

        $.getJSON(END_FUNCIONAL, function (response){
            console.log('entrei?',response);

            //testar caracter especial
            response.sort(function(a, b) {
                return a.nome.localeCompare(b.nome);
            }); 

            response.forEach(element => {
                console.log(element.nome);
                conteudoProduto += `<div class="ui card fluid">
                                                <div class="ui top brown attached label">${element.nome}</div>
                                                <div class="blurring dimmable image">
                                                    <div class="ui dimmer">
                                                        <div class="content">
                                                            <div class="center">
                                                                <div class="ui inverted button">${element.descricao}</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="ui green bottom right attached label">${us2brl(element.preco)}</div>
                                                    <img src="${element.foto}">
                                                </div>
                                                <div class="extra content">
                                                    <div class="ui three buttons">
                                                        <div class="ui icon button basic adicionar-remover-item" data-item="del">
                                                            <i class="minus icon"></i>
                                                        </div>
                                                        <div class="ui basic button quantidade" data-name="${element.nome}" data-price="${element.preco}">0
                                                        </div>
                                                        <div class="ui icon button basic adicionar-remover-item" data-item="add">
                                                            <i class="add icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>`;
            });
            $('#menu-produtos').append(conteudoProduto);
        });

    }


