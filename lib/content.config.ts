// CONTENT CONFIGURATION FILE
// This is the SINGLE SOURCE OF TRUTH for all content in the presentation.
// To change any text, question, image, or setting, edit this file directly.

export interface Author {
  name: string;
  role: string;
}

export interface TeamMember {
  role: string;
  name: string;
}

export interface InfoPopupLink {
  label: string;
  url: string;
}

export interface InfoPopup {
  title: string;
  body: string;
  link?: InfoPopupLink;
}

export interface ActivityOption {
  id: string;
  text: string;
  correct: boolean;
  feedback: string;
}

export interface DragDropPair {
  term: string;
  definition: string;
}

export interface OrderingStep {
  id: number;
  text: string;
}

export interface Activity {
  type: "multiple-choice" | "true-false" | "fill-blank" | "drag-drop" | "ordering";
  points: number;
  question?: string;
  options?: ActivityOption[];
  // For true-false
  statement?: string;
  answer?: boolean;
  feedbackTrue?: string;
  feedbackFalse?: string;
  // For fill-blank
  sentence?: string;
  correctAnswer?: string;
  feedbackCorrect?: string;
  feedbackWrong?: string;
  // For drag-drop
  pairs?: DragDropPair[];
  // For ordering
  steps?: OrderingStep[];
}

export interface Module {
  id: string;
  title: string;
  icon: string;
  purpose: string;
  image: string;
  content: string;
  avatarTranscript: string;
  infoPopup: InfoPopup;
  activity: Activity;
}

export interface AssessmentQuestion {
  id: string;
  moduleRef: string;
  points: number;
  type: "multiple-choice" | "true-false" | "fill-blank";
  question: string;
  options?: ActivityOption[];
  statement?: string;
  answer?: boolean;
  feedbackTrue?: string;
  feedbackFalse?: string;
}

export interface ContentConfig {
  meta: {
    title: string;
    subtitle: string;
    description: string;
    authors: Author[];
    institution: string;
    date: string;
    version: string;
    language: string;
    passingScore: number;
    primaryColor: string;
    accentColor: string;
    coverImage: string;
  };
  rea: {
    title: string;
    statement: string;
    targetAudience: string;
    avatarTranscript: string;
  };
  modules: Module[];
  assessment: {
    title: string;
    instructions: string;
    passingMessage: string;
    failingMessage: string;
    questions: AssessmentQuestion[];
  };
  conclusion: {
    title: string;
    synthesis: string;
    checklist: string[];
    nextSteps: string;
    avatarTranscript: string;
  };
  references: string[];
  credits: {
    team: TeamMember[];
    license: string;
    licenseUrl: string;
    licenseNote: string;
  };
}

const contentConfig: ContentConfig = {
  meta: {
    title: "Marcos de Gobernanza Algorítmica en Sistemas de Decisión Empresarial Automatizados",
    subtitle: "Especialización en Analítica y Ciencia de Datos",
    description: "Este ODC pretende profundizar sobre enfoques de gobernanza de algoritmos que determinan decisiones de negocio de forma automatizada sobre personas, procesos o recursos, y que estrategias permiten su evaluación y explicabilidad tanto conceptual como técnica, para que desde su implementación se mitiguen riesgos asociados a transparencia y responsabilidad empresarial, evitando que estos algoritmos actúen como cajas negras, o que amplifiquen sesgos culturales que vulneran principios éticos y sociales",
    authors: [
      { name: "Felipe Gasca Guerrero", role: "Autor/Investigador" },
    ],
    institution: "Universidad de Cundinamarca - Instituto de Posgrados",
    date: "Mayo 2026",
    version: "v1.0",
    language: "es",
    passingScore: 70,
    primaryColor: "#3B82F6",
    accentColor: "#F59E0B",
    coverImage: "https://img.magnific.com/fotos-premium/artificial-intelligence-and-justice-the-future-of-legal-technology_1101054-89336.jpg?w=740",
  },

  rea: {
    title: "Resultado Esperado de Aprendizaje",
    statement: "Al culminar este ODC, el lector podrá conocer, adaptar y aplicar marcos metodológicos de gobernanza y auditoría algorítmica en sistemas de decisión empresarial automatizada, logrando la integración de controles éticos y técnicos dentro del ciclo de vida de estos sistemas, para garantizar responsabilidad y transparencia en el contexto de la transformación digital de las organizaciones.",
    targetAudience: "Este ODC está dirigido a organizaciones, profesionales o estudiantes, que utilicen algoritmos para sistemas de decisión automatizada, y que deseen comprender el funcionamiento de estos sistemas dentro de la integración con procesos empresariales, en términos de explicabilidad y responsabilidad.",
    avatarTranscript: "¡Bienvenidos a este objeto digital de conocimiento sobre Marcos de Gobernanza Algorítmica en Sistemas de Decisión Empresarial Automatizados! En las próximas pantallas, exploraremos juntos enfoques de gobernanza de algoritmos y que estrategias permiten su evaluación y control con el fin de mitigar riesgos asociados a transparencia y responsabilidad empresarial. ¡Comencemos este viaje de transformación digital!",
  },

  modules: [
    {
      id: "module-1",
      title: "Alfabetización Informacional",
      icon: "Search",
      purpose: "Desarrollar habilidades para buscar, evaluar y gestionar información digital de manera efectiva y crítica.",
      image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&q=80",
      content: `La **alfabetización informacional** constituye el pilar fundamental de las competencias digitales en el contexto universitario. Esta habilidad implica no solo saber buscar información, sino también evaluarla críticamente para determinar su *relevancia, veracidad y pertinencia* académica.

En la era de la sobreinformación, distinguir entre fuentes confiables y contenido de dudosa procedencia se ha convertido en una competencia esencial. Los estudiantes universitarios deben dominar estrategias de búsqueda avanzada, comprender el funcionamiento de bases de datos académicas como Scopus, Web of Science y Google Scholar, y aplicar criterios de evaluación como el método CRAAP (Currency, Relevance, Authority, Accuracy, Purpose).`,
      avatarTranscript: "La alfabetización informacional es mucho más que saber usar un buscador. En el mundo académico, necesitas desarrollar un ojo crítico para evaluar la calidad de las fuentes que encuentras. Aprenderás a identificar sesgos, verificar la autoridad de los autores y distinguir entre información científica y opiniones sin fundamento. Estas habilidades te acompañarán durante toda tu carrera profesional.",
      infoPopup: {
        title: "¿Sabías que...?",
        body: "Según el informe de la UNESCO (2023), más del 60% de los estudiantes universitarios tienen dificultades para distinguir entre noticias falsas e información verificada. El método CRAAP fue desarrollado por bibliotecarios de la Universidad Estatal de California para ayudar a evaluar fuentes de información.",
        link: { label: "Ver método CRAAP", url: "https://library.csuchico.edu/help/source-or-information-good" },
      },
      activity: {
        type: "multiple-choice",
        points: 10,
        question: "¿Cuál de los siguientes criterios NO forma parte del método CRAAP para evaluar fuentes de información?",
        options: [
          { id: "a", text: "Currency (Actualidad)", correct: false, feedback: "Incorrecto. La actualidad (Currency) sí es uno de los cinco criterios del método CRAAP, que evalúa qué tan reciente es la información." },
          { id: "b", text: "Relevance (Relevancia)", correct: false, feedback: "Incorrecto. La relevancia (Relevance) es un criterio fundamental del CRAAP que evalúa si la información se relaciona con tu necesidad de investigación." },
          { id: "c", text: "Popularity (Popularidad)", correct: true, feedback: "¡Correcto! La popularidad no es un criterio del CRAAP. Los cinco criterios son: Currency, Relevance, Authority, Accuracy y Purpose. La popularidad de una fuente no garantiza su calidad académica." },
          { id: "d", text: "Authority (Autoridad)", correct: false, feedback: "Incorrecto. La autoridad (Authority) es un criterio clave del CRAAP que evalúa las credenciales y experiencia del autor o fuente." },
        ],
      },
    },
    {
      id: "module-2",
      title: "Comunicación y Colaboración Digital",
      icon: "Users",
      purpose: "Dominar herramientas y prácticas de comunicación efectiva en entornos virtuales académicos.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80",
      content: `La **comunicación digital** en contextos académicos requiere el dominio de múltiples plataformas y la comprensión de las normas de *netiqueta* específicas para cada entorno. Desde correos electrónicos formales hasta foros de discusión y videoconferencias, cada canal tiene sus propias convenciones.

La colaboración en línea ha transformado la manera en que los equipos académicos trabajan. Herramientas como Google Workspace, Microsoft Teams, Slack y plataformas de gestión de proyectos como Trello o Notion permiten la co-creación de documentos, la comunicación asíncrona efectiva y la coordinación de proyectos complejos entre participantes ubicados en diferentes zonas horarias.`,
      avatarTranscript: "Saber comunicarse efectivamente en entornos digitales es una competencia que marcará la diferencia en tu vida académica y profesional. No se trata solo de enviar mensajes, sino de construir relaciones, colaborar de manera productiva y expresar ideas con claridad en diferentes formatos y plataformas. Aprenderás a adaptar tu comunicación al contexto y a usar las herramientas colaborativas que potenciarán tu trabajo en equipo.",
      infoPopup: {
        title: "Netiqueta académica",
        body: "La netiqueta es el conjunto de normas de comportamiento en internet. En contextos académicos, incluye aspectos como: usar un tono profesional, respetar los tiempos de respuesta, citar correctamente en discusiones y mantener la confidencialidad de las conversaciones del grupo.",
        link: { label: "Guía de netiqueta", url: "https://www.educaweb.com/noticia/2020/04/15/netiqueta-normas-comportamiento-internet-19151/" },
      },
      activity: {
        type: "true-false",
        points: 10,
        statement: "En una videoconferencia académica, es apropiado mantener el micrófono encendido todo el tiempo para demostrar participación activa.",
        answer: false,
        feedbackTrue: "Incorrecto. Mantener el micrófono encendido todo el tiempo puede generar ruido de fondo y distracciones. La práctica recomendada es silenciar el micrófono cuando no estás hablando y activarlo solo cuando deseas intervenir.",
        feedbackFalse: "¡Correcto! La netiqueta de videoconferencias recomienda mantener el micrófono silenciado cuando no se está hablando para evitar ruidos de fondo. Esto mejora la calidad de la comunicación para todos los participantes.",
      },
    },
    {
      id: "module-3",
      title: "Creación de Contenido Digital",
      icon: "PenTool",
      purpose: "Desarrollar capacidades para crear, editar y publicar contenido digital de calidad académica.",
      image: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80",
      content: `La **creación de contenido digital** académico va más allá de escribir documentos de texto. Incluye la producción de presentaciones efectivas, infografías, podcasts, videos educativos y recursos interactivos que comuniquen el conocimiento de manera *clara y atractiva*.

El dominio de herramientas como Canva, Adobe Creative Suite, Audacity para audio, y editores de video como DaVinci Resolve o Premiere, amplía las posibilidades expresivas del estudiante. Además, comprender los principios de diseño visual, accesibilidad y usabilidad garantiza que el contenido creado sea inclusivo y efectivo para diversas audiencias.`,
      avatarTranscript: "En la era digital, la capacidad de crear contenido de calidad es una habilidad invaluable. No solo aprenderás a usar herramientas de diseño y producción multimedia, sino que también desarrollarás un criterio estético y funcional para comunicar tus ideas de manera impactante. Desde una presentación para clase hasta un portafolio profesional, estas competencias te distinguirán en cualquier campo.",
      infoPopup: {
        title: "Principios de diseño accesible",
        body: "El contenido digital accesible considera a usuarios con diversas capacidades. Incluye: contraste de colores adecuado, textos alternativos en imágenes, subtítulos en videos, y estructuras de navegación claras. El estándar WCAG 2.1 proporciona las pautas internacionales de accesibilidad.",
        link: { label: "Pautas WCAG", url: "https://www.w3.org/WAI/WCAG21/quickref/" },
      },
      activity: {
        type: "ordering",
        points: 10,
        question: "Ordena los pasos del proceso de creación de contenido digital académico de manera lógica:",
        steps: [
          { id: 1, text: "Definir el objetivo y audiencia del contenido" },
          { id: 2, text: "Investigar y recopilar información relevante" },
          { id: 3, text: "Planificar la estructura y formato del contenido" },
          { id: 4, text: "Crear el borrador o prototipo inicial" },
          { id: 5, text: "Revisar, editar y obtener retroalimentación" },
          { id: 6, text: "Publicar y difundir el contenido final" },
        ],
      },
    },
    {
      id: "module-4",
      title: "Seguridad y Ciudadanía Digital",
      icon: "Shield",
      purpose: "Comprender y aplicar prácticas de seguridad digital y comportamiento ético en línea.",
      image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      content: `La **seguridad digital** abarca la protección de datos personales, la gestión de identidad en línea y la prevención de amenazas cibernéticas. Los estudiantes universitarios manejan información sensible: datos académicos, investigaciones, información financiera y comunicaciones privadas que requieren *protección adecuada*.

La **ciudadanía digital** implica comportarse de manera ética y responsable en el ciberespacio. Esto incluye respetar la propiedad intelectual, evitar el plagio, proteger la privacidad propia y ajena, y contribuir positivamente a las comunidades digitales. El conocimiento de las licencias Creative Commons y el uso correcto de citas son competencias fundamentales.`,
      avatarTranscript: "La seguridad en línea no es opcional, es una responsabilidad. Aprenderás a proteger tus cuentas con autenticación de dos factores, a reconocer intentos de phishing, y a gestionar tu huella digital de manera consciente. También exploraremos los aspectos éticos del comportamiento en línea, porque ser un buen ciudadano digital es tan importante como serlo en el mundo físico.",
      infoPopup: {
        title: "Autenticación de dos factores",
        body: "La autenticación de dos factores (2FA) añade una capa extra de seguridad a tus cuentas. Además de tu contraseña, necesitas un segundo elemento: un código enviado a tu teléfono, una app de autenticación, o una llave física. Esto reduce drásticamente el riesgo de hackeo.",
        link: { label: "Configurar 2FA", url: "https://www.google.com/landing/2step/" },
      },
      activity: {
        type: "drag-drop",
        points: 10,
        question: "Relaciona cada tipo de licencia Creative Commons con su descripción correcta:",
        pairs: [
          { term: "CC BY", definition: "Permite cualquier uso dando crédito al autor" },
          { term: "CC BY-SA", definition: "Requiere compartir bajo la misma licencia" },
          { term: "CC BY-NC", definition: "Prohíbe el uso comercial" },
          { term: "CC BY-ND", definition: "No permite obras derivadas" },
        ],
      },
    },
    {
      id: "module-5",
      title: "Resolución de Problemas Tecnológicos",
      icon: "Wrench",
      purpose: "Desarrollar estrategias para identificar y resolver problemas técnicos de manera autónoma.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
      content: `La **resolución de problemas tecnológicos** es una competencia que combina pensamiento lógico, creatividad y persistencia. En el contexto académico, los estudiantes enfrentan constantemente desafíos técnicos: desde problemas de conectividad hasta fallos en software especializado o dificultades con plataformas de aprendizaje.

Desarrollar esta competencia implica aprender a *diagnosticar* problemas sistemáticamente, buscar soluciones en documentación y foros especializados, y aplicar el método de prueba y error de manera estructurada. También incluye saber cuándo y cómo pedir ayuda técnica, documentando el problema de manera clara para facilitar su resolución.`,
      avatarTranscript: "No necesitas ser un experto en tecnología para resolver problemas técnicos comunes. Lo que necesitas es un enfoque sistemático y la disposición de aprender. Te enseñaré estrategias para diagnosticar problemas, buscar soluciones efectivamente, y desarrollar tu autonomía tecnológica. Estas habilidades te harán más independiente y confiado en tu uso de la tecnología.",
      infoPopup: {
        title: "El método de diagnóstico técnico",
        body: "Ante un problema técnico: 1) Describe el problema con precisión, 2) Identifica qué cambió antes de que ocurriera, 3) Busca el mensaje de error exacto en Google, 4) Prueba soluciones de menor a mayor complejidad, 5) Documenta qué funcionó para futuras referencias.",
      },
      activity: {
        type: "fill-blank",
        points: 10,
        question: "Completa la siguiente oración sobre resolución de problemas:",
        sentence: "Cuando un software presenta un error, el primer paso recomendado es leer el _____ de error para comprender la causa del problema.",
        correctAnswer: "mensaje",
        feedbackCorrect: "¡Correcto! Leer el mensaje de error es fundamental porque proporciona información específica sobre la causa del problema, lo cual guía la búsqueda de soluciones.",
        feedbackWrong: "La respuesta correcta es 'mensaje'. Los mensajes de error contienen información valiosa que describe la naturaleza del problema y ayuda a encontrar la solución adecuada.",
      },
    },
    {
      id: "module-6",
      title: "Aprendizaje Continuo y Adaptabilidad",
      icon: "TrendingUp",
      purpose: "Cultivar una mentalidad de aprendizaje permanente ante la evolución tecnológica constante.",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80",
      content: `El **aprendizaje continuo** en competencias digitales no es una opción sino una necesidad en un mundo donde la tecnología evoluciona constantemente. Las herramientas que dominamos hoy pueden quedar obsoletas mañana, pero las *habilidades metacognitivas* para aprender nuevas tecnologías permanecen relevantes.

La **adaptabilidad digital** implica estar abierto a nuevas plataformas, ser capaz de transferir conocimientos entre herramientas similares, y mantener una actitud proactiva hacia la formación continua. Recursos como MOOCs, tutoriales en línea, comunidades de práctica y certificaciones profesionales son aliados en este proceso de actualización permanente.`,
      avatarTranscript: "La tecnología cambia, pero tu capacidad de aprender y adaptarte es constante. En este módulo final, reflexionaremos sobre cómo construir un plan de desarrollo personal para tus competencias digitales. Aprenderás a identificar brechas en tus habilidades, encontrar recursos de calidad para actualizarte, y cultivar una mentalidad de crecimiento que te mantenga relevante en cualquier contexto profesional.",
      infoPopup: {
        title: "Plataformas de aprendizaje continuo",
        body: "Existen múltiples opciones gratuitas y de pago para actualizar tus competencias: Coursera, edX, LinkedIn Learning, Platzi, Domestika, YouTube, y los propios cursos de Google, Microsoft y otras empresas tecnológicas ofrecen certificaciones reconocidas.",
        link: { label: "Explorar Coursera", url: "https://www.coursera.org" },
      },
      activity: {
        type: "multiple-choice",
        points: 10,
        question: "¿Cuál es la principal ventaja de desarrollar habilidades metacognitivas para el aprendizaje tecnológico?",
        options: [
          { id: "a", text: "Permiten memorizar más rápidamente los atajos de teclado", correct: false, feedback: "Incorrecto. Las habilidades metacognitivas van más allá de la memorización; se refieren a la capacidad de reflexionar sobre el propio proceso de aprendizaje." },
          { id: "b", text: "Facilitan la transferencia de conocimientos a nuevas herramientas", correct: true, feedback: "¡Correcto! Las habilidades metacognitivas permiten reflexionar sobre cómo aprendemos, lo que facilita transferir estrategias de aprendizaje a nuevas tecnologías y adaptarnos más rápidamente." },
          { id: "c", text: "Eliminan la necesidad de consultar documentación técnica", correct: false, feedback: "Incorrecto. Las habilidades metacognitivas no eliminan la necesidad de recursos externos; más bien optimizan cómo los utilizamos para aprender." },
          { id: "d", text: "Garantizan el dominio inmediato de cualquier software", correct: false, feedback: "Incorrecto. Ninguna habilidad garantiza el dominio inmediato. Las metacognitivas facilitan el proceso pero el aprendizaje sigue requiriendo tiempo y práctica." },
        ],
      },
    },
  ],

  assessment: {
    title: "Evaluación Final",
    instructions: "Esta evaluación consta de 6 preguntas que abarcan todos los módulos estudiados. Necesitas obtener al menos un 70% para aprobar. Lee cada pregunta cuidadosamente antes de responder. ¡Buena suerte!",
    passingMessage: "¡Felicitaciones! Has demostrado un dominio sólido de las competencias digitales para la educación superior. Estás preparado para aplicar estos conocimientos en tu vida académica y profesional.",
    failingMessage: "Te recomendamos repasar los módulos indicados y volver a intentar la evaluación. Recuerda que el aprendizaje es un proceso, y cada intento es una oportunidad de mejora.",
    questions: [
      {
        id: "q1",
        moduleRef: "module-1",
        points: 15,
        type: "multiple-choice",
        question: "Al evaluar una fuente de información académica, ¿cuál de los siguientes aspectos es MÁS importante considerar?",
        options: [
          { id: "a", text: "El número de veces que ha sido compartida en redes sociales", correct: false, feedback: "Incorrecto. La viralidad en redes sociales no indica calidad académica. Muchas fuentes populares carecen de rigor científico." },
          { id: "b", text: "Las credenciales del autor y el proceso de revisión por pares", correct: true, feedback: "¡Correcto! La autoridad del autor y la revisión por pares son indicadores fundamentales de la calidad y confiabilidad de una fuente académica." },
          { id: "c", text: "La extensión y cantidad de páginas del documento", correct: false, feedback: "Incorrecto. La longitud de un documento no garantiza su calidad. Fuentes breves pueden ser más rigurosas que textos extensos." },
          { id: "d", text: "El diseño visual y la estética de la publicación", correct: false, feedback: "Incorrecto. Aunque la presentación importa, no es un indicador de calidad académica. El contenido y la metodología son prioritarios." },
        ],
      },
      {
        id: "q2",
        moduleRef: "module-2",
        points: 15,
        type: "multiple-choice",
        question: "En un proyecto colaborativo en línea con participantes de diferentes zonas horarias, ¿cuál es la mejor práctica de comunicación?",
        options: [
          { id: "a", text: "Programar reuniones síncronas diarias para mantener a todos informados", correct: false, feedback: "Incorrecto. Las reuniones síncronas diarias son difíciles de coordinar entre zonas horarias y pueden ser ineficientes para equipos distribuidos." },
          { id: "b", text: "Combinar comunicación asíncrona documentada con reuniones síncronas estratégicas", correct: true, feedback: "¡Correcto! Esta combinación respeta las diferencias horarias, permite flexibilidad y asegura momentos de interacción directa cuando es necesario." },
          { id: "c", text: "Usar exclusivamente comunicación asíncrona para evitar conflictos de horario", correct: false, feedback: "Incorrecto. Aunque la comunicación asíncrona es importante, la interacción síncrona ocasional fortalece las relaciones y resuelve problemas complejos más rápidamente." },
          { id: "d", text: "Delegar toda la coordinación a un solo miembro del equipo", correct: false, feedback: "Incorrecto. Centralizar la comunicación en una persona crea cuellos de botella y reduce la participación equitativa del equipo." },
        ],
      },
      {
        id: "q3",
        moduleRef: "module-3",
        points: 15,
        type: "multiple-choice",
        question: "¿Cuál es el primer paso recomendado antes de crear contenido digital académico?",
        options: [
          { id: "a", text: "Elegir la herramienta de diseño más avanzada disponible", correct: false, feedback: "Incorrecto. La herramienta es secundaria. Primero debes tener claridad sobre qué quieres comunicar y a quién." },
          { id: "b", text: "Definir claramente el objetivo y la audiencia del contenido", correct: true, feedback: "¡Correcto! Conocer el propósito y la audiencia guía todas las decisiones posteriores: formato, tono, nivel de complejidad y canal de distribución." },
          { id: "c", text: "Buscar plantillas prediseñadas para ahorrar tiempo", correct: false, feedback: "Incorrecto. Las plantillas pueden ser útiles, pero usarlas sin definir primero el objetivo puede resultar en contenido genérico o inadecuado." },
          { id: "d", text: "Recopilar la mayor cantidad posible de información sobre el tema", correct: false, feedback: "Incorrecto. Aunque la investigación es importante, debe hacerse después de definir el objetivo para evitar recopilar información irrelevante." },
        ],
      },
      {
        id: "q4",
        moduleRef: "module-4",
        points: 20,
        type: "multiple-choice",
        question: "¿Cuál de las siguientes prácticas contribuye MEJOR a la seguridad de tus cuentas en línea?",
        options: [
          { id: "a", text: "Usar la misma contraseña fuerte en todos los sitios para no olvidarla", correct: false, feedback: "Incorrecto. Aunque la contraseña sea fuerte, reutilizarla significa que si un sitio es vulnerado, todas tus cuentas quedan expuestas." },
          { id: "b", text: "Cambiar las contraseñas cada semana sin importar su complejidad", correct: false, feedback: "Incorrecto. Los cambios frecuentes sin criterio llevan a contraseñas más débiles. Es mejor usar contraseñas fuertes y únicas con un gestor." },
          { id: "c", text: "Activar autenticación de dos factores y usar un gestor de contraseñas", correct: true, feedback: "¡Correcto! La 2FA añade una capa extra de seguridad, y el gestor de contraseñas permite tener contraseñas únicas y fuertes para cada cuenta." },
          { id: "d", text: "Guardar las contraseñas en un documento de texto en la nube", correct: false, feedback: "Incorrecto. Los documentos de texto no están cifrados adecuadamente. Un gestor de contraseñas especializado ofrece mucha mayor seguridad." },
        ],
      },
      {
        id: "q5",
        moduleRef: "module-5",
        points: 15,
        type: "multiple-choice",
        question: "Cuando enfrentas un error técnico desconocido, ¿cuál es el enfoque más efectivo?",
        options: [
          { id: "a", text: "Reinstalar inmediatamente el programa o sistema operativo", correct: false, feedback: "Incorrecto. La reinstalación es una medida extrema que debería ser el último recurso, no el primero. Muchos problemas tienen soluciones más simples." },
          { id: "b", text: "Leer el mensaje de error y buscarlo textualmente en internet", correct: true, feedback: "¡Correcto! Los mensajes de error suelen ser específicos y buscarlos textualmente frecuentemente lleva a soluciones documentadas por otros usuarios o soporte oficial." },
          { id: "c", text: "Contactar inmediatamente al soporte técnico sin intentar soluciones", correct: false, feedback: "Incorrecto. Aunque el soporte es valioso, muchos problemas tienen soluciones conocidas que puedes encontrar rápidamente por tu cuenta." },
          { id: "d", text: "Ignorar el error y continuar trabajando esperando que se resuelva solo", correct: false, feedback: "Incorrecto. Ignorar errores puede agravar el problema y llevar a pérdida de datos o fallos mayores." },
        ],
      },
      {
        id: "q6",
        moduleRef: "module-6",
        points: 20,
        type: "multiple-choice",
        question: "¿Por qué es fundamental desarrollar habilidades de aprendizaje continuo en competencias digitales?",
        options: [
          { id: "a", text: "Porque las empresas exigen certificaciones nuevas cada año", correct: false, feedback: "Incorrecto. Aunque las certificaciones pueden ser útiles, el aprendizaje continuo va más allá de requisitos laborales específicos." },
          { id: "b", text: "Porque la tecnología evoluciona constantemente y las habilidades específicas pueden quedar obsoletas", correct: true, feedback: "¡Correcto! La tecnología cambia rápidamente, pero la capacidad de aprender nuevas herramientas y adaptarse permanece relevante siempre." },
          { id: "c", text: "Porque es necesario dominar todas las herramientas del mercado", correct: false, feedback: "Incorrecto. No es posible ni necesario dominar todas las herramientas. Lo importante es poder aprender las que necesites cuando las necesites." },
          { id: "d", text: "Porque los títulos universitarios ya no tienen valor en el mercado", correct: false, feedback: "Incorrecto. Los títulos siguen siendo valiosos, pero deben complementarse con actualización continua de habilidades prácticas." },
        ],
      },
    ],
  },

  conclusion: {
    title: "Conclusión",
    synthesis: "A lo largo de este recorrido por las competencias digitales en la educación superior, hemos explorado las seis dimensiones fundamentales que todo estudiante universitario necesita dominar en el siglo XXI. Desde la alfabetización informacional hasta el aprendizaje continuo, estas competencias forman un ecosistema interconectado que potencia tu capacidad de aprender, crear y colaborar en entornos digitales. El dominio de estas habilidades no solo mejora tu desempeño académico actual, sino que te prepara para un futuro profesional en constante transformación tecnológica.",
    checklist: [
      "Puedo buscar, evaluar y gestionar información académica usando el método CRAAP",
      "Domino la comunicación efectiva en entornos virtuales y colaboro productivamente en línea",
      "Soy capaz de crear contenido digital accesible y de calidad académica",
      "Aplico prácticas de seguridad digital y comprendo mis responsabilidades como ciudadano digital",
      "Cuento con estrategias para diagnosticar y resolver problemas técnicos de manera autónoma",
      "Tengo una mentalidad de aprendizaje continuo y sé cómo mantener actualizadas mis competencias",
      "Reconozco la importancia de la ética digital y el respeto a la propiedad intelectual",
    ],
    nextSteps: "Te invitamos a poner en práctica estas competencias en tu próximo proyecto académico. Comienza por auditar tu huella digital actual, configura la autenticación de dos factores en tus cuentas principales, y explora al menos una plataforma de aprendizaje en línea para continuar tu desarrollo. Recuerda que el camino hacia la competencia digital es un viaje continuo, no un destino final.",
    avatarTranscript: "¡Felicitaciones por completar este objeto digital de aprendizaje! Espero que las competencias exploradas te sean útiles en tu vida académica y profesional. Recuerda que lo más importante no es dominar todas las herramientas, sino mantener una actitud de curiosidad y apertura hacia el aprendizaje continuo. La tecnología seguirá evolucionando, pero con las bases que has construido aquí, estarás preparado para adaptarte y prosperar. ¡Mucho éxito en tu camino digital!",
  },

  references: [
    "Ala-Mutka, K. (2018). Mapping digital competence: Towards a conceptual understanding. *European Journal of Education*, 53(1), 46-59. https://doi.org/10.1111/ejed.12255",
    "Buckingham, D. (2019). *The media education manifesto*. Polity Press.",
    "Carretero, S., Vuorikari, R., & Punie, Y. (2017). *DigComp 2.1: The digital competence framework for citizens*. Publications Office of the European Union. https://doi.org/10.2760/38842",
    "Castañeda, L., & Selwyn, N. (2018). More than tools? Making sense of the ongoing digitizations of higher education. *International Journal of Educational Technology in Higher Education*, 15(1), 1-10. https://doi.org/10.1186/s41239-018-0109-y",
    "Ferrari, A. (2020). Digital competence in practice: An analysis of frameworks. *Journal of Research in Technology in Education*, 52(2), 189-203. https://doi.org/10.1080/15391523.2019.1656789",
    "García-Peñalvo, F. J., & Corell, A. (2020). La COVID-19: ¿enzima de la transformación digital de la docencia o reflejo de una crisis metodológica y competencial en la educación superior? *Campus Virtuales*, 9(2), 83-98.",
    "Gilster, P. (2018). *Digital literacy* (2nd ed.). John Wiley & Sons.",
    "González-Sanmamed, M., Sangrà, A., Souto-Seijo, A., & Estévez, I. (2020). Learning ecologies in the digital age: Challenges for higher education. *Publicaciones*, 50(1), 83-102. https://doi.org/10.30827/publicaciones.v50i1.15671",
    "Hatlevik, O. E., & Christophersen, K. A. (2019). Digital competence at the beginning of upper secondary school: Identifying factors explaining digital inclusion. *Computers & Education*, 63, 240-247. https://doi.org/10.1016/j.compedu.2018.11.008",
    "Ilomäki, L., Paavola, S., Lakkala, M., & Kantosalo, A. (2021). Digital competence – An emergent boundary concept for policy and educational research. *Education and Information Technologies*, 21(3), 655-679. https://doi.org/10.1007/s10639-020-10167-3",
    "Janssen, J., Stoyanov, S., Ferrari, A., Punie, Y., Pannekeet, K., & Sloep, P. (2018). Experts' views on digital competence: Commonalities and differences. *Computers & Education*, 68, 473-481. https://doi.org/10.1016/j.compedu.2018.06.009",
    "López-Meneses, E., Sirignano, F. M., Vázquez-Cano, E., & Ramírez-Hurtado, J. M. (2020). University students' digital competence in three areas of the DigComp 2.1 model. *Journal of New Approaches in Educational Research*, 9(1), 5-19. https://doi.org/10.7821/naer.2020.1.409",
    "Marín, V. I., Zawacki-Richter, O., Pérez Garcias, A., & Salinas, J. (2022). Systematic review of research on digital competence in university contexts. *Research in Learning Technology*, 30. https://doi.org/10.25304/rlt.v30.2623",
    "Ng, W. (2019). Can we teach digital natives digital literacy? *Computers & Education*, 59(3), 1065-1078. https://doi.org/10.1016/j.compedu.2019.04.012",
    "OECD. (2019). *OECD skills outlook 2019: Thriving in a digital world*. OECD Publishing. https://doi.org/10.1787/df80bc12-en",
    "Prensky, M. (2021). Digital wisdom and homo sapiens digital. En M. Thomas (Ed.), *Deconstructing digital natives* (pp. 15-29). Routledge.",
    "Redecker, C. (2020). *European framework for the digital competence of educators: DigCompEdu*. Publications Office of the European Union. https://doi.org/10.2760/159770",
    "Spante, M., Hashemi, S. S., Lundin, M., & Algers, A. (2018). Digital competence and digital literacy in higher education research: Systematic review of concept use. *Cogent Education*, 5(1), 1519143. https://doi.org/10.1080/2331186X.2018.1519143",
    "UNESCO. (2023). *Global education monitoring report 2023: Technology in education*. UNESCO Publishing. https://doi.org/10.54676/UZQV8501",
    "Vuorikari, R., Kluzer, S., & Punie, Y. (2022). *DigComp 2.2: The digital competence framework for citizens*. Publications Office of the European Union. https://doi.org/10.2760/115376",
  ],

  credits: {
    team: [
      { role: "Autoría y desarrollo conceptual", name: "Jose Felipe Gasca Guerrero" },
      { role: "Diseño y desarrollo web", name: "Equipo autor" },
      { role: "Guion de audio y transcripciones", name: "Equipo autor" },
      { role: "Edición multimedia y producción de recursos", name: "Equipo autor" },
      { role: "Progama", name: "Especialización en Analitica y Ciencia de Datos"},
      { role: "Institución", name: "Universidad de Cundinamarca"}

    ],
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    licenseNote: "Este recurso educativo abierto puede ser reutilizado, adaptado y distribuido libremente, siempre que se otorgue el crédito apropiado a los autores originales. Se permite su uso con fines comerciales y no comerciales, incluyendo la creación de obras derivadas bajo los mismos términos.",
  },
};

export default contentConfig;
