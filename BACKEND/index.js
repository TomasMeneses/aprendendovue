const restify = require('restify');
const errs = require('restify-errors');
const cors = require('cors');

const server = restify.createServer({
  name: 'myapp',
  version: '1.0.0'
});

function respond(req, res, next) {
  res.send('hello ' + req.params.name);
  next();
}

var knex = require('knex')({
    client: 'mysql',
    connection: {
      host : '127.0.0.1',
      user : 'root',
      password : '',
      database : 'bd'
    }
  });
  
server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(cors());  


server.listen(8000, function() {
  console.log('%s listening at %s', server.name, server.url);
});

//routes REST


server.get('/api/produtos', (req, res, next) => { 

    knex('TB_PRODUTO').then((dados) => {
        res.send(dados);
    }, next)
    
});

server.post('/api/produto', (req, res, next) => {
    
  knex('TB_PRODUTO')
      .insert(req.body)
      .then((dados) => {
     res.send(dados);
  }, next)
  
});

server.get('/api/produto/:id', (req, res, next) => {
    
const {id} = req.params;

  knex('TB_PRODUTO')
  .where('id',id)
  .first()
  .then((dados) => {
    if(!dados){
      return res.send(new errs.BadRequestError('Nada foi encontrado'));
    } else{
      res.send(dados);
    }
 
  }, next)
  
});

server.put('/api/produto/:id', (req, res, next) => {
    
  const {id} = req.params;
  
    knex('TB_PRODUTO')
    .where('id',id)
    .update(req.body)
    .then((dados) => {
      if(!dados){
        return res.send(new errs.BadRequestError('Nada foi encontrado'));
      } else{
        res.send('Dados Atualizados :)');
      }
   
    }, next)
    
  });

  server.del('/api/produto/:id', (req, res, next) => {
    
    const {id} = req.params;
    
      knex('TB_PRODUTO')
      .where('id',id)
      .delete()
      .then((dados) => {
        if(!dados){
          return res.send(new errs.BadRequestError('Nada foi encontrado'));
        } else{
          res.send('Dados Deletados :(');
        }
     
      }, next)
      
    });

