const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const fs = require('fs');

app.use(express.static('.'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/teste', (req, res) => res.send('Ok'))
app.listen(8080, ()=> console.log('Executando...'))

app.post('/data.json', (req, res) => {
    // Ler os dados atuais do arquivo JSON
    fs.readFile('data.json', 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao ler o arquivo JSON.');
      }
  
      let jsonData = JSON.parse(data);
  
      // Adicionar os novos dados aos dados existentes
      // jsonData.push(req.body);
      jsonData = req.body
      // Escrever os dados atualizados de volta no arquivo JSON
      fs.writeFile('data.json', JSON.stringify(jsonData), 'utf8', (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Erro ao escrever no arquivo JSON.');
        }
        
        res.send('Dados adicionados com sucesso.');
      });
    });
});