export const portfolioData = {

  personal: {
    name: 'Mario Rossi',
    title: 'Full Stack Developer',
    email: 'mario.rossi@professional.com',
    phone: '+39 123 456 7890',
    location: {
      it: 'Milano, Italia', en: ''
    },
  }, social: {
    linkedin: 'https://linkedin.com/in/mario-rossi',
    github: 'https://github.com/mario-rossi',
    instagram: 'https://instagram.com/mario.rossi',
  }, about: {
    it: `
    <p class="text-muted-foreground">
      Sono un Full Stack Developer con oltre 5 anni di esperienza nello sviluppo di
      applicazioni web e mobile. Mi specializzo in Angular, TypeScript e nell'architettura
      di soluzioni scalabili e performanti.
    </p>
    <p class="text-muted-foreground mt-4">
      La mia passione per il codice pulito e le best practices mi porta costantemente ad
      approfondire nuove tecnologie e metodologie di sviluppo.
    </p>
    `, en: ''
  }, experience: [{
    company: 'Tech Solutions Srl', role: {
      it: 'Senior Full Stack Developer', en: ''
    }, duration: {
      it: '2021 - Presente', en: ''
    }, description: {
      it: 'Sviluppo e manutenzione di applicazioni enterprise con Angular, implementazione di architetture microservizi, mentoring del team junior.',
      en: ''
    }
  }, {
    company: 'Digital Agency', role: {
      it: 'Senior Full Stack Developer', en: ''
    }, duration: {
      it: '2019 - 2021', en: ''
    }, description: {
      it: 'Sviluppo di applicazioni web responsive e mobile-first, integrazione con API REST, ottimizzazione delle performance.',
      en: ''
    }
  },], skills: [{
    title: 'title.frontend', items: [{
      name: 'HTML', level: 1
    }, {
      name: 'CSS', level: 2
    }, {
      name: 'SCSS', level: 3
    }],
  }, {

    title: 'title.backend', items: [{
      name: 'TypeScript', level: 2
    }, {
      name: 'Node.js', level: 1
    }, {
      name: 'Nest.js', level: 2
    }]
  }, {
    title: 'title.design', items: [{
      name: 'Adobe Illustrator', level: 3
    }]
  }, {
    title: 'title.other', items: [{
      name: 'Git', level: 3
    }, {
      name: 'CI/CD', level: 1
    }]
  }], projects: [{
    name: {
      it: 'Project Alpha', en: ''
    }, description: {
      it: 'Piattaforma di e-commerce scalabile con funzionalità avanzate di gestione degli ordini e integrazione con sistemi di pagamento.',
      en: ''
    }, link: '',
  },],
};
