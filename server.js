const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const methodOverride = require('method-override')
const articleRouter = require('./routes/articles')
require('dotenv/config')
const app = express()

// DB connection
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.DB_CONNECTION);
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/articles', (req, res) => {
    res.redirect('/')
})

app.get('/', async (req, res) => {
    const articles = await Article.find({}).sort({ createdAt: 'desc' })
    res.render('articles/index', { articles })
})

app.use('/articles', articleRouter)

app.get('*', function (req, res) {
    res.status(404).render('articles/notfound');
});

app.listen(5000, () => {
    console.log(`Server running in port 5000...`)
})