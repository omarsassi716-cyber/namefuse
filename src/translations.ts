export interface LanguageConfig {
  code: string;
  name: string;
  flag: string;
  dir: "ltr" | "rtl";
}

export const LANGUAGES: LanguageConfig[] = [
  { code: "en", name: "English", flag: "🇺🇸", dir: "ltr" },
  { code: "es", name: "Español", flag: "🇪🇸", dir: "ltr" },
  { code: "fr", name: "Français", flag: "🇫🇷", dir: "ltr" },
  { code: "de", name: "Deutsch", flag: "🇩🇪", dir: "ltr" },
  { code: "ar", name: "العربية", flag: "🇸🇦", dir: "rtl" }
];

export const uiTranslations: Record<string, Record<string, string>> = {
  en: {
    title: "NameFuse",
    usernameGenerator: "Username Generator",
    displayNameGenerator: "Display Name Generator",
    allGenerators: "All Generators",
    availableGenerators: "Available Name Generators",
    keywordPlaceholder: "Enter niche, hobby, or keyword...",
    generateButton: "Generate Usernames",
    generating: "Generating...",
    favoritesTitle: "Your Saved Usernames",
    noFavorites: "No favorites saved yet. Click the star icon on any result to save it here!",
    clearAll: "Clear All",
    copyAll: "Copy All",
    copied: "Copied!",
    platformLabel: "Platform Format",
    styleLabel: "Username Style",
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    metaTitleSuffix: " | NameFuse",
    loadMore: "Load More Ideas",
    regenerate: "Regenerate Names",
    shareArticle: "Share Article Link",
    linkCopied: "Link Copied!",
    searchBlog: "Search strategic articles...",
    categories: "Categories",
    authorProfile: "Author Profile",
    tags: "Tags",
    readMore: "Read Full Article",
    minutesRead: "min read",
    backToBlog: "Back to Strategy Blog",
    footerDisclaimer: "NameFuse provides free procedural generators for creative handles and gaming tags. All brand names and trademark platforms belong to their respective owners.",
    recentArticles: "Recent Articles",
    noResultsFound: "No articles found matching your search.",
    availabilityCheck: "Check Availability"
  },
  es: {
    title: "NameFuse",
    usernameGenerator: "Generador de Nombres de Usuario",
    displayNameGenerator: "Generador de Nombres para Mostrar",
    allGenerators: "Todos los Generadores",
    availableGenerators: "Generadores de Nombres Disponibles",
    keywordPlaceholder: "Ingrese un nicho, pasatiempo o palabra clave...",
    generateButton: "Generar Nombres",
    generating: "Generando...",
    favoritesTitle: "Tus Nombres Guardados",
    noFavorites: "Aún no tienes favoritos. ¡Haz clic en la estrella de cualquier resultado para guardarlo aquí!",
    clearAll: "Borrar Todo",
    copyAll: "Copiar Todo",
    copied: "¡Copiado!",
    platformLabel: "Formato de Plataforma",
    styleLabel: "Estilo del Nombre",
    aboutUs: "Sobre Nosotros",
    contactUs: "Contáctenos",
    privacyPolicy: "Política de Privacidad",
    termsOfService: "Términos de Servicio",
    metaTitleSuffix: " | NameFuse",
    loadMore: "Cargar Más Ideas",
    regenerate: "Regenerar Nombres",
    shareArticle: "Compartir Enlace",
    linkCopied: "¡Enlace Copiado!",
    searchBlog: "Buscar artículos estratégicos...",
    categories: "Categorías",
    authorProfile: "Perfil del Autor",
    tags: "Etiquetas",
    readMore: "Leer Artículo Completo",
    minutesRead: "min de lectura",
    backToBlog: "Volver al Blog de Estrategia",
    footerDisclaimer: "NameFuse ofrece generadores procedimentales gratuitos para nombres creativos y etiquetas de juegos. Todas las marcas y plataformas comerciales pertenecen a sus respectivos dueños.",
    recentArticles: "Artículos Recientes",
    noResultsFound: "No se encontraron artículos que coincidan con su búsqueda.",
    availabilityCheck: "Verificar Disponibilidad"
  },
  fr: {
    title: "NameFuse",
    usernameGenerator: "Générateur de Noms d'Utilisateur",
    displayNameGenerator: "Générateur de Noms d'Affichage",
    allGenerators: "Tous les Générateurs",
    availableGenerators: "Générateurs de Noms Disponibles",
    keywordPlaceholder: "Entrez une niche, un hobby ou un mot-clé...",
    generateButton: "Générer des Noms",
    generating: "Génération...",
    favoritesTitle: "Vos Noms Enregistrés",
    noFavorites: "Aucun favori pour le moment. Cliquez sur l'étoile à côté d'un résultat pour l'enregistrer ici !",
    clearAll: "Tout Effacer",
    copyAll: "Tout Copier",
    copied: "Copié !",
    platformLabel: "Format de Plateforme",
    styleLabel: "Style de Nom",
    aboutUs: "À Propos de Nous",
    contactUs: "Contactez-Nous",
    privacyPolicy: "Politique de Confidentialité",
    termsOfService: "Conditions d'Utilisation",
    metaTitleSuffix: " | NameFuse",
    loadMore: "Charger Plus d'Idées",
    regenerate: "Régénérer les Noms",
    shareArticle: "Partager l'Article",
    linkCopied: "Lien Copié !",
    searchBlog: "Rechercher des articles stratégiques...",
    categories: "Catégories",
    authorProfile: "Profil de l'Auteur",
    tags: "Mots-clés",
    readMore: "Lire l'Article Complet",
    minutesRead: "min de lecture",
    backToBlog: "Retour au Blog de Stratégie",
    footerDisclaimer: "NameFuse fournit des générateurs procéduraux gratuits pour les pseudonymes créatifs et les tags de jeu. Toutes les marques et plateformes appartiennent à leurs propriétaires respectifs.",
    recentArticles: "Articles Récents",
    noResultsFound: "Aucun article ne correspond à votre recherche.",
    availabilityCheck: "Vérifier la Disponibilité"
  },
  de: {
    title: "NameFuse",
    usernameGenerator: "Benutzernamen-Generator",
    displayNameGenerator: "Anzeigenamen-Generator",
    allGenerators: "Alle Generatoren",
    availableGenerators: "Verfügbare Namensgeneratoren",
    keywordPlaceholder: "Geben Sie Nische, Hobby oder Keyword ein...",
    generateButton: "Namen Generieren",
    generating: "Generiere...",
    favoritesTitle: "Deine Gespeicherten Namen",
    noFavorites: "Noch keine Favoriten gespeichert. Klicke auf das Sternsymbol eines Ergebnisses, um es hier zu speichern!",
    clearAll: "Alle Löschen",
    copyAll: "Alle Kopieren",
    copied: "Kopiert!",
    platformLabel: "Plattform-Format",
    styleLabel: "Namensstil",
    aboutUs: "Über Uns",
    contactUs: "Kontakt",
    privacyPolicy: "Datenschutzrichtlinie",
    termsOfService: "Nutzungsbedingungen",
    metaTitleSuffix: " | NameFuse",
    loadMore: "Mehr Ideen Laden",
    regenerate: "Namen Neu Generieren",
    shareArticle: "Artikel-Link Teilen",
    linkCopied: "Link Kopiert!",
    searchBlog: "Strategische Artikel suchen...",
    categories: "Kategorien",
    authorProfile: "Autorenprofil",
    tags: "Tags",
    readMore: "Ganzen Artikel Lesen",
    minutesRead: "Min. Lesedauer",
    backToBlog: "Zurück zum Strategie-Blog",
    footerDisclaimer: "NameFuse bietet kostenlose prozedurale Generatoren für kreative Handles und Gaming-Tags. Alle Marken und Plattformen gehören ihren jeweiligen Eigentümern.",
    recentArticles: "Neueste Artikel",
    noResultsFound: "Keine Artikel gefunden, die Ihrer Suche entsprechen.",
    availabilityCheck: "Verfügbarkeit Prüfen"
  },
  ar: {
    title: "NameFuse",
    usernameGenerator: "مولد أسماء المستخدمين",
    displayNameGenerator: "مولد الأسماء المستعارة",
    allGenerators: "جميع المولدات",
    availableGenerators: "مولدات الأسماء المتاحة",
    keywordPlaceholder: "أدخل مجالك، هوايتك، أو الكلمة المفتاحية...",
    generateButton: "توليد الأسماء",
    generating: "جاري التوليد...",
    favoritesTitle: "الأسماء المحفوظة لديك",
    noFavorites: "لم تقم بحفظ أي أسماء في المفضلة بعد. انقر على رمز النجمة بجوار أي نتيجة لحفظها هنا!",
    clearAll: "مسح الكل",
    copyAll: "نسخ الكل",
    copied: "تم النسخ!",
    platformLabel: "تنسيق المنصة",
    styleLabel: "نمط الاسم",
    aboutUs: "من نحن",
    contactUs: "اتصل بنا",
    privacyPolicy: "سياسة الخصوصية",
    termsOfService: "شروط الخدمة",
    metaTitleSuffix: " | NameFuse",
    loadMore: "تحميل المزيد من الأفكار",
    regenerate: "إعادة توليد الأسماء",
    shareArticle: "مشاركة رابط المقال",
    linkCopied: "تم نسخ الرابط!",
    searchBlog: "البحث في المقالات الاستراتيجية...",
    categories: "الفئات",
    authorProfile: "ملف الكاتب",
    tags: "الوسوم",
    readMore: "اقرأ المقال كاملاً",
    minutesRead: "دقائق القراءة",
    backToBlog: "العودة إلى مدونة الاستراتيجية",
    footerDisclaimer: "يوفر NameFuse مولدات إجرائية مجانية للمعرفات الإبداعية وعلامات الألعاب. جميع الأسماء التجارية والمنصات مملوكة لأصحابها المعنيين.",
    recentArticles: "المقالات الحديثة",
    noResultsFound: "لم يتم العثور على مقالات تطابق بحثك.",
    availabilityCheck: "التحقق من التوفر"
  }
};

// Translates core generator concepts dynamically
export const conceptTranslations: Record<string, Record<string, string>> = {
  es: {
    "Universal": "Universal",
    "Instagram": "Instagram",
    "TikTok": "TikTok",
    "YouTube": "YouTube",
    "Gaming": "Juegos",
    "Roblox": "Roblox",
    "Discord": "Discord",
    "Cool": "Genial",
    "Professional": "Profesional",
    "Funny": "Divertido",
    "Aesthetic": "Estético",
    "Dark": "Oscuro",
    "Cute": "Lindo",
    "Creator": "Creador",
    "Influencer": "Influencer",
    "Business": "Negocios",
    "Minimal": "Mínimo",
    "Luxury": "Lujo",
    "Display Names": "Nombres para Mostrar",
    "Usernames": "Nombres de Usuario"
  },
  fr: {
    "Universal": "Universel",
    "Instagram": "Instagram",
    "TikTok": "TikTok",
    "YouTube": "YouTube",
    "Gaming": "Jeux Vidéo",
    "Roblox": "Roblox",
    "Discord": "Discord",
    "Cool": "Stylé",
    "Professional": "Professionnel",
    "Funny": "Drôle",
    "Aesthetic": "Esthétique",
    "Dark": "Sombre",
    "Cute": "Mignon",
    "Creator": "Créateur",
    "Influencer": "Influenceur",
    "Business": "Entreprise",
    "Minimal": "Minimaliste",
    "Luxury": "Luxe",
    "Display Names": "Noms d'Affichage",
    "Usernames": "Noms d'Utilisateur"
  },
  de: {
    "Universal": "Universell",
    "Instagram": "Instagram",
    "TikTok": "TikTok",
    "YouTube": "YouTube",
    "Gaming": "Gaming",
    "Roblox": "Roblox",
    "Discord": "Discord",
    "Cool": "Cool",
    "Professional": "Professionell",
    "Funny": "Lustig",
    "Aesthetic": "Ästhetisch",
    "Dark": "Dunkel",
    "Cute": "Süß",
    "Creator": "Schöpfer",
    "Influencer": "Influencer",
    "Business": "Geschäftlich",
    "Minimal": "Minimal",
    "Luxury": "Luxus",
    "Display Names": "Anzeigenamen",
    "Usernames": "Benutzernamen"
  },
  ar: {
    "Universal": "عام",
    "Instagram": "إنستغرام",
    "TikTok": "تيك توك",
    "YouTube": "يوتيوب",
    "Gaming": "ألعاب",
    "Roblox": "روبلوكس",
    "Discord": "ديسكورد",
    "Cool": "رائع",
    "Professional": "احترافي",
    "Funny": "طريف",
    "Aesthetic": "جمالي (أسلوب)",
    "Dark": "غامض/مظلم",
    "Cute": "لطيف",
    "Creator": "صانع محتوى",
    "Influencer": "مؤثر",
    "Business": "أعمال",
    "Minimal": "بسيط للغاية",
    "Luxury": "فاخر",
    "Display Names": "الأسماء المستعارة",
    "Usernames": "أسماء المستخدمين"
  }
};

// Translates dynamic keyword/content to local languages
export function getLocalizedSEOContent(
  keyword: string,
  platform: string,
  style: string,
  lang: string
) {
  const plat = conceptTranslations[lang]?.[platform] || platform;
  const sty = conceptTranslations[lang]?.[style] || style;

  switch (lang) {
    case "es":
      return {
        metaTitle: `Generador de Nombres de Usuario de ${plat} | Obtenga Ideas de Nombres de Estilo ${sty}`,
        metaDescription: `Cree nombres de usuario únicos de ${plat} personalizados con un estilo ${sty}. Comprobación gratuita de disponibilidad instantánea. ¡Pruebe NameFuse hoy!`,
        h1: `Generador de Nombres de Usuario para ${plat}`,
        subtitle: `Encuentre más de 50 ideas únicas e instantáneas de nombres de usuario de ${plat} con un sofisticado estilo de diseño ${sty}.`,
        introduction: `En la era digital, su identidad en ${plat} es vital. El uso de nombres con un estilo ${sty} le permite destacar, atraer seguidores o clientes y presentarse con total profesionalidad. Nuestro motor procedimental genera instantáneamente sugerencias optimizadas para usted.`,
        features: [
          "Ideación procedimental ultrarrápida",
          "Formateado y depurado para las restricciones específicas de la plataforma",
          "Guardado fácil con un clic en su lista de favoritos",
          "Búsqueda con un clic de nombres disponibles"
        ]
      };
    case "fr":
      return {
        metaTitle: `Générateur de Noms d'Utilisateur ${plat} | Idées de Noms Style ${sty}`,
        metaDescription: `Générez des pseudonymes uniques pour ${plat} personnalisés avec un style ${sty}. Vérification gratuite de disponibilité instantanée. Essayez NameFuse !`,
        h1: `Générateur de Noms d'Utilisateur pour ${plat}`,
        subtitle: `Trouvez plus de 50 idées uniques de pseudonymes pour ${plat} adaptées avec goût dans un style ${sty}.`,
        introduction: `À l'ère numérique, votre image sur ${plat} est primordiale. L'utilisation d'un nom de style ${sty} vous permet de vous démarquer, d'engager vos abonnés ou clients et d'afficher une identité soignée. Notre algorithme crée instantanément des propositions calibrées.`,
        features: [
          "Création procédurale en temps réel",
          "Formatage strict adapté aux règles de la plateforme",
          "Enregistrement instantané dans votre liste de favoris",
          "Vérification de la disponibilité du pseudonyme en un clic"
        ]
      };
    case "de":
      return {
        metaTitle: `${plat} Benutzernamen-Generator | Coole Namensideen im ${sty}-Stil`,
        metaDescription: `Erstellen Sie einzigartige Benutzernamen für ${plat} im eleganten ${sty}-Stil. Kostenlose, sofortige Überprüfung der Verfügbarkeit. NameFuse testen!`,
        h1: `${plat} Benutzernamen-Generator`,
        subtitle: `Finden Sie sofort über 50 einzigartige ${plat}-Namen, die perfekt auf den ${sty}-Stil abgestimmt sind.`,
        introduction: `Im digitalen Zeitalter ist Ihre Marke auf ${plat} entscheidend. Ein Name im ${sty}-Stil verhilft Ihnen zu maximaler Aufmerksamkeit, zieht Follower oder Kunden an und vermittelt Ihre Vision. Unser Generator liefert maßgeschneiderte Ergebnisse.`,
        features: [
          "Zufallsgenerator mit prozeduralem Algorithmus",
          "Validiert nach den exakten Anforderungen der Plattform",
          "Ein-Klick-Favoritenspeicherung ohne Registrierung",
          "Direkte Verfügbarkeitsprüfung mit einem Klick"
        ]
      };
    case "ar":
      return {
        metaTitle: `مولد أسماء مستخدمين لـ ${plat} | أفكار أسماء بنمط ${sty}`,
        metaDescription: `أنشئ أسماء مستخدمين فريدة لـ ${plat} مخصصة بأسلوب ${sty}. فحص فوري ومجاني لتوفر الأسماء. جرب NameFuse الآن!`,
        h1: `مولد أسماء المستخدمين لـ ${plat}`,
        subtitle: `اعثر على أكثر من 50 فكرة اسم مستخدم فريدة وجذابة لـ ${plat} مصممة خصيصاً بنمط ${sty}.`,
        introduction: `في العصر الرقمي الحديث، يعد حضورك على ${plat} هو بوابتك الأولى للجمهور. يساعدك اختيار اسم بنمط ${sty} على التميز وجذب المتابعين أو العملاء وبناء هوية رقمية رائعة. يقوم محركنا التوليدي بتوفير خيارات ممتازة لك على الفور.`,
        features: [
          "توليد إجرائي فوري بلمسة واحدة",
          "تنسيق مخصص يتوافق تماماً مع شروط المنصة الحالية",
          "حفظ فوري في قائمتك المفضلة دون قيود",
          "تحقق سريع من توفر الاسم على المنصة"
        ]
      };
    default:
      return null;
  }
}
