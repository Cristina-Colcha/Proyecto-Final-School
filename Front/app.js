import express from 'express';

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

// Redirecciones a los microservicios
app.get('/microservice1', (req, res) => res.redirect('http://localhost:3001'));
app.get('/microservice2', (req, res) => res.redirect('http://localhost:3002'));
app.get('/microservice3', (req, res) => res.redirect('http://localhost:3003'));
app.get('/microservice4', (req, res) => res.redirect('http://localhost:3004'));
app.get('/microservice5', (req, res) => res.redirect('http://localhost:3005'));
app.get('/microservice6', (req, res) => res.redirect('http://localhost:3006'));
app.get('/microservice7', (req, res) => res.redirect('http://localhost:3007'));
app.get('/microservice8', (req, res) => res.redirect('http://localhost:3008'));
app.get('/microservice9', (req, res) => res.redirect('http://localhost:3009'));
app.get('/microservice10', (req, res) => res.redirect('http://localhost:3010'));
app.get('/microservice11', (req, res) => res.redirect('http://localhost:3011'));
app.get('/microservice12', (req, res) => res.redirect('http://localhost:3012'));
app.get('/microservice13', (req, res) => res.redirect('http://localhost:3013'));
app.get('/microservice14', (req, res) => res.redirect('http://localhost:3014'));
app.get('/microservice15', (req, res) => res.redirect('http://localhost:3015'));
app.get('/microservice16', (req, res) => res.redirect('http://localhost:3016'));
app.get('/microservice17', (req, res) => res.redirect('http://localhost:3017'));
app.get('/microservice18', (req, res) => res.redirect('http://localhost:3018'));
app.get('/microservice19', (req, res) => res.redirect('http://localhost:3019'));
app.get('/microservice20', (req, res) => res.redirect('http://localhost:3020'));

app.listen(port, () => {
  console.log(`Servidor frontend corriendo en http://localhost:${port}`);
});
