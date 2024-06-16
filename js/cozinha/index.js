const TOKEN = '73f0b83ef01dce03717091bd11a7a64efc607b32';
const END_FUNCIONAL = `https://cipaon.com.br/api/produto.php?token=${TOKEN}`;
var conteudoProduto = '';
var newResponse = '';


init();

    function init(){
        //criarProduto();
        listarProdutos();
        componentInit();
    }

    function componentInit() {
        $.tab();
        $.tab('change tab', 'tab-produtos');
        $('#menu .menu-item').click(function () {
            let abaAtiva = $(this).attr('data-tab-name');
            $.tab('change tab', abaAtiva);
        });
        $('.special.cards .image').dimmer({ on: 'click' });
    }

    function criarProduto() {
        $.ajax({
            url: "https://cipaon.com.br/api/produto.php",
            method: "POST",
            data: {
                token: "73f0b83ef01dce03717091bd11a7a64efc607b32",
                nome: "Amora",
                idCategoria: 3,
                foto: "https://dairyfarmersofcanada.ca/sites/default/files/styles/recipe_image/public/image_file_browser/conso_recipe/2022/Capuccino.jpg.jpeg",
                preco: 71.00,
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

    function orderByCategoria(a, b) {
        return a - b;
    }

    /*function listarProdutos() {
      ->FORMA DE FAZER COM AJAX<-
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
              
    function listarProdutos() {
        $.getJSON(END_FUNCIONAL, function (response){

            //categoria
            newResponse = response.sort(orderByCategoria);

            //testar caracter especial
            newResponse.sort(function(a, b) {
                return a.nome.localeCompare(b.nome);
            }); 

            newResponse.forEach(element => {
                conteudoProduto += `<div class="ui card fluid" id="produto-${element.idProduto}">
                                                <div class="ui top brown attached label">${element.nome}</div>
                                                <div class="blurring dimmable image">
                                                
                                                    <div class="ui green bottom right attached label">${element.idCategoria}</div>
                                                    <img src="${element.foto}">
                                                </div>
                                                <div class="extra content">
                                                    <div class="ui three buttons">
                                                        <div id="edite" class="ui icon button basic editar" data-item="edit">
                                                            <i class="edit icon"></i>
                                                        </div>
                                                        <div id="delete" class="ui icon button basic deletar" data-item="del">
                                                            <i class="delete icon"></i>
                                                        </div>
                                                    </div>
                                                </div>
                                    </div>`;
            });
            $('#menu-produtos').append(conteudoProduto);
        });

    }

    $('#menu-produtos').on('click','#delete', function(){
        let item = $(this).closest('.ui.card').attr('id').split('-')[1];

        confirmarExclusao(item);

        $('.ui.modal')
            .modal('show')
        ;
    });

    function confirmarExclusao(item){
        $('#confirma-excluir-produtos').empty();

        produto = newResponse.find(prod => prod.idProduto == item);
        conteudo = `
        <div class="ui grid">
            <div class="four wide column">
                <div class="ui medium image">
                    <img src="${produto.foto}">
                </div>
            </div>
            <div class="twelve wide column">
                <div class="description">
                    <div class="ui header">${produto.nome}</div>
                    <p>Tem certeza de que deseja excluir o item selecionado?</p>
                </div>
            </div>
            <div class="twelve wide column right aligned">
                <div class="actions">
                    <div class="ui black deny button">Não</div>
                    <div class="ui positive right labeled icon button" id="deletar-produto">Sim, excluir
                        <i class="checkmark icon"></i>
                    </div>
                </div>
            </div>
        </div>`;

        $('#confirma-excluir-produtos').append(conteudo);

         //$('#confirma-excluir-produtos').off('click', '#deletar-produto').on('click', '#deletar-produto', function(){
        $('#deletar-produto').off('click').on('click', function() {
            excluirProduto(item);
            $('.ui.modal').modal('hide');
        });

        $('.ui.black.deny.button').off('click').on('click', function() {
            $('.ui.modal').modal('hide');
        });
    }

    /*function excluirProduto(item){
        ->FORMA DE FAZER COM FETCH<-
       fetch(`https://cipaon.com.br/api/produto.php?token=${TOKEN}&idProduto=${item}`, {
            method: "DELETE",  
        }) 
        
        .then(response => {
            if (response.ok) {
                $(`#produto-${item}`).remove();
            } else {
                console.error('Erro ao excluir o produto');
            }
        })
        .catch(error => {
            console.error('Erro ao conectar-se à API:', error);
        });
    }*/

    function excluirProduto(item){
        const DELETE = `https://cipaon.com.br/api/produto.php?token=${TOKEN}&idProduto=${item}`;
        $.ajax({
            url: DELETE,
            type: 'DELETE',
            success: function (response) {
                console.log('produto deletado', item);
                $(`#produto-${item}`).remove();
            },
            error: function (error) {
                console.log(error);
            }
        })
    }
       
    $('#menu-produtos').on('click','#edite', function(){
        console.log('entrei no edit');
        let item = $(this).closest('.ui.card').attr('id').split('-')[1];
       console.log(item);
    });

   
    


