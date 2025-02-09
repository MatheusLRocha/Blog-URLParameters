const divContent = document.querySelector('.content');

const queryStr = window.location.search;        // Pega a string da URL
const url = new URLSearchParams(queryStr);      // Pega os parâmetros da URL depois do "?"

const title = url.get('inTitle');               // Pega o valor do parâmetro "itTitle"
const text = url.get('inText');                 // Pega o valor do parâmetro "inText"

// Função para criar um blog
function createBlog(title, text) {
    const divBlog = document.createElement('div');
    divBlog.className = "blog-container";

    const h1 = document.createElement('h1');
    const h1Title = document.createTextNode(title);

    const p = document.createElement('p');
    const pText = document.createTextNode(text);

    h1.appendChild(h1Title);
    p.appendChild(pText);

    divBlog.appendChild(h1);
    divBlog.appendChild(p);

    divContent.appendChild(divBlog);
}

// Função para salvar os blogs
function saveBlogs(title, text) {
    // array blogs recebe localStorage se tiver algum valor dentro ou uma array vazia
    let blogs = JSON.parse(localStorage.getItem('blogs')) || [];  // JSON.parse() transforma uma string JSON em objeto JavaScript
    blogs.push({title, text});                                    // Adiciona o novo blog criado e ja salva ele 
    localStorage.setItem('blogs', JSON.stringify(blogs));         // Salva o blog criado e os outros antes criados. JSON.stringify() transforma um objeto JavaScript em string JSON
}

// Função para mostrar os blogs criados
function showBlogs() {
    if (!localStorage.getItem('blogs')) {       // Se não tiver nenhum blog, avisa e retorna à página
        alert('You don\'t have blogs yet');
        return;
    } else {
        const blogs = JSON.parse(localStorage.getItem('blogs'));    // array blogs pega string de localStorage e transforma em objeto JavaScript
        blogs.forEach(blog => {                                     // Para cada objeto JS, cria um blog
            createBlog(blog.title, blog.text);
        });
    }
}

if (title && text) {            // Se na URL existem título e texto...
    saveBlogs(title, text);     // Salva blog
} else {
    console.log('Parameters missing in URL. Title and Text are required');
}

window.addEventListener('load', showBlogs());   // Quando a página carrega, mostra os blogs




