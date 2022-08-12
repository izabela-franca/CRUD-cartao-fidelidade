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


//Inserindo novos registros
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


// app.post('/compras', async(req, res) => {
//     await compra.create(
//         req.body
//     ).then(function(){     
//         return res.json({
//             error: false,
//             message: 'Compra realizada com sucesso.'
//         })
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: 'Não foi possível se conectar.'
//         })
//     });
// });

// app.post('/promocoes', async(req, res) => {
//     await promocao.create(
//             req.body
//     ).then(function(){     
//         return res.json({
//             error: false,
//             message: 'Promoção criada com sucesso.'
//         })
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: 'Não foi possível se conectar.'
//         })
//     });
// });

// app.post('/empresas', async(req, res) => {
//     await empresa.create(
//             req.body
//     ).then(function(){     
//         return res.json({
//             error: false,
//             message: 'Empresa criada com sucesso.'
//         })
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: 'Não foi possível se conectar.'
//         })
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


//Retornando todos os cartões criados
app.get('/listacartoes', async(req, res) => {
    await cartao.findAll({
        order: [['id', 'ASC']]   
    }).then(function(cartoes){
        res.json({cartoes})
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


// //Retornando todas as promoções
// app.get('/listapromocoes', async(req, res) => {
//     await promocao.findAll({
//         order: [['id', 'DESC']]   
//     }).then(function(promocoes){
//         res.json({promocoes})
//     });
// });

// //Retornando todas as empresas cadastradas
// app.get('/listaempresas', async(req, res) => {
//     await empresa.findAll({
//         order: [['nome', 'DESC']]   
//     }).then(function(empresas){
//         res.json({empresas})
//     });
// });


/*--------------Criando Updates--------------*/

//Realizando e retornando as alterações feitas
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

// app.put('/editapromocao', async(req, res) => {
//     await promocao.update(req.body, {
//         where: {id: req.body.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Promoção alterada com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro na alteração da promoção."
//         });
//     });
// });

// app.put('/editaempresa', async(req, res) => {
//     await empresa.update(req.body, {
//         where: {id: req.body.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Empresa alterada com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro na alteração da empresa."
//         });
//     });
// });


/*--------------Criando Exclusões--------------*/

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

// app.get('/excluirpromocao/:id', async(req, res) => {
//     await promocao.destroy({
//         where: {id: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Promoção excluída com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro ao excluir a promoção."
//         });
//     });
// });

// app.get('/excluirempresa/:id', async(req, res) => {
//     await empresa.destroy({
//         where: {id: req.params.id}
//     }).then(function(){
//         return res.json({
//             error: false,
//             message: "Empresa excluída com sucesso!"
//         });
//     }).catch(function(erro){
//         return res.status(400).json({
//             error: true,
//             message: "Erro ao excluir a empresa."
//         });
//     });
// });


/*--------------Criando portas de acesso--------------*/

let port = process.env.PORT || 3001;

app.listen(port, (req, res)=>{
    console.log('Servidor ativo: http://localhost:3001');
})