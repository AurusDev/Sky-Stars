# 🌌 Sky Stars

O **Sky Stars** é um mapa estelar interativo desenvolvido para proporcionar uma experiência imersiva de exploração astronômica diretamente no navegador. O projeto utiliza renderização baseada em dados (**Data-Driven Rendering**) para desenhar constelações dinamicamente.

---

## 🚀 Funcionalidades

*   **Navegação Infinita:** Explore um céu de 4000x4000 pixels com um sistema de arrasto suave.
*   **Modos de Interação:**
    *   ✋ **Mover:** Arraste para navegar pelo espaço.
    *   ↗️ **Selecionar:** Clique nas estrelas para abrir detalhes técnicos.
*   **Info-Cards Detalhados:** Ao selecionar uma estrela, um painel lateral é exibido com distância (ly), magnitude e descrição histórica/científica.
*   **Renderização Automática:** As linhas das constelações são calculadas via JavaScript (hipotenusa e ângulos de rotação) com base nas coordenadas das estrelas.
*   **Estética Moderna:** Interface inspirada em *Glassmorphism*, utilizando efeitos de blur e ícones profissionais.

## 🛠️ Tecnologias Utilizadas

*   **HTML5 & CSS3:** Estrutura e estilização avançada com filtros de desfoque e animações de transição.
*   **JavaScript (Vanilla):** Lógica de manipulação de DOM, cálculos matemáticos para conexões e gerenciamento de estado.
*   **Feather Icons:** Biblioteca de ícones minimalistas para a interface de usuário.
*   **Matemática de Vetores:** Uso de `Math.atan2` e Pitágoras para o posicionamento dinâmico das linhas conectoras.

## 📂 Estrutura do Projeto
```text
├── index.html   # Estrutura principal e importação de bibliotecas
├── style.css    # Estilização, efeitos de brilho e layout do card
└── script.js    # Banco de dados das estrelas e motor de renderização