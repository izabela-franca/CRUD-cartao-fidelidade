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
app.post('/cartoes', async(req, res) => {
    await cartao.create(
        req.body  
    ).then(function(){      
        return res.json({
            error: false,
            message: 'Cartão criado com sucesso!'
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
app.post('/promocoes', async(req, res) => {
    await promocao.create(
            req.body
    ).then(function(){     
        return res.json({
            error: false,
            message: 'Promoção criada com sucesso.'
        })
    }).catch(function(erro){
        return res.status(400).json({
            error: true,
            message: 'Não foi possível se conectar.'
        })
    });
});


//Inserindo novos registros de compras
// app.post('/cartoes/:idcartao/promocoes/:idpromocao/compras', async(req, res) => {
//     const comp = {
//         date: req.body.date,
//         quantidade: req.body.quantidade,
//         valor: req.body.valor,
//         CartaoId: req.params.idcartao,
//         PromocaoId: req.params.idpromocao,
//     };
//     if (! await cartao.findbyPk(rep.params.id)){
//         return res.status(400).json({
//             error: true,
//             message: "Cliente não existe."
//         });
//     };
//     if (! await promocao.findbyPk(rep.params.id)){
//         return res.status(400).json({
//             error: true,
//             message: "Promoção não existe."
//         })
//     };
//     await compra.create(comp)
//     .then (compcli=>{
//         return res.json({
//             error: false,
//             message: "Compra foi inserida com sucesso!",
//             compcli
//         });
//     }).catch ( erro =>{
//         return res.status(400).json({
//             error: true,
//             message: "Não foi possível se conectar."
//         });
//     });
// });


/*--------------Criando Consultas--------------*/

//Retornando todos os clientes existentes
app.get('/listaclientes', async(req, res) => {
    await cliente.findAll({
        order: [['nome', 'ASC']]   
    }).then(function(clientes){
        res.json({clientes})
    });
});


//Retornando todos os cartões cadastrados
app.get('/listacartoes', async(req, res) => {
    await cartao.findAll({
        order: [['id', 'ASC']]   
    }).then(function(cartoes){
        res.json({cartoes})
    });
});


//Retornando todas as empresas cadastradas
app.get('/listaempresas', async(req, res) => {
    await empresa.findAll({
        order: [['nome', 'ASC']]   
    }).then(function(empresas){
        res.json({empresas})
    });
});


//Retornando todas as promoções cadastradas
app.get('/listapromocoes', async(req, res) => {
    await promocao.findAll({
        order: [['id', 'ASC']]   
    }).then(function(promocoes){
        res.json({promocoes})
    });
});


// //Retornando todas as compras realizadas
// app.get('/listacompras', async(req, res) => {
//     await compra.findAll({
//         order: [['data', 'DESC']]   
//     }).then(function(compras){
//         res.json({itempedidos})
//     });
// });


/*--------------Criando Updates--------------*/

//Realizando e retornando as alterações feitas em clientes
app.put('/editacliente', async(req, res) => {
    await cliente.update(req.body, {
        where: {id: req.body.id}
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
app.put('/editacartao', async(req, res) => {
    await cartao.update(req.body, {
        where: {id: req.body.id}
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
app.put('/editaempresa', async(req, res) => {
    await empresa.update(req.body, {
        where: {id: req.body.id}
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
app.put('/editapromocao', async(req, res) => {
    await promocao.update(req.body, {
        where: {id: req.body.id}
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



// app.put('/editacompra', async(req, res) => {
//     await compra.update(req.body, {
//         where: {id: req.body.id}
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