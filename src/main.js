import api from './api';//colocar sempre o caminho relativo ./

class App {
    constructor(){
        this.repositories = [];
        
        this.formEl = document.getElementById('repo-form');
        this.inputEl = document.querySelector('input[name=repository]');
        this.listEl = document.getElementById('repo-list');
        
        this.registraHandlers();
    }
    
    registraHandlers(){
        this.formEl.onsubmit = event => this.addRepository(event);
    }

    setLoading(loading=true){
        if (loading) {
            let loagdingEl = document.createElement('span');
            loagdingEl.appendChild(document.createTextNode('CARREGANDO...'));
            loagdingEl.setAttribute('id', 'loading');

            this.formEl.appendChild(loagdingEl);
        }else{
            document.getElementById('loading').remove();
        }
    }
    
    async addRepository(){
        //evento prevent não deixa o form recarregar a pagina
        event.preventDefault();
        //pegando o nome do repositorios a ser buscado
        const repoInput = this.inputEl.value;
        
        if(repoInput.length === 0)
        return;
        
        this.setLoading();
        try {
            const response = await api.get(`/${repoInput}`);            
            const {name, html_url, avatar_url, bio} = response.data;
            
            this.repositories.push({
                name,
                bio,
                avatar_url,
                html_url,
            });
            
            this.render();
            
        } catch (error) {
            alert('O repositório não existe');
            console.log(`O repositório não existe: ${error}`);
        }
        this.setLoading(false);
    }
    
    render(){
        //Limpando a lista
        this.listEl.innerHTML = '';
        /* porque forEach e não map: 
        foreach apenas percorre o array enquanto o map serve tbm para alterar os intens */
        this.repositories.forEach(repo => {
            let imgEl = document.createElement('img');
            imgEl.setAttribute('src', repo.avatar_url);
            
            let titleEl = document.createElement('strong');
            titleEl.appendChild(document.createTextNode(repo.name));
            
            let descriptionEl = document.createElement('p');
            descriptionEl.appendChild(document.createTextNode(repo.bio));
            
            let linkEl = document.createElement('a');
            //blank para abrir em uma nova aba
            linkEl.setAttribute('target','_blank' );
            linkEl.setAttribute('href', repo.html_url);
            linkEl.appendChild(document.createTextNode('Acessar'));
            
            //Criando li com todos os outros itens
            let listItemEl = document.createElement('li');
            listItemEl.appendChild(imgEl);
            listItemEl.appendChild(titleEl);
            listItemEl.appendChild(descriptionEl);
            listItemEl.appendChild(linkEl);
            
            this.listEl.appendChild(listItemEl);
        });
        
    }
}

new App();