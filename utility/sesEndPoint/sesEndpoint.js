const express = require('express');
const _ = require('lodash');
const { render } = require('ejs');
const app = express();

// carica i moduli delle route
const routes = require('./routes/routes');

// avvio di base
app.listen(3033);

app.use(express.json());
app.set('x-powered-by', false)
app.set('trust proxy', true)

app.use(express.static('public'));
app.use(express.urlencoded( { extended: true } ));

//app.get('/', checkUrl, (req, res) => { res.redirect(`/${lang}`);});

app.use('/api', routes);

//avoid 404 by 301 redirect in dbTable else return 404 
app.use( (req,res) => {
    // const var404=tools42.avoid404(req.protocol + '://' + req.get('host') + req.originalUrl, 'json');
    // if (var404 != null) { res.redirect(301, req.protocol + '://' + req.get('host') + var404) } 
    // else { res.status(404).render(`404-${lang}`,  {nerror:404, titolo:"404"} ) }
    console.log(req.headers);
    res.status(404).json({"status": 404});
} )