const TOKEN = '73f0b83ef01dce03717091bd11a7a64efc607b32';
const END_FUNCIONAL = `https://cipaon.com.br/api/produto.php?token=${TOKEN}`;
const URL = `https://cipaon.com.br/api/produto.php?`;
var newResponse = '';

init();

    function init(){
        consultarApiProdutos();
    }
  
    //------------------ LISTAR-FUNCIONALIDADE: LISTAR ------------------//
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
       
    function consultarApiProdutos(){
        $.getJSON(END_FUNCIONAL, function (response){
            newResponse = response;
            listarProdutos(newResponse);

        });
    }

    function ordenarExibicao(newResponse){

        newResponse.sort(function(a, b) {
            return a.idCategoria - b.idCategoria;
        });

        newResponse.sort(function(a, b) {
            if (a.idCategoria === b.idCategoria) {
                return a.nome.localeCompare(b.nome);
            }
            return 0; 
        });
    }

    function listarProdutos(newResponse) {
        ordenarExibicao(newResponse);
        
        var conteudoProduto = '';
        
        newResponse.forEach(element => {
            conteudoProduto += `<div class="ui card fluid" id="produto-${element.idProduto}">
                                    <div class="ui top brown attached label">${element.nome}</div>
                                    <div class="blurring dimmable image">    
                                       <div class="ui green bottom right attached label">${element.idCategoria}</div>
                                            <img src="${element.foto}">
                                    </div>
                                    <div class="extra content">
                                        <div class="ui three buttons">
                                            <a href="/editar.html?produto=${element.idProduto}" class="ui button">
                                                <i class="edit icon"></i>
                                            </a>
                                            <div id="delete" class="ui icon button basic deletar" data-item="del">
                                                <i class="delete icon"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
	});
	$('#menu-produtos').append(conteudoProduto);
}
//------------------ LISTAR-FUNCIONALIDADE: LISTAR ------------------//

//------------------ LISTAR-FUNCIONALIDADE: EXCLUIR ------------------//
$('#menu-produtos').on('click', '#delete', function () {
	let item = $(this).closest('.ui.card').attr('id').split('-')[1];

	confirmarExclusao(item);

	$('.ui.modal').modal('show');
});

function confirmarExclusao(item) {
	$('#confirma-excluir-produtos').empty();

	produto = newResponse.find((prod) => prod.idProduto == item);
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
	$('#deletar-produto')
		.off('click')
		.on('click', function () {
			excluirProduto(item);
			$('.ui.modal').modal('hide');
		});

	$('.ui.black.deny.button')
		.off('click')
		.on('click', function () {
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

function excluirProduto(item) {
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
		},
	});
}
//------------------ LISTAR-FUNCIONALIDADE: EXCLUIR ------------------//

//------------------ LISTAR-FUNCIONALIDADE: PESQUISA ------------------//
$(document).on('click', '#btn-procurar-generica', function () {
	$('#menu-produtos').empty();
	pesquisarProdutoGenerico();
});

$(document).on('click', '#btn-limpar-generica', function () {
	$('#menu-produtos').empty();
	$('#pesquisa-generica').val('');
	consultarApiProdutos();
});

function pesquisarProdutoGenerico() {
	let nomeProcurar = $('#pesquisa-generica').val();
	if (nomeProcurar == '') {
		alertaPesquisaGenericaVazia();
		return;
	} else {
		const resultadoProcurar = newResponse.filter(
			(json) => nomeProcurar == json.nome
		);
		listarProdutos(resultadoProcurar);
	}
}

function alertaPesquisaGenericaVazia() {
	$('#aviso-pesquisa-vazia').popup('show');
}
//------------------ LISTAR-FUNCIONALIDADE: PESQUISA ------------------//

//------------------ PESQUISAR-FUNCIONALIDADE: PESQUISA ------------------//
$('#pesquisa-dinamica').on('input', function () {
	pesquisarProduto();
});

function pesquisarProduto() {
	$('#menu-produtos').empty();

	let pesquisa = $('#pesquisa-dinamica').val();
	pesquisa.toLowerCase();

	const resultado = newResponse.filter((json) =>
		json.nome.toLowerCase().startsWith(pesquisa)
	);

	$('#pesquisa-generica').val('');
	listarProdutos(resultado);
}
//------------------ PESQUISAR-FUNCIONALIDADE: PESQUISA ------------------//

    //------------------ CRIAR-FUNCIONALIDADE: CRIAR ------------------//
    const inputs = $('#criar-produto').find('input[required], select[required]');
    const button = $('#btn-criar-produto');

    function checkInputs() {
        let allFilled = true;
        inputs.each(function() {
            if ($(this).is('select')){
                console.log('entrei')
                if ($(this).val() === '' || $(this).find('option:selected').is(':disabled')) {
                    allFilled = false;
                    return false;
                }
            } else {
                if ($(this).val() === '') {
                    allFilled = false;
                    return false;
                }
            }
           
        });
        button.prop('disabled', !allFilled);
    }

    inputs.on('input change', checkInputs);
    checkInputs();

$('#criar-produto').on('submit', function (event) {
	event.preventDefault();
	coletarDadosCreate($(this));
});

function coletarDadosCreate(form) {
	const dados = form.serializeArray();
	let dadosObj = {};
	let fieldsErr = [];

	dados.forEach((item) => {
		if (item.value == '' && item.name !== 'foto') {
			fieldsErr.push(item.name);
		}
		dadosObj[item.name] = item.value;
	});

	if (fieldsErr.length !== 0) {
		$('#erro-criacao-produtos').modal('show');

		conteudo = `O campo ${fieldsErr.toString()} está vazio!`;

		$('#errModel').append(conteudo);

		return;
	}

	criarProduto(dadosObj);
}

    function criarProduto(dadosObj) {
        $.ajax({
            url: URL,
            method: "POST",
            data: {
                token: TOKEN,
                nome: dadosObj.nome,
                idCategoria: dadosObj.categoria,
                foto: dadosObj.foto,
                preco: dadosObj.preco,
                descricao: dadosObj.descricao
            },
            success: function (data) {
                $('#escolha')
                    .modal('show')
                ; 

                modalEscolhaContinuarVisualizar();
                $('#criar-produto')[0].reset();
            },
            error: function (error) {
            }
        })
    }

function modalEscolhaContinuarVisualizar() {
	$('#escolha-produtos').empty();
	conteudo = `
                <div class=""> 
                    <a href="/listar.html">
                        <button class="ui button" id="btn-visualizar">Visualizar Produto</button>
                    </a>
                     <a href="/adicionar.html">
                        <button class="ui button">Continuar Criando</button>
                    </a>
                </div>
        `;

	$('#escolha-produtos').append(conteudo);
}
//------------------ CRIAR-FUNCIONALIDADE: CRIAR ------------------//

$('#editar-produto').on('submit', function (event) {
    const dados = form.serializeArray();
	let dadosObj = {};
	let fieldsErr = [];

	dados.forEach((item) => {
		if (item.value == '' && item.name !== 'foto') {
			fieldsErr.push(item.name);
		}
		dadosObj[item.name] = item.value;
	});

	if (fieldsErr.length !== 0) {
		$('#erro-criacao-produtos').modal('show');

		conteudo = `O campo ${fieldsErr.toString()} está vazio!`;

		$('#errModel').append(conteudo);

		return;
    }
    
    console.log(dadosObj);
	
    handleEdit(dadosObj)
});

function handleEdit(dadosObj) {
    $.ajax({
		url: END_FUNCIONAL,
		method: 'PUT',
		data: {
            idProduto: dadosObj.id,
            produto: {
                nome: dadosObj.nome,
                idCategoria: dadosObj.categoria,
                foto: dadosObj.foto,
                preco: dadosObj.preco,
                descricao: dadosObj.descricao
            }
		},
		success: function (data) {
			$('#escolha').modal('show');

			modalEscolhaContinuarVisualizar();
			$('#criar-produto')[0].reset();
		},
		error: function (error) {},
	});
}
