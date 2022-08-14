/*--------------Criando a camada de Controller--------------*/

//Importando os módulos 
const express = require ('express');
const cors =  require ('cors');
const models = require('./models'); 


//Iniciando a criação do Controller 
const app = express();
app.use(cors());
app.use(express.json());    


//Criando variáveis para se associarem a cada classe
let cliente = models.Cliente;
let cartao = models.Cartao;
let compra = models.Compra;
let promocao = models.Promocao;
let empresa = models.Empresa;


// /*--------------Criando Inserções--------------*/

//Definindo rotas e configurando mensagens
app.get('/', function(req, res){
    res.send('Olá, mundo!')
});


//Inserindo novos registros de clientes
app.post('/clientes', async(req, res) => {
    await cliente.create(
        req.body
    ).then(function(){     
        return res.json({
            error: false,
            message: 'Cliente criado com sucesso.'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


//Inserindo novos registros de cartões
app.post('/cliente/:id/cartoes', async(req, res) => {
    const cart = {
        ClienteId: req.params.id,
        dataCartao: req.body.dataCartao,
        validade: req.body.validade
    };

    if (! await cliente.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Cliente não existe."
        });
    };

    await cartao.create(cart)
    .then(cartcli =>{     
        return res.json({
            error: false,
            message: 'Cartão criado com sucesso.',
            cartcli
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


//Inserindo novos registros de empresas
app.post('/empresas', async(req, res) => {
    await empresa.create(
            req.body
    ).then(function(){     
        return res.json({
            error: false,
            message: 'Empresa criada com sucesso.'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


//Inserindo novos registros de promoções
app.post('/empresa/:id/promocao', async(req, res) => {  
    const promo = {
        EmpresaId: req.params.id,
        nome: req.body.nome,
        descricao: req.body.descricao,
        validade: req.body.validade   
    };

    if (! await empresa.findByPk(req.params.id)){
        return res.status(400).json({
            error: true,
            message: "Empresa não existe."
        });
    };

    await promocao.create(promo)
    .then(promoempre =>{     
        return res.json({
            error: false,
            message: 'Promoção criado com sucesso.',
            promoempre
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


//Inserindo novos registros de compras
app.post('/cartao/:idcartao/promocao/:idpromocao/compra', async(req, res) => {
    const comp = {
        date: req.body.date,
        quantidade: req.body.quantidade,
        valor: req.body.valor,
        CartaoId: req.params.idcartao,
        PromocaoId: req.params.idpromocao,  
    };

    if (! await cartao.findByPk(req.params.idcartao) && promocao.findByPk(req.params.idpromocao)){
        return res.status(400).json({
            error: true,
            message: "Empresa não existe."
        });
    };
 
    if (! await promocao.findByPk(req.params.idpromocao)){
        return res.status(400).json({
            error: true,
            message: "Promocao não existe."
        });
    };

    await compra.create(comp)
    .then(compcartpromo =>{     
        return res.json({
            error: false,
            message: 'Compra realizada com sucesso.',
            compcartpromo
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


/*--------------Criando Consultas--------------*/

//Retornando todos os clientes existentes
app.get('/listaclientes', async(req, res) => {
    await cliente.findAll({
        order: [['nome', 'ASC']]   
    }).then(function(clientes){
        res.json({clientes})
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        });
    });
});


//Retornando todos os cartões cadastrados
app.get('/listacartoes', async(req, res) => {
    await cartao.findAll({
        order: [['id', 'ASC']]   
    }).then(function(cartoes){
        res.json({cartoes})
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        });
    });
});


//Retornando todas as empresas cadastradas
app.get('/listaempresas', async(req, res) => {
    await empresa.findAll({
        order: [['nome', 'ASC']]   
    }).then(function(empresas){
        res.json({empresas})
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        });
    });
});


//Retornando todas as promoções cadastradas
app.get('/listapromocoes', async(req, res) => {
    await promocao.findAll({
        order: [['id', 'ASC']]   
    }).then(function(promocoes){
        res.json({promocoes})
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        });
    });
});


//Retornando todas as compras realizadas
app.get('/listacompras', async(req, res) => {
    await compra.findAll({
        order: [['data', 'DESC']]   
    }).then(function(compras){
        res.json({itempedidos})
    }).catch(erro=>{
        return res.status(400).json({
            error: true,
            message: "Não foi possível se conectar."
        });
    });
});


/*--------------Criando Updates--------------*/

//Realizando e retornando as alterações feitas em clientes
app.put('/editacliente/:id', async(req, res) => {
    await cliente.update(req.body, {
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cliente."
        });
    });
});


//Realizando e retornando as alterações feitas em cartões
app.put('/editacartao/:id', async(req, res) => {  
    await cartao.update(req.body, {
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cartão alterado com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração do cartão."
        });
    });
});


//Realizando e retornando as alterações feitas em empresas
app.put('/editaempresa/:id', async(req, res) => {
    await empresa.update(req.body, {
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Empresa alterada com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração da empresa."
        });
    });
});


//Realizando e retornando as alterações feitas em promoções
app.put('/editapromocao/:id', async(req, res) => {
    await promocao.update(req.body, {
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Promoção alterada com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro na alteração da promoção."
        });
    });
});



// app.put('/editacompra/:id', async(req, res) => {
//     await compra.update(req.body, {
//         where: {id: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Compra alterada com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro na alteração da compra."
//         });
//     });
// });


/*--------------Criando Exclusões--------------*/

//Excluindo clientes cadastrados
app.get('/excluircliente/:id', async(req, res) => {
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cliente excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cliente."
        });
    });
});


//Excluindo cartões cadastrados
app.get('/excluircartao/:id', async(req, res) => {
    await cartao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Cartão excluído com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir o cartão."
        });
    });
});


//Excluindo empresas cadastradas
app.get('/excluirempresa/:id', async(req, res) => {
    await empresa.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Empresa excluída com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a empresa."
        });
    });
});


//Excluindo promoções cadastradas
app.get('/excluirpromocao/:id', async(req, res) => {
    await promocao.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error: false,
            message: "Promoção excluída com sucesso!"
        });
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: "Erro ao excluir a promoção."
        });
    });
});


// app.get('/excluircompra/:id', async(req, res) => {
    //     await compra.destroy({
//         where: {id: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Compra excluída com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro ao excluir a compra."
//         });
//     });
// });


/*--------------Criando portas de acesso--------------*/

let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})