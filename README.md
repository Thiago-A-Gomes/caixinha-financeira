# Expense Management

Mini site para organizar a vida financeira por caixinhas: contas fixas, contas mensais, reserva e metas.

## Login e seguranca

Cada pessoa cria um usuario e uma senha neste aparelho. As caixinhas ficam separadas por usuario.

As senhas nao ficam salvas em texto puro: o app usa derivacao criptografica no navegador e criptografa os dados financeiros de cada conta localmente.

Por ser um site estatico, esse login protege os dados salvos no navegador do aparelho, mas nao substitui um backend com contas online, recuperacao de senha e sincronizacao entre celulares.

## Arquitetura

O codigo foi separado em camadas com ES Modules:

- `src/domain/`: estado, regras financeiras e validacoes.
- `src/application/`: casos de uso de autenticacao, financas, dashboard e exportacao.
- `src/infrastructure/`: `localStorage` e Web Crypto.
- `src/presentation/`: DOM, views e componentes.
- `src/shared/`: constantes e utilitarios.
- `src/main.js`: ponto de entrada que conecta as camadas.

Veja mais detalhes em `docs/ARQUITETURA.md`.

Para testar localmente, sirva por HTTP:

```powershell
node scripts/dev-server.mjs
```

Depois abra `http://127.0.0.1:5173/`.

## Como usar no celular

Depois de publicar no GitHub Pages, abra o link pelo navegador do celular.

No Android, toque no menu do Chrome e escolha **Adicionar a tela inicial**.

No iPhone, abra no Safari, toque em compartilhar e escolha **Adicionar a Tela de Inicio**.

Os dados ficam salvos no navegador do aparelho. Se voce trocar de celular ou limpar os dados do navegador, os lancamentos desse aparelho podem sumir.

## Como publicar no GitHub Pages

1. Crie um repositorio novo no GitHub.
2. Envie estes arquivos para o repositorio:
   - `index.html`
   - `assets/`
   - `src/`
   - `scripts/`
   - `docs/`
   - `manifest.webmanifest`
   - `service-worker.js`
   - `icon.svg`
   - `.nojekyll`
   - `.gitignore`
3. No GitHub, entre em **Settings > Pages**.
4. Em **Build and deployment**, escolha **Deploy from a branch**.
5. Selecione a branch `main` e a pasta `/root`.
6. Salve e aguarde o GitHub gerar o link.

O link costuma ficar assim:

```text
https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/
```
