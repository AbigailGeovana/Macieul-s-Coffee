const TOKEN = '73f0b83ef01dce03717091bd11a7a64efc607b32';
const END_FUNCIONAL = `https://cipaon.com.br/api/produto.php?token=${TOKEN}&idCategoria=1`;
const ADD_PEDIDO = 'https://www.fateclins.edu.br/felipeMaciel/macieulsCoffee/api/v2/pedido.php';

/*init();

function init(){
    adicionarPedido();
}*/
//teste
let arrPedido = [];

    function adicionarPedido(){
        console.log('entrei');
        $('#btn-adicionar-pedido').click(function () {
            console.log('entrei');
            $.ajax({
                url: ADD_PEDIDO,
                method: 'POST',
                data: {
                    token: '73f0b83ef01dce03717091bd11a7a64efc607b32',
                    mesa: 1,
                    total: 10,
                    pedido: JSON.stringify(arrPedido)
                },
                success: function (a, b, c) {
                    //console.log(data);
                    if (c.status === 201) {
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

    // idItemPedido: 100,
    // idPedido: 1,
    // nome: 'Lasanha',
    // quantidade: 2,
    // status: 'Aguardando',
    // token: TOKEN,
    // datahora: '',
    // mesa: 1