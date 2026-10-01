/**
 * ORKA Landing Page — Configurações
 * ===================================
 * Preencha os dados de contato, links e redes sociais antes de publicar.
 * Mantenha este arquivo fora do repositório público se contiver dados sensíveis.
 */

const ORKA_CONFIG = {
  /**
   * Informações de contato
   * TODO: Preencher com dados reais antes de publicar
   */
  contato: {
    email: 'contato@kobratec.com.br',       // ← Substitua pelo e-mail oficial
    whatsapp: '+5543991811202',           // ← Substitua pelo número de WhatsApp (com DDI)
    telefone: '',                          // ← Opcional: telefone fixo
    site_kobra: 'https://www.kobratec.com.br ',  // ← Substitua pela URL oficial da Kobra
  },

  /**
   * Redes sociais
   * TODO: Verificar URLs nos materiais oficiais antes de publicar
   */
  redes_sociais: {
    instagram: '',   // ← Ex: 'https://www.instagram.com/kobraindtec'
    linkedin: '',    // ← Ex: 'linkedin.com/company/kobra-industria-e-tecnologia/?originalSubdomain=pt'
    youtube: '',     // ← Ex: 'https://www.youtube.com/@KOBRAINDTEC'
    facebook: '',    // ← Ex: 'https://www.facebook.com/kobraindtec'
  },

  /**
   * SEO e metadados
   */
  seo: {
    title: 'ORKA | Tratamento, Resfriamento e Controle Inteligente da Água',
    description: 'Conheça a ORKA, solução Kobra para tratamento, resfriamento, monitoramento e recirculação inteligente da água em granjas.',
    og_image: 'assets/images/orka-hero.jpeg',
  },

  /**
   * Links legais
   * TODO: Preencher com links reais da Kobra
   */
  legal: {
    politica_privacidade: '#',   // ← Substitua pela URL da política de privacidade
    termos: '#',                  // ← Substitua pela URL dos termos de uso
  }
};

// Aplicar configurações ao carregar a página
(function applyConfig() {
  // Footer year
  const yearEl = document.getElementById('footer-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Política de privacidade
  const privacyLink = document.getElementById('link-privacy');
  if (privacyLink && ORKA_CONFIG.legal.politica_privacidade !== '#') {
    privacyLink.href = ORKA_CONFIG.legal.politica_privacidade;
  }

  // Botão WhatsApp
  const btnWa = document.getElementById('btn-cta-whatsapp');
  if (btnWa && ORKA_CONFIG.contato.whatsapp) {
    const msg = encodeURIComponent('Olá! Gostaria de saber mais sobre a ORKA.');
    btnWa.href = `https://wa.me/${ORKA_CONFIG.contato.whatsapp.replace(/\D/g, '')}?text=${msg}`;
  }

  // Botão email
  const btnEmail = document.getElementById('btn-cta-email');
  if (btnEmail && ORKA_CONFIG.contato.email) {
    btnEmail.href = `mailto:${ORKA_CONFIG.contato.email}?subject=Interesse na ORKA`;
  }
})();
