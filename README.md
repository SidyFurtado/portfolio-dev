# Portfólio Developer - Sidy Furtado

Este repositório contém o código e a estrutura do meu **Portfólio de Desenvolvedor**. Aqui estão organizados meus projetos de desenvolvimento de software, abrangendo desde aplicações web, jogos interativos até engenharia de áudio (VSTs) e utilitários.

> [!NOTE]
> Este repositório é exclusivo para o portfólio de **desenvolvimento (Dev)**. O portfólio de **Filmmaker** é mantido de forma independente e não deve ser misturado com este espaço.

---

## 📂 Estrutura do Projeto

No momento, o terreno está sendo preparado para o início do desenvolvimento:

- `/projects-metadata/`: Contém os dados estruturados (`projects.json`) de todos os projetos que serão exibidos no site.
- `/.github/`: Fluxos de automação e deploy (futuro).
- `/.gitignore`: Arquivos ignorados no Git.

---

## 🛠️ Tecnologias a serem Empregadas (Sugestão)
- **Frontend**: HTML5, Vanilla CSS / TailwindCSS, JavaScript Moderno.
- **Estruturação**: Componentização limpa ou frameworks rápidos como React/Vite para renderização dinâmica dos projetos.
- **Hospedagem**: GitHub Pages com build automatizado via GitHub Actions.

---

## 💻 Projetos Catalogados no Portfólio

Os seguintes projetos estão mapeados no arquivo `projects-metadata/projects.json` e serão integrados à interface:

1. **Meu Dinheiro (Web)**: Sistema de controle financeiro pessoal descomplicado.
2. **AUREQ Parametric Equalizer (VST-Project)**: Plug-in VST de áudio e DSP desenvolvido em C++.
3. **Entre Nós**: Jogo de cartas e verdade ou consequência para casais (intimidade e diversão).
4. **Verdade ou Consequência**: Jogo de entretenimento adulto e social.
5. **Filmmaker Document Hub**: Centralizador de documentos e workflows para produção audiovisual.
6. **Meu Dinheiro (Landing Page)**: Página de download do aplicativo Meu Dinheiro.
7. **Lili Nervours**: Aplicação interativa em JavaScript.
8. **Aplicativo de Compras**: Lista de compras ágil e minimalista.

---

## 🚀 Como Adicionar Novos Projetos
Para adicionar ou atualizar informações sobre os projetos apresentados, basta editar o arquivo [projects.json](projects-metadata/projects.json) seguindo o formato:

```json
{
  "name": "nome-do-repo",
  "title": "Título Amigável",
  "description": "Breve descrição do projeto.",
  "url": "https://github.com/SidyFurtado/nome-do-repo",
  "primaryLanguage": "Linguagem Principal",
  "languages": ["Linguagem1", "Linguagem2"],
  "category": "Categoria"
}
```

---

*Nota: Este repositório está configurado para atualizar e enviar alterações automaticamente para o GitHub a cada commit local.*
