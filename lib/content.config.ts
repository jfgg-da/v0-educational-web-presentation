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
  correctAnswers?: string[];
  correctAnswersPerBlank?: string[][];
  description?: string;
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
  mediaSource?: {
    label: string;
    url?: string;
    author?: string;
  };
  content: string;
  contentDetail: string;
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
    Resumen: string;
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
    synthesis_1: string;
    synthesis_2: string;
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
    title: "Marcos de Gobernanza Algorítmica en Sistemas de Decisión Empresarial",
    subtitle: "Especialización en Analítica y Ciencia de Datos",
    description: "Este ODC pretende profundizar sobre enfoques de gobernanza de algoritmos que determinan decisiones de negocio de forma automatizada sobre personas, procesos o recursos, y que estrategias permiten su evaluación y explicabilidad tanto conceptual como técnica, para que desde su implementación se mitiguen riesgos asociados a transparencia y responsabilidad empresarial, evitando que estos algoritmos actúen como cajas negras, o que amplifiquen sesgos culturales que vulneran principios éticos y sociales",
    authors: [
      { name: "Felipe Gasca Guerrero", role: "Autor" },
    ],
    institution: "Universidad de Cundinamarca",
    Resumen: "ODC enfocado en profundizar sobre los desafíos asociados a la gobernanza de algoritmos que determinan decisiones de negocio de forma automatizada, y plantear que enfoques metodológicos permiten su evaluación y explicabilidad, evitando que estos algoritmos actúen como cajas negras.",
    date: "Mayo 2026",
    version: "v1.0",
    language: "es",
    passingScore: 70,
    primaryColor: "#ffffff",
    accentColor: "#ffffff",
    coverImage: "/screenshots/medium.mp4",
  },

  rea: {
    title: "Objetivo de Aprendizaje",
    statement: "Al culminar este ODC, el lector podrá adaptar marcos de gobernanza y auditoría algorítmica en sistemas de decisión automatizada en entornos empresariales, para resolver sus riesgos éticos y técnicos, mediante el análisis de enfoques metodológicos, el diseño de una matriz de riesgos aplicada y la superación de la evaluación final por encima del 80%.",
    targetAudience: "Este ODC está dirigido a profesionales o estudiantes, que integren el uso de algoritmos en sistemas de decisión automatizada sobre sus procesos, y que deseen comprender, evaluar y supervisar el funcionamiento de estos sistemas en términos de explicabilidad y responsabilidad al integrarse con procesos empresariales.",
    avatarTranscript: "¡Hola!. ¡Bienvenidos a este objeto digital de conocimiento sobre Marcos de Gobernanza Algorítmica en Sistemas de Decisión Empresarial!. En el REA (Resultado Esperado de Aprendizaje) Al culminar este ODC, el lector podrá adaptar marcos de gobernanza y auditoría algorítmica en sistemas de decisión automatizada en entornos empresariales, para resolver sus riesgos éticos y técnicos, mediante el análisis de enfoques metodológicos, el diseño de una matriz de riesgos aplicada y la superación de la evaluación final por encima del 80%. Para la población objetivo, este ODC está dirigido a profesionales o estudiantes, que integren el uso de algoritmos en sistemas de decisión automatizada sobre sus procesos, y que deseen comprender, evaluar y supervisar el funcionamiento de estos sistemas en términos de explicabilidad y responsabilidad al integrarse con procesos empresariales.",},

  modules: [
    {
      id: "module-1",
      title: "Fundamentos y Terminología",
      icon: "Search",
      purpose: "Conocer y comprender los principales conceptos relacionados al campo de la ciencia de datos y la IA.",
      image: "/screenshots/Hierarchy IA.jpg",
      mediaSource: {
        label: "Subsets of Artificial Intelligence",
        url: "https://www.researchgate.net/figure/A-comparative-view-of-AI-machine-learning-deep-learning-andgenerative-AI-source_fig1_373797588",
        author: "Research Gate"
      },
      content: `En esencia, un **algoritmo** es una secuencia de instrucciones para conseguir un objetivo o resolver un problema; es un concepto que ha evolucionado a lo largo de la historia, y a la par de los avances tecnológicos, los algoritmos son cada vez mas complejos gracias a la mejora de las capacidades computacionales y el desarrollo del *big data*.

Los algoritmos son fundamentales para la informática moderna, ampliamente utilizados en el campo de la **inteligencia artificial (IA)** para simular las capacidades humanas, tecnología que ha permitido pasar de reglas predefinidas a sistemas que aprenden nuevos patrones y reglas a partir de los datos.

En el campo de la IA podemos encontrar el *aprendizaje de máquina (ML)* como una rama que permite que los sistemas aprendan de los datos. Desde ML se deriva el *aprendizaje profundo (DL)* como un subconjunto que utiliza algoritmos de redes neuronales para descubrir patrones complejos, siendo una de sus principales aplicaciones la **IA Generativa (GenIA)**.`,
      contentDetail: `La **GenIA** ha democratizado el acceso a la IA, ampliando el alcance hacia nuevas aplicaciones empresariales, lo que ha intensificado la discusión sobre el equilibrio entre la innovación empresarial y la gobernanza, pues los casos de uso impactan transversalmente procesos que involucran a clientes, empleados, proveedores y demás actores del entorno empresarial.

**¿Crees que es necesario un gobierno para la implementación de casos de uso de algoritmos automatizados o sistemas de IA?**`,
      avatarTranscript: `Hola, en esta pantalla descubrirás cómo los algoritmos evolucionaron hasta convertirse en la base de tecnologías como la inteligencia artificial y la IA generativa.

Para explorar el contenido, haz clic en los elementos interactivos y revisa las definiciones y relaciones entre conceptos clave como machine learning, deep learning y GenIA.

La idea principal es que los algoritmos pasaron de ejecutar instrucciones fijas a aprender patrones a partir de grandes volúmenes de datos. Esto ha permitido desarrollar sistemas más inteligentes, capaces de apoyar procesos empresariales, automatizar tareas y generar contenido de manera innovadora.

Sin embargo, el crecimiento de estas tecnologías también plantea retos sobre el uso responsable y la necesidad de establecer mecanismos de gobernanza. Continúa a la siguiente sección y reflexiona sobre el impacto de la IA en las organizaciones y la sociedad.`,
      infoPopup: {
        title: "¿Sabías que...?",
        body: "Un articulo de IBM del 2024 señaló que el 42% de las organizaciones de más de 1000 empleados utilizaban activamente IA, mientras que para empresas menores a 50 empleados, menos del 4% utilizaban IA. Una democratización de la IA muy divergente.",
        link: { label: "Ver articulo IBM", url: "https://www.ibm.com/es-es/think/insights/democratizing-ai" },
      },
      activity: {
        type: "true-false",
        description: "Selecciona verdadero o falso de acuerdo a la frase.",
        points: 5,
        statement: "La implementación, gestión y supervisión de algoritmos automatizados o sistemas de IA es una responsabilidad exclusiva de roles técnicos dentro de una empresa.",
        answer: false,
        feedbackTrue: "Incorrecto. Es una percepción que suele basarse en una visión de los algoritmos y la IA como software complejo, sin embargo, es necesaria la colaboración de diversos roles ya que estos sistemas carecen de intención e interpretación, lo que requiere colaboración para garantizar que sus resultados se alineen con los objetivos de negocios y sus valores éticos.",
        feedbackFalse: "¡Correcto!, estos sistemas incluyen no solo a sus desarrolladores, también a expertos del negocio que contextualizan los resultados, y evalúan los riesgos e impactos en los stakeholders internos y externos, temas que por si solos los algoritmos no pueden realizar.",
      },
    },
    {
      id: "module-2",
      title: "Desafíos de los Algoritmos en el Entorno Empresarial",
      icon: "Swords",
      purpose: "Identificar los retos que enfrentan las organizaciones al implementar algoritmos o sistemas de IA.",
      image: "/screenshots/Desafios.png",
      mediaSource: {
        label: "Desafios de los algoritmos de desición",
        url: "https://datos.gob.es/sites/default/files/doc/file/nuevas_tendencias_y_desafios_en_el_mundo_de_los_datos.pdf",
        author: "Gobierno de España"
      },      
      content: `A partir de la **transformación digital** y la adopción de sistemas de IA, las empresas han obtenido grandes beneficios en términos comerciales y de eficiencia. La combinación de la tecnología y los datos es el principal motor de esta transformación, sin embargo, en ocasiones los impactos asociados son ignorados por las empresas, priorizando sus beneficios frente a prevención de *riesgos*.

Existen diversos casos sobre *consecuencias negativas* en entornos sociales, entre ellos aparece un caso en el Reino Unido analizado por la Universidad de Oxford, que señaló en un estudio del año 2025, que el algoritmo de Uber maximizó las ganancias corporativas a través de su sistema de precios dinámicos, reteniendo más del 50% en tarifas altas, lo que ha reducido el pago neto que le queda a los conductores.`,
      contentDetail: `Entre los *riesgos* podemos encontrar brechas de seguridad y fugas de datos, vulneraciones a la privacidad de datos, resultados algorítmicos sesgados que amplifican desigualdades, fragmentación regulatoria que provoca el traslado de operaciones a entornos menos regulados y dificultades para realizar una rendición de cuentas efectiva de estos sistemas.

      **¿Serán los algoritmos una caja negra que no permite saber el por que de sus resultados?**`,
      avatarTranscript: `Hola, en esta pantalla explorarás algunos beneficios y riesgos asociados al uso de algoritmos e inteligencia artificial en las organizaciones.

Para interactuar con el contenido, haz clic en los elementos destacados y revisa los ejemplos y conceptos relacionados con impactos sociales, privacidad y toma de decisiones automatizadas.

La idea principal es que, aunque la transformación digital y la IA han permitido mejorar la eficiencia y generar beneficios comerciales, también han surgido desafíos importantes. Algunos algoritmos pueden afectar la transparencia, amplificar desigualdades o generar decisiones difíciles de explicar. Además, riesgos como fugas de datos, sesgos y falta de regulación han abierto el debate sobre el uso responsable de estas tecnologías.

A continuación, reflexiona sobre esta pregunta: ¿los algoritmos funcionan como una “caja negra” que dificulta comprender cómo se obtienen sus resultados? Continúa para conocer más sobre gobernanza y explicabilidad en sistemas de IA.`,
      infoPopup: {
        title: "Estudio de la Universidad de Oxford",
        body: `A través del estudio "Not Even Nice Work If You Can Get It; A Longitudinal Study of Uber’s Algorithmic Pay and Pricing" la Universidad de Oxford en el año 2025 publicó un análisis de 1.5 millones de viajes que reveló un cambio significativo cuando Uber introdujo un algoritmo de precios dinamico en 2023.`,
        link: { label: "Acceso al estudio", url: "https://www.ox.ac.uk/news/2025-06-23-new-oxford-research-reveals-uber-s-algorithmic-pricing-leaves-drivers-and-passengers" },
      },
      activity: {
        type: "true-false",
        description: "Selecciona verdadero o falso de acuerdo a la frase.",
        points: 5,
        statement: "Los algoritmos no son neutrales frente a escenarios de decisión que involucran actores internos o externos de las organizaciones.",
        answer: true,
        feedbackTrue: "¡Correcto! Se ha documentado que los algoritmos reproducen sesgos del comportamiento humano y amplifican desigualdades sociales.",
        feedbackFalse: "Incorrecto. Los algoritmos no son neutrales, a pesar de que carecen de intencion, amplifican los sesgos existentes en los datos o sus desarrolladores.",
      },
    },
    {
      id: "module-3",
      title: "Acerca de los Sesgos y la Opacidad",
      icon: "Users",
      purpose: "Comprender los conceptos de los sesgos y los retos de la opacidad.",
      image: "/screenshots/Bias.jpg",
      mediaSource: {
        label: "What Is Algorithmic Bias",
        url: "https://expertallies.com/identifying-algorithmic-ai-bias/",
        author: "Teodora Dobrilova - Expert Allies"
      },
      content: `El **sesgo** es un trato sistemático diferenciado que reciben personas o cosas en comparación con otras. Es de los principales desafíos de los sistemas de IA y requiere una comprensión profunda, más allá de su concepto.

Desde un punto de vista técnico, *el sesgo es necesario* para que los algoritmos clasifiquen y diferencien patrones; el sesgo por sí solo no es bueno ni malo, sin embargo, sus efectos pueden ser negativos, positivos o neutrales. Identificarlo es importante para comprender su impacto.

Los sesgos pueden ser cognitivos, cuando un humano interpreta información que influye involuntariamente en el sistema; pueden provenir de los datos, a partir de una selección que no refleja la distribución del mundo real o que su recolección no es aleatoria; pueden nacer desde la ingeniería, debido a decisiones técnicas de diseño.

Desde otra perspectiva, existen *sesgos de primer nivel*, donde se aplican diferentes estándares según el grupo, y *sesgos de segundo nivel*, donde se aplican los mismos estándares de forma desigual a todos los grupos.`,
      contentDetail: `Por otro lado, es una percepción común que los algoritmos actúan como *cajas negras*, y aquí aparece cierta complejidad, pues los algoritmos más simples de ML, sí permiten identificar que variables produjeron un resultado, sin embargo, modelos más complejos de DL presentan dificultad técnica para rastrear la lógica de una decisión, en parte por el masivo volumen de datos y la representación matemática del modelo.

      Esta falta de explicabilidad ha creado una nueva rama en el campo, la **inteligencia artificial explicable (XAI)**.`,
      avatarTranscript: `Hola, en esta pantalla conocerás cómo los sesgos y la falta de explicabilidad influyen en el funcionamiento de los sistemas de inteligencia artificial.

Para explorar el contenido, haz clic en los elementos interactivos y revisa los diferentes tipos de sesgos, sus causas y el impacto que pueden generar en las decisiones automatizadas.

La idea principal es que el sesgo no siempre es negativo: en IA permite clasificar y reconocer patrones. Sin embargo, dependiendo de cómo se diseñen los algoritmos, los datos utilizados o las interpretaciones humanas involucradas, pueden surgir resultados injustos o desiguales. Además, mientras algunos modelos de inteligencia artificial permiten entender cómo toman decisiones, otros, especialmente los más complejos, funcionan de manera difícil de interpretar, generando la percepción de una “caja negra”.

Continúa a la siguiente sección para descubrir cómo en el contexto internacional estan estructurandose marcos de gobernanza.`,
      infoPopup: {
        title: "Manejo de sesgos por las organizaciones",
        body: "El artículo de McKinsey del 2025, menciona como las organizaciones estan tomando medidas para generar valor con la IA y al mismo tiempo mitigando sus riesgos.",
        link: { label: "Ver Artículo McKinsey", url: "https://www.mckinsey.com/locations/south-america/latam/hispanoamerica-en-potencia/el-estado-de-la-ia-como-se-renuevan-las-organizaciones-para-capturar-valor/es-CL" },
      },
      activity: {
        type: "drag-drop",
        description: "Empareja el término con su definición según corresponda.",
        points: 5,
        question: "Determina la relación entre los términos y los ejemplos:",
        pairs: [
          { term: "Sesgo cognitivo", definition: "Favorecer predicciones de su equipo de futbol" },
          { term: "Sesgo de datos", definition: "Base de datos con registros de solo una región de un país" },
          { term: "Sesgo de ingenieria", definition: "Elección de un algoritmo no acorde a las necesidades del problema" },
          { term: "Sesgo de primer nivel", definition: "Oficiales que exigen documentos a ciertos grupos étnicos" },
          { term: "Sesgo de segundo nivel", definition: "Desarrollador que elige un estándar de éxito" },
        ],
      },
    },
    {
      id: "module-4",
      title: "Panorama Global de Gobernanza y Alcances Regulatorios",
      icon: "EarthLock",
      purpose: "Analizar el estado actual en el panorama mundial y los avances en responsabilidad tecnológica.",
      image: "https://www.youtube.com/watch?v=QcG6TFA6Ysg",
      mediaSource: {
        label: "La Unión Europea regula la IA",
        url: "https://www.youtube.com/watch?v=QcG6TFA6Ysg",
        author: "DW Español - YouTube"
      },
      content: `Actualmente existen dos enfoques principales a nivel de **gobernanza**; el derecho duro (hard law) vinculado a obligaciones legales y el derecho blando (soft law) que establece la adopción voluntaria.

La Ley de IA de la Unión Europea (*EU AI Act*), que emerge como uno de los primeros marcos integrales del mundo, estableciendo niveles de riesgo y exigiendo evaluaciones de conformidad para sistemas de alto riesgo. El Convenio Marco del Consejo de Europa sobre IA, aparece como un tratado internacional que busca que el uso de la IA esté vinculado a los derechos humanos y a la democracia. Además, el Reglamento General de Protección de Datos (GDPR) realiza una relación de los derechos frente a decisiones automatizadas, siendo las anteriores las principales regulaciones en la materia.

Existen otros *instrumentos no vinculantes*, como los Principios de la OCDE sobre IA, la Recomendación de la UNESCO sobre la Ética de la IA, el Marco de gestión de riesgos de IA del NIST (AI RMF) y los Estándares ISO/IEC relacionados con las tecnologías de la información e IA, que establecen guías, principios y estándares para promover el desarrollo sostenible de la IA.`,
      contentDetail: `Se puede observar que existe una *dispersión normativa* entre las regiones del mundo, donde las potencias tecnológicas adoptan enfoques que priorizan sus intereses. Por un lado la Union Europea se presenta como el líder regulador, mientras que Estados Unidos se orienta a la innovación y competitividad; por otro lado China se aleja de visiones occidentales y se enmarca en la soberanía del Estado, y por su parte, el sur global enfrenta desafíos de dependencia extranjera, que limita proposiciones al respecto.

Las **empresas** por su lado, han desarrollado sus propios marcos y adoptado manifiestos como responsabilidad digital corporativa (CDR), presentando la ética y responsabilidad como una ventaja competitiva.`,
      avatarTranscript: `Hola, en esta pantalla conocerás los principales enfoques de gobernanza y regulación que actualmente orientan el desarrollo y uso de la inteligencia artificial en el mundo.

Para interactuar con el contenido, haz clic en los elementos y explora los marcos regulatorios, principios y estándares internacionales relacionados con la IA.

La idea clave es que existen dos grandes enfoques: uno basado en obligaciones legales, conocido como derecho duro, y otro sustentado en recomendaciones y adopción voluntaria, llamado derecho blando. Diferentes regiones y organizaciones han desarrollado modelos propios para equilibrar innovación, ética, derechos humanos y competitividad. Mientras algunos países priorizan la regulación estricta, otros se enfocan en impulsar el desarrollo tecnológico y la soberanía digital.

Continúa a la siguiente sección para analizar cómo adaptar prácticas de responsabilidad y gobernanza de IA en procesos y estrategias empresariales.`,
      infoPopup: {
        title: "Ley de IA de la UE",
        body: "La Ley de IA de la Unión Europea (EU AI Act) establece un marco sobre niveles de riesgo que tiene efectos sobre las aplicaciones de la IA.",
        link: { label: "Acceder a la Ley de IA de la UE", url: "https://artificialintelligenceact.eu/es/" },
      },
      activity: {
        type: "multiple-choice",
        description: "Pregunta de selección multiple, respuesta única.",
        points: 5,
        question: "¿Cuál es la principal diferencia entre la Ley de IA de la Unión Europea y los estándares ISO/IEC?",
        options: [
          { id: "a", text: "La Ley de IA se centra en la ética, mientras que los estándares ISO/IEC se enfocan en la seguridad", correct: false, feedback: "Incorrecto. Ambos abordan aspectos éticos y de seguridad, pero con diferentes enfoques y niveles de regulación." },
          { id: "b", text: "La Ley de IA se aplica solo a empresas europeas, mientras que los estándares ISO/IEC impone acciones penales internacionalmente", correct: false, feedback: "Incorrecto. La Ley de IA tiene aplicabilidad en toda la UE, y los estándares ISO/IEC son recomendaciones internacionales." },
          { id: "c", text: "La Ley de IA es vinculante, mientras que los estándares ISO/IEC son instrumentos voluntarios", correct: true, feedback: "¡Correcto! La Ley de IA de la UE es un marco legal vinculante, mientras que los estándares ISO/IEC son guías de gestión recomendables." },
          { id: "d", text: "La Ley de IA es más reciente que los estándares ISO/IEC", correct: false, feedback: "Incorrecto. Los estándares ISO/IEC han existido durante más tiempo que la Ley de IA de la UE." },
        ],
      },
    },
    {
      id: "module-5",
      title: "Arquitectura de la Gobernanza Algorítmica",
      icon: "Wrench",
      purpose: "Integrar metodologías en el ciclo de vida de los sistemas para lograr gobierno efectivo.",
      image: "/screenshots/Readiness.png",
      mediaSource: {
        label: "The AI Readiness Assessment",
        url: "https://www.undp.org/blog/are-countries-ready-ai-how-they-can-ensure-ethical-and-responsible-adoption",
        author: "United Nations Development Programme (UNDP)"
      },
      content: `Para implementar una **gobernanza algorítmica** exitosa en las organizaciones, es fundamental iniciar con el *liderazgo de la alta dirección*, desde donde se establezca una postura y visión estratégica materializada a través de una política de IA empresarial. Las organizaciones que tienen alta participación de su capa ejecutiva han tenido mayor impacto en sus resultados.

A partir de aquí, es importante la definición de *responsabilidades y roles*, como comités interdisciplinarios, enfocados en la democratización, gestión y control de la IA, así como en la integración con otros mecanismos ya existentes en la organización. En este marco es crucial que se documente los estándares que se crean y/o adoptan, además de cuales aspectos son excluidos en el contexto institucional. La norma ISO/IEC 42001:2023, brinda una extensa guía para aterrizar muchos conceptos.

Por otro lado, realizar un mapeo del contexto y la clasificación del riesgo, permite categorizar los posibles impactos, los actores involucrados y las limitaciones del sistema, temática que aborda más al detalle la Ley de IA de la Unión Europea y el marco NIST AI RMF 1.0, así como también lo detalla la norma ISO/IEC 23894 sobre la gestión de *riesgos de IA*.

Los aspectos éticos son cada vez más relevantes, por eso el informe de IA 2022 de la UNESCO establece recomendaciones que buscan establecer *responsabilidad compartida* sobre los efectos conocidos y desconocidos de esta tecnología, que fortalecen la implementación de estas políticas; por eso el desarrollo de sistemas de transparencia, explicabilidad y evaluación continua garantizan evolución junto a la innovación tecnológica, como soporte tenemos la norma ISO/IEC 24027:2021.`,
      contentDetail: `Esta arquitectura debe garantizar a su vez aspectos técnicos, asociados a documentación de los sistemas y a la integridad de los datos. Las normas de la serie ISO/IEC 5259 tienen un amplio desarrollo sobre procesos de **calidad de datos**.

Además, garantizar el ciclo de vida de estos sistemas, la trazabilidad funcional y la administración técnica, asegura altos estándares de calidad necesarios para la continuidad del negocio, la seguridad tecnológica y la confiabilidad, la norma ISO/IEC 23053:2022 da ampliación sobre este tema.`,
      avatarTranscript: `Hola, en esta pantalla conocerás los elementos clave para implementar una gobernanza algorítmica efectiva dentro de las organizaciones.

Para explorar el contenido, haz clic en los elementos interactivos y revisa cómo se integran aspectos estratégicos, éticos y técnicos en la gestión de sistemas de inteligencia artificial.

La idea principal es que una gobernanza exitosa comienza desde la alta dirección, con políticas claras, definición de roles y participación de equipos interdisciplinarios. Además, las organizaciones deben identificar riesgos, establecer mecanismos de transparencia y asegurar la calidad de los datos y la trazabilidad de los sistemas. Todo esto permite equilibrar innovación, responsabilidad y continuidad del negocio apoyándose en estándares y marcos internacionales.

Continúa a la siguiente sección para descubrir la importancia de los datos como componente clave de los sistemas de IA.`,
      infoPopup: {
        title: "Estandar de IA ISO/IEC 42001:2023",
        body: "La norma ISO/IEC 42001 ofrece un marco para ayudar a las organizaciones a implementar un gobierno de IA en todo el ciclo de vida de los sistemas. AWS analiza la norma y su implentación.",
        link: { label: "Ir a Blog de seguridad de AWS: ISO/IEC 42001:2023", url: "https://aws.amazon.com/es/blogs/security/ai-lifecycle-risk-management-iso-iec-420012023-for-ai-governance/" },
      },
      activity: {
        type: "ordering",
        description: "Actividad de ordenamiento.",
        points: 5,
        question: "Ordena los pasos del 1 al 5, considerando la jerarquía de procesos establecida:",
        steps: [
          { id: 1, text: "Definir la Política de IA institucional, asignar roles clave." },
          { id: 2, text: "Entender dónde opera la IA y qué niveles de riesgo existen en ese contexto." },
          { id: 3, text: "Garantizar la calidad de los datos y demás requerimientos para su uso." },
          { id: 4, text: "Implementar revisiones de conformidad y herramientas de IA explicable (XAI)." },
          { id: 5, text: "Monitorear y auditar de forma constante buscando la mejora continua." },
        ],
      },
    },
    {
      id: "module-6",
      title: "Calidad de Datos para Algoritmos",
      icon: "ShieldCheck",
      purpose: "Aprender la importancia de la gestión de los componentes de calidad de datos.",
      image: "https://www.youtube.com/watch?v=OtZ8Mz0w3J4",
      mediaSource: {
        label: `Calidad de Datos | Gobierno de Datos`,
        url: "https://www.youtube.com/watch?v=OtZ8Mz0w3J4",
        author: "Axity - YouTube"
      },
      content: `La **calidad de datos** no es una cifra o concepto absoluto, es el grado en el que los datos satisfacen las necesidades de una organización en determinados contextos. Para el campo de la IA, son el principal motor de aprendizaje y generación de aplicaciones de predicción. Los resultados pueden no ser precisos en la medida que no se cumplan ciertos criterios de calidad, este problema es llamado *BIBO* (“Garbage In, Garbage Out”, “Basura Entra, Basura Sale”).

La serie de normas *ISO/IEC 5259:2024* establece un marco de procesos de calidad de datos para implementar en el ciclo de vida del sistema:

1. Requisitos de datos: características necesarias para la tarea de IA, como su origen, magnitud y privacidad.

2. Preparación de datos: transformaciones que permitan limpiar y alistar para su propósito.

3. Etiquetado: asignación de valores objetivos que deben ser supervisados para asegurar su precisión.`,
      contentDetail: `Adicional, los datos deben estar gobernados bajo un *modelo de calidad* iterativo, que garantice la gestión de características criticas para su uso.

La representatividad, es crucial para reflejar con fidelidad la población objeto de resultado de un algoritmo y evitar sesgos. La exactitud e integridad, indica que los datos deben estar completos y correctos para mitigar errores de interpretación. Los datos deben mantenerse uniformes a través de su ciclo de vida, y estar lo suficientemente actualizados para reflejar la realidad.`,
      avatarTranscript: `Hola, en esta pantalla conocerás por qué la calidad de los datos es un elemento esencial para el funcionamiento confiable de los sistemas de inteligencia artificial.

Para interactuar con el contenido, haz clic en los elementos destacados y explora las etapas del ciclo de calidad de datos y sus principales características.

La idea principal es que los sistemas de IA aprenden a partir de los datos, por eso, si la información contiene errores o no representa correctamente la realidad, los resultados también serán incorrectos. Este problema es conocido como “Basura entra, basura sale”. Para reducir estos riesgos, es necesario gestionar aspectos como la preparación, limpieza y etiquetado de los datos, además de garantizar características clave como exactitud, integridad, representatividad y actualización continua.

Continúa a la siguiente sección para descubrir cómo la supervisión humana y la gobernanza fortalecen la transparencia, la ética y la confiabilidad de la inteligencia artificial.`,
      infoPopup: {
        title: "Datos preparados para la IA",
        body: "En 2024 Gartner realizó un analisis sobre la importancia de los datos preparados para la IA, artículo que continua siendo vigente ante las necesidades de estos sistemas sobre la calidad de los datos.",
        link: { label: "Ir a artículo", url: "https://www.gartner.es/es/articulos/datos-preparados-para-la-ia" },
      },
      activity: {
        type: "multiple-choice",
        description: "Pregunta de selección multiple, respuesta única.",
        points: 5,
        question: "¿Cuál es considerada como una de las características de calidad de los datos más significaticas para evitar sesgos en los algoritmos de IA?",
        options: [
          { id: "a", text: "Integridad", correct: false, feedback: "Incorrecto. A pesar de que es muy importante garantizar datos completos, existen estrategias de imputación o recaptura de datos." },
          { id: "b", text: "Representatividad", correct: true, feedback: "¡Correcto! si los datos de entrenamiento no representan a la población objetivo, el modelo resultante será sesgado." },
          { id: "c", text: "Volumen", correct: false, feedback: "Incorrecto. Aunque es importante tener suficientes datos, la cantidad sola no garantiza la calidad." },
          { id: "d", text: "Actualidad", correct: false, feedback: "Incorrecto. Tener los datos actualizados no evita por si misma la existencia de sesgos." },
        ],
      },
    },
    {
      id: "module-7",
      title: "Técnicas de Auditoría, Validación y Verificación (V&V)",
      icon: "Gauge",
      purpose: "Comprender las metodologías sistemáticas de auditoria de sistemas de IA.",
      image: "https://www.youtube.com/watch?v=A3-__nnagC0",
      mediaSource: {
        label: "Auditoría de Sesgos en IA",
        url: "https://www.youtube.com/watch?v=A3-__nnagC0",
        author: `Gustavo Terrera | Agile Testing & IA para Líderes - YouTube`
      },
      content: `La **auditoria de IA**, utiliza técnicas para comprobar que estos sistemas se han diseñado cumpliendo requerimientos funcionales, y para evaluar que su comportamiento este alineado a su propósito, todo lo anterior dentro de los limites considerados como aceptables.

A nivel metodológico, el *marco NIST AI RMF 1.0* propone el enfoque TEVV (Prueba, Evaluación, Verificación y Validación) para ser integrado en todo el ciclo de vida. En el diseño, se requiere validación rigurosa en el ejercicio de análisis de requisitos y arquitectura. En el desarrollo, validar el modelo mediante la separación estricta de datos de entrenamiento, validación y prueba; evitando mostrar al modelo los conjuntos de pruebas. En la operación, es imperativo la validación continua y monitoreo para detectar fallos de ejecución, errores en tiempo de ejecución o cambios drásticos de predicción.

Entre las técnicas, dependiendo el contexto y la tecnología utilizada se establece realizar:

- **Auditoria de datos**: Evaluar representatividad de los conjuntos de datos, y la integridad de las etiquetas de datos sobre variables que puedan incluir discriminación.

- **Pruebas técnicas**: Monitorear constantemente las métricas clásicas de rendimiento (F1, Recall, AUC) buscando minimizar escenarios de falsos positivos y otras técnicas de fairness como Fairlearn o IBM AI Fairness 360.

- **Pruebas de comportamiento**: Someter a técnicas que evalúan respuestas frente a perturbaciones de los datos o cambios de distribución, como pruebas de estrés y de invarianza que midan los cambios.

- **Explicación y trazabilidad**: Implementar algoritmos complementarios de explicación técnica, como SHAP o LIME, que permite entender la importancia matemática de cada variable sobre el modelo.`,
      contentDetail: `La verificación asegura que el sistema se construyó correctamente bajo los criterios establecidos técnicamente. ¿Se construyó el sistema correctamente?.

La validación asegura que el sistema cumple con el propósito para el cual se diseño y su comportamiento es aceptable en el mundo real según las necesidades del usuario. ¿Se construyó el sistema correcto?.

La auditoria requiere procesos de intervención humana, como el concepto de *Human in the Loop (HITL)*, que permitan integrar el desarrollo tecnológico con el análisis y ética de las personas, que mitiguen sesgos, den manejo a excepciones del sistema que no estaban contemplados y garanticen declaraciones de responsabilidad institucional.`,
      avatarTranscript: `Hola, en esta pantalla conocerás cómo la auditoría de inteligencia artificial ayuda a verificar que los sistemas funcionen de manera correcta, segura y alineada con su propósito.

Para interactuar con el contenido, haz clic en los elementos destacados y explora las etapas de prueba, validación y monitoreo aplicadas durante el ciclo de vida de la IA.

La idea principal es que auditar sistemas de IA implica evaluar tanto la calidad de los datos como el comportamiento y desempeño de los modelos. Para ello se utilizan métricas técnicas, pruebas de comportamiento y herramientas de explicabilidad que permiten entender cómo influyen las variables en las decisiones del sistema. Además, la auditoría busca asegurar dos aspectos clave: que el sistema haya sido construido correctamente y que realmente responda a las necesidades del entorno real.

Continúa a la siguiente sección para analizar la gestión de riesgos sobre los sistemas de IA, y como bajo un ejemplo practico se diseña una matriz de riesgos.`,
      infoPopup: {
        title: "¿Qué es una auditoría de IA?",
        body: "Debido a la creciente implementación de casos de uso de sistemas de IA, cada vez es más necesario analizar estos sistemas y entender adecuadamente como hacerlo. IBM realiza un analisis integral sobre este tema en su artículo del 2025.",
        link: { label: "Ir a artículo de IBM", url: "https://www.ibm.com/think/topics/ai-audit" },
      },
      activity: {
        type: "drag-drop",
        description: "Empareja el término con su definición según corresponda.",
        points: 5,
        question: "Determina la relación entre los términos y los ejemplos:",
        pairs: [
          { term: "Auditoría de Calidad de Datos", definition: "Realizar verificaciones de representatividad y balance para mitigar sesgos históricos heredados." },
          { term: "Pruebas de comportamiento", definition: "Someter el modelo a casos extremos para evaluar su respuesta." },
          { term: "Human in the Loop (HITL)", definition: "Combinación de la supervisión humana con sistemas de IA para mejorar la precisión." },
          { term: "Verificación", definition: "Proceso de análisis de que el sistema cumple con los criterios establecidos." },
          { term: "Validación", definition: "Análisis del cumplimiento de requisitos de uso y/o aplicación." },
        ],
      },
    },
    {
      id: "module-8",
      title: "Gestión de Riesgos y Diseño de Matriz",
      icon: "PenTool",
      purpose: "Identificar, analizar y gestionar los riesgos específicos de la IA.",
      image: "/screenshots/AI Risk.png",
      mediaSource: {
        label: "AI Risk Management Framework 1.0",
        url: "https://airc.nist.gov/airmf-resources/airmf/5-sec-core/",
        author: `NIST - National Institute of Standards and Technology`
      },
      content: `Según el marco NIST AI RMF 1.0 y la norma ISO/IEC 23894:2023, el **riesgo** se define como el efecto de la incertidumbre sobre los objetivos, considerando el efecto como una desviación de lo esperado (positiva o negativa), y la incertidumbre como el estado de deficiencia de información sobre consecuencias, probabilidades o compresión de eventos.

Para establecer una gestión efectiva de los riesgos, se plantea el siguiente proceso:

1. *Establecer el contexto*: Definir el alcance técnico y social, los objetivos de la IA y los criterios de riesgo (como considerar que es y que no es aceptable para la empresa).

2. *Evaluación de riesgos*: Realizar un proceso de identificación, análisis y valoración que permite detectar las fuentes de riesgo, evaluar la probabilidad de ocurrencia y su magnitud, y establecer si es o no aceptable.

3. *Tratamiento del riesgo*: Seleccionar e implementar técnicas o metodologías de control para gestionar el riesgo.

4. *Monitoreo y revisión*: Garantizar la supervisión de los riesgos que permita mitigar y gestionar correctamente los riesgos.

Para proponer un caso aplicable de ejemplo en el contexto empresarial, podemos establecer el siguiente:

“En el área de recursos humanos de una organización, se esta utilizando un algoritmo de preselección de candidatos, el cual filtra perfiles de candidatos postulados a vacantes de la empresa a través del análisis de sus perfiles laborales y de su información demográfica para seleccionar los perfiles más afines con la vacante y la organización.”

Para iniciar con la gestión de riesgos de este caso, podemos partir de un criterios de riesgo ya establecidos por la organización. “No se acepta faltas a principios institucionales de paridad de genero y diversidad cultural."

*Ahora desarrollemos un escenario de diseño de matriz de riesgo a través de la siguiente actividad.*`,
      contentDetail: `Es importante identificar los tipos de *vulnerabilidad* y la *criticidad* del riesgo; cada organización puede tener sus propias definiciones según el contexto económico, social e sectorial en el que realicen sus actividades.

Si bien para empresas de infraestructura tecnológica, que utilizan sistemas de IA que buscan eficiencia energética puede no tener altos riesgos hacia la sociedad, sin embargo, para empresas de salud que utilizan sistemas de IA para agilizar la atención medica, si existe un alto riesgo social por el tipo de vulnerabilidad que se puede presentar hacia los pacientes.

La **ley de IA de la Unión Europea**, establece para su región un marco jerárquico de riesgos que deben cumplir las organizaciones. Riesgo Inaceptable, sistemas que se definen como prohibidos (manipulación, puntuación social, etc.); Alto Riesgo, sistemas con estricta regulación (salud, transporte, contratación, etc.); Riesgo limitado y mínimo, sistemas con obligaciones de transparencia leve o no regulados.`,
      avatarTranscript: `Hola, has llegado al último módulo, en esta pantalla conocerás cómo las organizaciones pueden identificar, evaluar y gestionar los riesgos asociados al uso de sistemas de inteligencia artificial.

Para interactuar con el contenido, haz clic en los elementos destacados y revisa las etapas del proceso de gestión de riesgos y el ejemplo aplicado al área de recursos humanos.

La idea principal es que gestionar riesgos en IA implica comprender cómo la incertidumbre puede afectar los objetivos de una organización. Para ello, es necesario definir criterios de aceptación, identificar vulnerabilidades, analizar impactos y aplicar controles de monitoreo continuo. Además, el nivel de riesgo puede variar según el sector y el contexto, especialmente en áreas sensibles como salud, contratación o transporte, donde los efectos sobre las personas pueden ser más críticos.

No olvides realizar la actividad practica de diseño de matriz de riesgos para aplicar los conceptos aprendidos hasta ahora.

Ahora continúa hacia la evaluación para poner a prueba los conceptos aprendidos sobre gobernanza, riesgos y uso responsable de la inteligencia artificial.`,
      infoPopup: {
        title: "AI Risk Management Framework (AI RMF) 1.0",
        body: "Desde Estados Unidos, el Instituto Nacional de Estándares y Tecnología (NIST) generó una guía para orientar a las organizaciones sobre la implementación y fiabilidad de los sistemas de IA.",
        link: { label: "Consultar el marco AI RMF", url: "https://airc.nist.gov/airmf-resources/airmf/" },
      },
      activity: {
        type: "fill-blank",
        description: "Rellena los espacios en blanco según corresponda para completar el diseño de la matriz de riesgos. (Debes tener todas correctamente)",
        points: 5,
        question: "A partir del caso planteado, completa el diseño de la matriz de riesgos en construcción",
        sentence: `
        | Item | Descripción |
|---|---|
| **1. Escenario de riesgo** | El algoritmo [[blank]] a mujeres para cargos técnicos. |
| **2. Fuente de riesgo** | Datos históricos de contratación con [[blank]] de genero. |
| **3. Probabilidad de ocurrencia** *1 (menor) – 5 (mayor)* | [[blank]] |
| **4. Impacto** *1 (bajo) – 5 (alto)* | [[blank]] |
| **5. Medida de tratamiento** | Implementar controles de [[blank]] de genero en los datos. |
`,
        correctAnswersPerBlank: [
        ["excluye", "afecta", "perjudica"],
        ["sesgo", "errores", "sesgos"],
        ["4", "5"],
        ["4", "5"],
        ["paridad", "equidad", "balance", "igualdad"],
      ],
        feedbackCorrect: "¡Correcto!. Establecer correctamente el origen, la probabilidad y el impacto, son claves para plantear una medida adecuada de control.",
        feedbackWrong: "Incorrecto. Al menos una de tus respuestas es incorrecta. ",
      },
    }
  ],

  assessment: {
    title: "Evaluación Final",
    instructions: "Esta evaluación consta de 6 preguntas que abarcan todos los módulos estudiados. Necesitas obtener al menos un 80% para aprobar. Lee cada pregunta cuidadosamente antes de responder. Si se retira debera empezar de nuevo. ¡Buena suerte!",
    passingMessage: "¡Felicitaciones! Has demostrado un dominio sólido de los conceptos de gobernanza algorítmica necesarios para adaptar marcos a entornos empresariales. Estás preparado para aplicar estos conocimientos.",
    failingMessage: "Te recomendamos repasar los módulos indicados y volver a intentar la evaluación. Recuerda que el aprendizaje es un proceso, y cada intento es una oportunidad de mejora.",
    questions: [
      {
        id: "q1",
        moduleRef: "module-1",
        points: 10,
        type: "multiple-choice",
        question: "¿Cuál es la función principal de un algoritmo?",
        options: [
          { id: "a", text: "Diseñar infraestructura tecnológica.", correct: false, feedback: "Incorrecto. Los algoritmos en terminos generales no estan diseñados para ese propósito." },
          { id: "b", text: "Resolver un problema mediante una secuencia de instrucciones.", correct: true, feedback: "¡Correcto! Los algoritmos están diseñados para resolver problemas de manera sistemática y eficiente." },
          { id: "c", text: "Crear únicamente bases de datos.", correct: false, feedback: "Incorrecto. Las bases de datos son un fin particular que no es el propósito especifico de los algorítmos." },
          { id: "d", text: "Reemplazar completamente a las personas.", correct: false, feedback: "Incorrecto. Los algoritmos son herramientas que apoyan el trabajo humano, pero no reemplazan la creatividad y el juicio humano." },
        ],
      },
      {
        id: "q2",
        moduleRef: "module-2",
        points: 10,
        type: "multiple-choice",
        question: "Cada vez son mas los casos de uso en los que se aplica IA, ¿Cuál de los siguientes es un riesgo asociado al uso de sistemas de IA?",
        options: [
          { id: "a", text: "Eliminación total de errores humanos.", correct: false, feedback: "Incorrecto. Bajo las visiones actuales de la IA, siempre es necesaria la intervención humana." },
          { id: "b", text: "Incremento de la inseguridad mundial.", correct: false, feedback: "Incorrecto. No se tiene documentado influencia de la IA sobre variables de seguridad en la sociedad." },
          { id: "c", text: "Sesgos algorítmicos y vulneración de privacidad.", correct: true, feedback: "¡Correcto!. Los sesgos algorítmicos pueden perpetuar desigualdades, y la vulneración de privacidad representa un riesgo significativo en el uso de sistemas de IA." },
          { id: "d", text: "Ausencia de impacto organizacional.", correct: false, feedback: "Incorrecto. La implementación de sistemas de IA puede tener un impacto significativo en la organización." },
        ],
      },
      {
        id: "q3",
        moduleRef: "module-3",
        points: 10,
        type: "multiple-choice",
        question: "Entre los diversos paradigmas de auditoria de IA, especificamente, ¿Qué busca la IA explicable (XAI)?",
        options: [
          { id: "a", text: "Reducir la capacidad de procesamiento.", correct: false, feedback: "Incorrecto. Los esfuerzos orientados a la capacidad de procesamiento no estan vinculados a la explicabilidad de la IA." },
          { id: "b", text: "Eliminar el uso de datos en los modelos de IA.", correct: false, feedback: "Incorrecto. Los datos son el principal insumo de los modelos de IA." },
          { id: "c", text: "Comprender y explicar cómo los modelos toman decisiones.", correct: true, feedback: "¡Correcto! Mientras los modelos son cada vez más complejos, es crucial encontrar mecanismos que permitan explicar su funcionamiento." },
          { id: "d", text: "Sustituir completamente los modelos de IA.", correct: false, feedback: "Incorrecto. La IA esta cambiando las dinamicas tecnologicas de la sociedad, haciendo parte de la vida cotidiana de las personas." },
        ],
      },
      {
        id: "q4",
        moduleRef: "module-4",
        points: 10,
        type: "multiple-choice",
        question: "Según las prácticas de gobernanza algorítmica, ¿qué elemento es fundamental para una implementación exitosa?",
        options: [
          { id: "a", text: "La participación de la alta dirección.", correct: true, feedback: "¡Correcto!. Establecer la visión estrategica de la organización y la IA, es importante para dar un enfoque para un gobierno efectivo." },
          { id: "b", text: "Implementar IA en todos los procesos de la organización.", correct: false, feedback: "Incorrecto. Cada proceso requiere una revisión detallada para determinar la adecuación de la IA." },
          { id: "c", text: "Utilizar únicamente herramientas gratuitas.", correct: false, feedback: "Incorrecto. La elección del tipo de herramienta solo es un componente de la estrategia de implementación." },
          { id: "d", text: "Dejar la implementación solo a expertos de IA.", correct: false, feedback: "Incorrecto. La gobernanza efectiva requiere la participación de múltiples actores, no solo de expertos técnicos." },
        ],
      },
      {
        id: "q5",
        moduleRef: "module-5",
        points: 10,
        type: "multiple-choice",
        question: "En el contexto de interseccion de los datos y los modelos ¿Qué significa el concepto “Garbage In, Garbage Out” en IA?",
        options: [
          { id: "a", text: "Los sistemas de IA no necesitan datos.", correct: false, feedback: "Incorrecto. Los datos son el principal insumo de los sistemas de IA." },
          { id: "b", text: "Los algoritmos eliminan automáticamente los errores.", correct: false, feedback: "Incorrecto. A pesar de que existen sistemas automatizados de mejora continua, aún se requiere supervision humana." },
          { id: "c", text: "La IA solo funciona con grandes volúmenes de datos.", correct: false, feedback: "Incorrecto. La calidad de los datos es más importante que la cantidad." },
          { id: "d", text: "Datos de baja calidad generan resultados poco confiables.", correct: true, feedback: "¡Correcto! La calidad de los datos de entrada es crucial para obtener resultados confiables en sistemas de IA. Si basura entra, basura sale" },
        ],
      },
      {
        id: "q6",
        moduleRef: "module-6",
        points: 10,
        type: "multiple-choice",
        question: "En un sistema de IA de un hospital se detectó que algunos pacientes recibieron clasificaciones erradas debido a datos desactualizados. ¿Cuál debería ser la acción más adecuada dentro de la gestión de riesgos de IA?",
        options: [
          { id: "a", text: "Revisar la calidad y actualización de los datos, además de ajustar los controles de validación.", correct: true, feedback: "¡Correcto! La gestión de riesgos en IA requiere supervisar continuamente la calidad de los datos y el desempeño del sistema." },
          { id: "b", text: "Continuar utilizando el sistema sin revisiones para evitar retrasos en la atención.", correct: false, feedback: "Incorrecto. Ignorar errores en sistemas de alto impacto puede afectar la seguridad de los pacientes y aumentar el riesgo operativo y reputacional." },
          { id: "c", text: "Deshabilitar el sistema de IA y detener cualquier otra iniciativa en curso.", correct: false, feedback: "Incorrecto. La gestión de riesgos busca controlar y mitigar riesgos, no necesariamente eliminar toda tecnología asociada." },
          { id: "d", text: "Permitir que el sistema opere de manera autónoma sin supervisión humana para acelerar la atención.", correct: false, feedback: "Incorrecto. En contextos críticos como salud, la supervisión humana es fundamental para manejar excepciones no previstas por el sistema." },
        ],
      },
    ],
  },

  conclusion: {
    title: "Conclusiones",
    synthesis_1: `1. Las temáticas expuestas en los contenidos del ODC, reflejan la pluralidad de visiones que existen frente a la gobernanza de sistemas algorítmicos. Se observan componentes convergentes como la gestión de datos y de riesgos, sin embargo, es clara la falta de consenso en aspectos éticos, y de una estrategia estructurada para la integración empresarial. Se tienen ejemplos de empresas que han creado sus organismos de control de forma individual ante una tecnología que es de uso global.
    
    Por lo anterior, se confirma la importancia de adaptar los componentes que más se adecúen con el contexto de cada organización, tomándolos desde un análisis objetivo de las diferentes metodologías y como se complementan entre sí para articular un gobierno efectivo de estos sistemas.
    `,
    synthesis_2: ` 2. A partir del ejercicio investigativo realizado se evidenció el atraso regional de los países del sur global, para establecer mecanismos propios de gestión de sistemas algorítmicos, además de falta de participación en las discusiones internacionales, o del desarrollo de conversaciones internas sobre la necesidad de contextualizar estos sistemas con problemáticas y retos de la región. 
    
    En conclusión, existe una clara dependencia tanto tecnológica como estructural para gobernar una tecnología que está transformando las dinámicas de la sociedad.
    `,
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
            "Alawamleh, M., Shammas, N., Alawamleh, K., & Ismail, L. B. (2024). Examining the limitations of AI in business and the need for human insights using Interpretive Structural Modelling. *Journal of Open Innovation: Technology, Market, and Complexity*.",

            "Alcalde, S. B., Tomas, A., Vicente, D., & Heredia, A. R. (2026). *Algorithmic ethics in corporate contexts: Knowledge mapping for responsible management*. Cambridge University Press.",

            "Barrera, A. M. (2023). *El Modelo Educativo Digital Transmoderno MEDIT, una respuesta a la educación del siglo 21*. Universidad de Cundinamarca.",

            "Bou Reslan, F., & Maalouf, N. J. A. (2024). Assessing the transformative impact of AI adoption on efficiency, fraud detection, and skill dynamics in accounting practices. *Journal of Risk and Financial Management*.",

            "Buhmann, A., & Fieseler, C. (2021). Towards a deliberative framework for algorithmic accountability. *Technology in Society*.",

            "Cerchione, R., Liccardo, G., & Passaro, R. (2026). Artificial knowledge generation: Investigating the revolutionary role of generative AI in knowledge management. *Journal of Innovation & Knowledge*.",

            "Chan, C.-P., Tsai, C.-H., Tang, F.-K., & Yang, J.-H. (2025). A SHAP-based comparative analysis of machine learning model interpretability in financial classification tasks. *Journal of Applied Economic Sciences*.",

            "Cirjevskis, A. (2025). Exploring AI-ESG-driven synergies in M&A transactions: Open innovation and real options approaches. *Journal of Risk and Financial Management*.",

            "Conti, L. G., & Seele, P. (2025). Reflexivity and positionality statements: A way to tackle “second-level arbitrariness” bias in AI? *University of Lugano*.",

            "Coovadia, H., Marx, B., Botha, I., & Gold, N. O. (2025). Building an ethical artificial intelligence corporate governance framework for the integration of emerging technologies into business processes. *South African Journal of Accounting Research*.",

            "de Lucas Lopez, A. P., Gorneanu, A. E., Aránega, A. Y., & Martín, L. G. (2026). Ethics, transparency, and consumer trust in AI-enabled pricing: Implications for sustainable technology entrepreneurship and economic policy. *Sustainable Technology and Entrepreneurship*.",

            "de Oliveira, N. A., & Basso, L. F. C. (2025). Advancing credit rating prediction: The role of machine learning in corporate credit rating assessment. *Risks*.",

            "Fischer, B., & Frennert, S. (2025). Designing for robotization: Robot makers’ perceptions of robot companions. *Technological Forecasting & Social Change*.",

            "Giarmoleo, F. V., Ferrero, I., Rocchi, M., & Pellegrini, M. M. (2024). What ethics can say on artificial intelligence: Insights from a systematic literature review. *Business and Society Review*.",

            "Hughes, L., Mavi, R. K., Aghajani, M., et al. (2025). Impact of artificial intelligence on project management (PM): Multi-expert perspectives on advancing knowledge and driving innovation toward PM2030. *Journal of Innovation & Knowledge*.",

            "ISO. (2023). *Norma ISO/IEC 42001:2023 Tecnología de la información — Inteligencia artificial — Sistema de gestión* (inf. téc.). International Organization for Standardization.",

            "Jarrahi, M. H., Askay, D., Eshraghi, A., & Smith, P. (2023). Artificial intelligence and knowledge management: A partnership between human and AI. *Business Horizons*.",

            "Khaddam, A. A., & Alzghoul, A. (2025). Artificial intelligence-driven business intelligence for strategic energy and ESG management: A systematic review of economic and policy implications. *International Journal of Energy Economics and Policy*.",

            "Lo Ribeiro, J., Plangger, K., & Montecchi, M. (2026). Decoding responsible procurement: Conceptualizing bias co-evolution in AI-aided organizational decision-making. *British Journal of Management*.",

            "Martín Lucas, M., et al. (2025). What role does the humanisation of AI play in improving tourist performance? *Sociología y Tecnociencia*.",

            "Pepple, D., & Muthuthantrige, N. (2026). Human resource management in the age of algorithmic technologies: A systematic review and research agenda. *Journal of Innovation & Knowledge*.",

            "Protte, M., & Djawadi, B. M. (2025). Human vs. algorithmic auditors: The impact of entity type and ambiguity on human dishonesty. *Frontiers in Behavioral Economics*.",

            "Rajeswari, M., Vanitha, C. L., Xudoynazarova, S., et al. (2026). Design and validation of an explainable artificial intelligence–based decision intelligence model for cyber risk–aware quality systems and ethical human resource management. *Quality - Access to Success*.",

            "Song, Y., Du, H., Piao, T., & Shi, H. (2024). Research on financial risk intelligent monitoring and early warning model based on LSTM, transformer, and deep learning. *Journal of Organizational and End User Computing*.",

            "Stahl, B. C. (2022). Responsible innovation ecosystems: Ethical implications of the application of the ecosystem concept to artificial intelligence. *International Journal of Information Management*.",

            "Staszkiewicz, P. (2024). Artificial intelligence in audit risk assessment: An economic analysis of law. *Meditari Accountancy Research*.",

            "Szczekocka, E., Tarnec, C., & Pieczerak, J. (2022). *Standardization on bias in artificial intelligence as industry support*. IEEE.",

            "von Zahn, M., Zacharias, J., Lowin, M., Chen, J., & Hinz, O. (2025). Navigating AI conformity: A design framework to assess fairness, explainability, and performance. *Electronic Markets*.",

            "Zaidan, E., Truby, J., Ibrahim, I. A., & Hoppe, T. (2026). Hybrid global governance for responsible and inclusive artificial intelligence: Proposing a new Sustainable Development Goal 18. *Elsevier*.",

            "UNESCO. (2022). Recomendación sobre la ética de la inteligencia artificial. UNESCO. https://www.unesco.org/es/articles/recomendacion-sobre-la-etica-de-la-inteligencia-artificial",

            "EU Artificial Intelligence Act. (2024). High-level summary of the AI Act. EU Artificial Intelligence Act. https://artificialintelligenceact.eu/es/high-level-summary/",

            "ISO/IEC. (2024). ISO/IEC 5259-1:2024 Data quality for analytics and machine learning (ML) — Part 1: Overview, terminology, and examples. International Organization for Standardization.",

            "ISO/IEC. (2022). ISO/IEC 23053:2022 Framework for AI systems using machine learning (ML). International Organization for Standardization.",

            "ISO/IEC. (2023). ISO/IEC 23894:2023 Information technology — Artificial intelligence — Guidance on risk management. International Organization for Standardization.",

            "ISO/IEC. (2022). ISO/IEC 22989:2022 Information technology — Artificial intelligence — Artificial intelligence concepts and terminology. International Organization for Standardization.",

            "Tabassi, E. (2023). Artificial Intelligence Risk Management Framework (AI RMF 1.0). National Institute of Standards and Technology (NIST). https://doi.org/10.6028/NIST.AI.100-1",

  ],

  credits: {
    team: [
      { role: "Autoría y desarrollo conceptual", name: "Jose Felipe Gasca Guerrero" },
      { role: "Diseño y desarrollo web", name: "Equipo Autor" },
      { role: "Progama", name: "Especialización en Analitica y Ciencia de Datos"},
      { role: "Institución", name: "Universidad de Cundinamarca"}

    ],
    license: "CC BY 4.0",
    licenseUrl: "https://creativecommons.org/licenses/by/4.0/deed.es",
    licenseNote: "Este recurso educativo abierto puede ser reutilizado, adaptado y distribuido libremente, siempre que se otorgue el crédito apropiado a los autores originales. Se permite su uso con fines comerciales y no comerciales, incluyendo la creación de obras derivadas bajo los mismos términos.",
  },
};

export default contentConfig;
