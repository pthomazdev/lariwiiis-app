const lista = document.getElementById('historico-lista');
const nomesDias = ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"];

function carregarHistorico() {
    // Pegamos todas as chaves do banco de dados do navegador
    const chaves = Object.keys(localStorage).filter(key => key.startsWith('semana-'));
    
    // Se não houver dados
    if (chaves.length === 0) {
        lista.innerHTML = "<p>Nenhum dado registrado ainda.</p>";
        return;
    }

    chaves.sort().reverse(); // Mostra a semana mais recente primeiro

    chaves.forEach(chave => {
        const dados = JSON.parse(localStorage.getItem(chave));
        
        // Formata a linha dos dias: dom 0 | seg 5 | ...
        const linhaDias = dados.map((valor, index) => {
            return `${nomesDias[index]} ${valor}`;
        }).join(" | ");

        // Cria o elemento na tela
        const div = document.createElement('div');
        div.className = 'semana-card';
        div.innerHTML = `<strong>${chave.replace(/-/g, " ")}:</strong> ${linhaDias}`;
        lista.appendChild(div);
    });
}

carregarHistorico();