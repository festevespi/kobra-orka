# ORKA Landing Page

Landing page premium da **ORKA** — solução Kobra para tratamento, resfriamento, monitoramento e recirculação inteligente da água em granjas.

---

## Estrutura de arquivos

```
landing-page-orka/
├── index.html          ← Página principal
├── style.css           ← Estilos (design system completo)
├── main.js             ← Interações e animações (Vanilla JS)
├── config.js           ← ⚠️ Configurar antes de publicar
├── README.md           ← Este arquivo
└── assets/
    ├── images/
    │   ├── orka-hero.jpeg              ← Imagem principal do hero
    │   ├── orka-3d.png                 ← Vista 3D do equipamento
    │   ├── orka-front.png              ← Vista frontal
    │   ├── detail-dosers.jpeg          ← Detalhe dos dois dosadores
    │   ├── detail-pump-closeup.jpeg    ← Close-up do dosador KOREON Pro
    │   ├── detail-pump-front.jpeg      ← Vista frontal dos dosadores
    │   ├── detail-pump-angle.jpeg      ← Ângulo lateral dos dosadores
    │   ├── detail-pump-wide.jpeg       ← Vista ampla dos dosadores
    │   └── smartkobra-dashboard.png    ← Dashboard SmartKobra
    └── logos/
        ├── orka-logo-white.png         ← Logo ORKA+Kobra (branca, para fundo escuro)
        ├── orka-logo-color.png         ← Logo ORKA+Kobra (colorida)
        ├── orka-icon-bitone.png        ← Ícone ORKA (favicon)
        └── smartkobra-logo.png         ← Logo SmartKobra
```

---

## Como abrir

### Opção 1 — Diretamente no navegador (mais simples)
Abra o arquivo `index.html` diretamente no seu navegador (Chrome, Edge, Firefox). Todos os recursos são locais.

### Opção 2 — Servidor local (recomendado para produção e melhor performance)
Se você tiver Python instalado:
```bash
python -m http.server 8080
# Acesse: http://localhost:8080
```

Se você tiver Node.js instalado:
```bash
npx serve .
# ou
npx http-server .
```

---

## ⚠️ Configuração obrigatória antes de publicar

Abra o arquivo **`config.js`** e preencha:

```js
contato: {
  email: 'contato@kobra.com.br',     // ← E-mail real
  whatsapp: '+5511999999999',         // ← WhatsApp real (com DDI)
  telefone: '',                        // ← Telefone (opcional)
  site_kobra: 'https://kobra.com.br', // ← URL do site oficial
},
redes_sociais: {
  instagram: 'https://instagram.com/kobrabrasil',
  linkedin: 'https://linkedin.com/company/kobra',
  youtube: '',
  facebook: '',
},
legal: {
  politica_privacidade: 'https://kobra.com.br/privacidade',
},
```

---

## Arquivos originais utilizados

Os seguintes arquivos da pasta `K:\MARKETING\25 - DESIGN\CLEBER\ORKA` foram utilizados:

| Arquivo original | Utilização |
|---|---|
| `reference-variations (16).jpeg` | Hero e seção de especificações |
| `Orka - Koreon 2.png` | Manifesto e galeria |
| `Orka - Koreon.png` | Parâmetros e galeria |
| `reference-variations (11).jpeg` | Galeria e parâmetros |
| `reference-variations (12).jpeg` | Parâmetros (pH) |
| `reference-variations (13).jpeg` | Parâmetros (ORP) |
| `reference-variations (14).jpeg` | Recirculação |
| `reference-variations (15).jpeg` | Galeria |
| `Captura de tela 2026-07-23 172933.png` | Seção SmartKobra |
| `LOGO ORKA PDF_LOGO ORKA COM KOBRA HORIZONTAL MONO BRANCA.png` | Header e footer |
| `LOGO ORKA PDF_LOGO ORKA COM KOBRA HORIZONTAL 4 CORES.png` | Referência de cores |
| `LOGO ORKA PDF_LOGO ORKA SEM KOBRA VERTICAL BI-TOM .png` | Favicon |
| `Logo Smart Kobra.png` | Seção SmartKobra |

---

## Substituição de imagens

Para substituir qualquer imagem, copie o novo arquivo para `assets/images/` com o mesmo nome ou edite a referência correspondente no `index.html`.

**Para o hero**: substitua `assets/images/orka-hero.jpeg` por uma imagem de resolução mínima de 1920×1080px.

---

## Dados técnicos utilizados

Os dados abaixo foram extraídos do flyer oficial `FLYER ORKA.pdf`:

- Capacidade: até 42.000 aves
- Vazão de trabalho: 4.000 L/h
- Tipo de conexão: 1 polegada
- Temperatura máx. do ambiente: 43 °C
- Tensão/alimentação: 220 V monofásica
- Corrente elétrica: 35 A
- Dimensões: 180 cm × 140 cm × 190 cm
- Grau de filtragem: 75 micras
- Dosador de antidureza: recarga RF 1100
- Dosagem de saneantes: 0,045 a 125 L/h
- Dosagem de ácidos: 0,045 a 125 L/h
- Software integrado: SmartKobra

---

## Tecnologias utilizadas

- **HTML5 semântico** — estrutura acessível com ARIA
- **CSS3 Vanilla** — design system completo com variáveis CSS, Grid e Flexbox
- **JavaScript Vanilla** — sem dependências externas
- **Google Fonts** — Inter + Cormorant Garamond
- **IntersectionObserver** — animações de entrada performáticas
- **Lightbox nativo** — galeria com zoom via JS puro

---

## Recursos de acessibilidade

- Contraste WCAG AA em todos os textos
- Navegação por teclado em tabs, menu mobile e galeria
- Estados de foco visíveis em todos os elementos interativos
- Textos alternativos em todas as imagens
- Suporte a `prefers-reduced-motion`
- Hierarquia semântica de títulos (h1 → h2 → h3)
- Atributos ARIA em componentes interativos

---

## Para produção

1. Comprima as imagens para WebP (use https://squoosh.app)
2. Minifique `style.css` e `main.js`
3. Adicione um CDN para os assets de imagem
4. Configure o servidor para servir com GZIP/Brotli
5. Adicione o `sitemap.xml` e configure o `robots.txt`
6. Preencha todos os campos em `config.js`

---

*Landing page desenvolvida para a Kobra — © 2025*
