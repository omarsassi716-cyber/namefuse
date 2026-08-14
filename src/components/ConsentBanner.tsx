import { useState, useEffect } from "react";
import { Cookie, Check, X, SlidersHorizontal, Info } from "lucide-react";

interface ConsentBannerProps {
  language?: string;
}

const bannerTranslations: Record<string, {
  title: string;
  description: string;
  preferences: string;
  save: string;
  acceptAll: string;
  rejectAll: string;
  adCookies: string;
  adCookiesDesc: string;
  adUserData: string;
  adUserDataDesc: string;
  adPersonalization: string;
  adPersonalizationDesc: string;
  analytics: string;
  analyticsDesc: string;
  customize: string;
  hideCustomize: string;
  privacyPolicy: string;
}> = {
  en: {
    title: "We value your privacy",
    description: "We use cookies to personalize content and ads, analyze our traffic, and provide a secure, pro-grade user experience in compliance with Google publisher policy.",
    preferences: "Consent Preferences",
    save: "Save Preferences",
    acceptAll: "Accept All",
    rejectAll: "Reject All",
    adCookies: "Ad Cookies (ad_storage)",
    adCookiesDesc: "Allows storing cookie data for advertising purposes.",
    adUserData: "User Data Sharing (ad_user_data)",
    adUserDataDesc: "Sets consent for sending user data to Google for advertising.",
    adPersonalization: "Personalized Ads (ad_personalization)",
    adPersonalizationDesc: "Enables relevant, tailored advertising experiences.",
    analytics: "Analytics Data (analytics_storage)",
    analyticsDesc: "Enables page performance and engagement metrics.",
    customize: "Customize Settings",
    hideCustomize: "Hide Preferences",
    privacyPolicy: "Privacy Policy"
  },
  es: {
    title: "Valoramos su privacidad",
    description: "Utilizamos cookies para personalizar el contenido y los anuncios, analizar nuestro tráfico y ofrecer una experiencia de usuario segura y profesional de conformidad con las políticas de Google.",
    preferences: "Preferencias de Consentimiento",
    save: "Guardar Preferencias",
    acceptAll: "Aceptar Todo",
    rejectAll: "Rechazar Todo",
    adCookies: "Cookies Publicitarias (ad_storage)",
    adCookiesDesc: "Permite almacenar datos de cookies para publicidad.",
    adUserData: "Datos del Usuario de Anuncios (ad_user_data)",
    adUserDataDesc: "Permite enviar datos de usuario para publicidad de Google.",
    adPersonalization: "Anuncios Personalizados (ad_personalization)",
    adPersonalizationDesc: "Permite remarketing personalizado de anuncios de Google.",
    analytics: "Cookies Analíticas (analytics_storage)",
    analyticsDesc: "Permite almacenar datos de cookies analíticas.",
    customize: "Personalizar Ajustes",
    hideCustomize: "Ocultar Preferencias",
    privacyPolicy: "Política de Privacidad"
  },
  fr: {
    title: "Nous respectons votre vie privée",
    description: "Nous utilisons des cookies pour personnaliser le contenu et les publicités, analyser notre trafic et vous offrir une expérience utilisateur sécurisée et professionnelle, conformément aux règles Google.",
    preferences: "Préférences de Consentement",
    save: "Enregistrer les Préférences",
    acceptAll: "Tout Accepter",
    rejectAll: "Tout Refuser",
    adCookies: "Cookies Publicitaires (ad_storage)",
    adCookiesDesc: "Permet de stocker des cookies publicitaires.",
    adUserData: "Données Utilisateur de Pub (ad_user_data)",
    adUserDataDesc: "Permet d'envoyer les données utilisateur à la régie Google.",
    adPersonalization: "Publicités Personnalisées (ad_personalization)",
    adPersonalizationDesc: "Permet le reciblage publicitaire personnalisé de Google.",
    analytics: "Données Analytiques (analytics_storage)",
    analyticsDesc: "Permet de stocker les données de cookies analytiques.",
    customize: "Personnaliser",
    hideCustomize: "Masquer les Préférences",
    privacyPolicy: "Politique de Confidentialité"
  },
  de: {
    title: "Wir schätzen Ihre Privatsphäre",
    description: "Wir verwenden Cookies, um Inhalte und Anzeigen zu personalisieren, unseren Traffic zu analysieren und eine sichere, professionelle Benutzererfahrung gemäß den Google-Richtlinien bereitzustellen.",
    preferences: "Einwilligungseinstellungen",
    save: "Einstellungen Speichern",
    acceptAll: "Alle Akzeptieren",
    rejectAll: "Alle Ablehnen",
    adCookies: "Werbe-Cookies (ad_storage)",
    adCookiesDesc: "Ermöglicht das Speichern von Cookie-Daten für Werbung.",
    adUserData: "Anzeigen-Nutzerdaten (ad_user_data)",
    adUserDataDesc: "Ermöglicht das Senden von Nutzerdaten für Google-Werbung.",
    adPersonalization: "Personalisierte Werbung (ad_personalization)",
    adPersonalizationDesc: "Ermöglicht personalisiertes Google Ad-Remarketing.",
    analytics: "Analyse-Cookies (analytics_storage)",
    analyticsDesc: "Ermöglicht das Speichern von Analyse-Cookie-Daten.",
    customize: "Einstellungen Anpassen",
    hideCustomize: "Einstellungen Verbergen",
    privacyPolicy: "Datenschutzrichtlinie"
  },
  ar: {
    title: "نحن نقدر خصوصيتك",
    description: "نحن نستخدم ملفات تعريف الارتباط لتخصيص المحتوى والإعلانات، وتحليل حركة المرور لدينا، وتقديم تجربة مستخدم آمنة وممتازة بما يتوافق مع سياسات ناشري Google.",
    preferences: "تفضيلات الموافقة",
    save: "حفظ التفضيلات",
    acceptAll: "قبول الكل",
    rejectAll: "رفض الكل",
    adCookies: "ملفات الإعلانات (ad_storage)",
    adCookiesDesc: "تتيح تخزين بيانات ملفات تعريف الارتباط لأغراض الإعلانات.",
    adUserData: "بيانات مستخدم الإعلانات (ad_user_data)",
    adUserDataDesc: "تتيح إرسال بيانات المستخدم لإعلانات Google.",
    adPersonalization: "الإعلانات المخصصة (ad_personalization)",
    adPersonalizationDesc: "تتيح إعادة التسويق المخصص لإعلانات Google.",
    analytics: "ملفات التحليل (analytics_storage)",
    analyticsDesc: "تتيح تخزين بيانات ملفات تعريف الارتباط التحليلية.",
    customize: "تخصيص الإعدادات",
    hideCustomize: "إخفاء التفضيلات",
    privacyPolicy: "سياسة الخصوصية"
  }
};

export default function ConsentBanner({ language = "en" }: ConsentBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  // Google Consent Mode v2 states
  const [adStorage, setAdStorage] = useState(true);
  const [adUserData, setAdUserData] = useState(true);
  const [adPersonalization, setAdPersonalization] = useState(true);
  const [analyticsStorage, setAnalyticsStorage] = useState(true);

  const activeLang = ["en", "es", "fr", "de", "ar"].includes(language) ? language : "en";
  const b = bannerTranslations[activeLang];
  const isRtl = activeLang === "ar";

  useEffect(() => {
    const consentChoice = localStorage.getItem("namefuse_consent_choice");
    if (!consentChoice) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(consentChoice);
        applyGoogleConsent(saved);
      } catch (e) {
        console.error("Failed to parse stored consent settings", e);
      }
    }
  }, []);

  const applyGoogleConsent = (settings: {
    adStorage: boolean;
    adUserData: boolean;
    adPersonalization: boolean;
    analyticsStorage: boolean;
  }) => {
    try {
      if (typeof window !== "undefined" && (window as any).gtag) {
        (window as any).gtag("consent", "update", {
          ad_storage: settings.adStorage ? "granted" : "denied",
          ad_user_data: settings.adUserData ? "granted" : "denied",
          ad_personalization: settings.adPersonalization ? "granted" : "denied",
          analytics_storage: settings.analyticsStorage ? "granted" : "denied",
        });
      }
    } catch (e) {
      console.error("Failed to update Google Consent Mode v2", e);
    }
  };

  const handleAcceptAll = () => {
    const settings = {
      adStorage: true,
      adUserData: true,
      adPersonalization: true,
      analyticsStorage: true,
    };
    localStorage.setItem("namefuse_consent_choice", JSON.stringify(settings));
    applyGoogleConsent(settings);
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const settings = {
      adStorage: false,
      adUserData: false,
      adPersonalization: false,
      analyticsStorage: false,
    };
    localStorage.setItem("namefuse_consent_choice", JSON.stringify(settings));
    applyGoogleConsent(settings);
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const settings = {
      adStorage,
      adUserData,
      adPersonalization,
      analyticsStorage,
    };
    localStorage.setItem("namefuse_consent_choice", JSON.stringify(settings));
    applyGoogleConsent(settings);
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      id="consent-management-banner"
      className={`fixed bottom-4 left-4 right-4 md:max-w-md bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-900 rounded-2xl shadow-2xl z-50 overflow-hidden flex flex-col p-5 md:p-6 animate-in slide-in-from-bottom-6 fade-in duration-300 select-none ${isRtl ? "md:left-4 md:right-auto" : "md:right-4 md:left-auto"}`}
      dir={isRtl ? "rtl" : "ltr"}
    >
      {/* Title / Icon Row */}
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 shrink-0">
          <Cookie className="w-5 h-5 animate-pulse" />
        </div>
        <div className={`space-y-1 ${isRtl ? "text-right" : "text-left"}`}>
          <h4 className="text-sm font-extrabold text-zinc-900 dark:text-zinc-100 tracking-tight">
            {b.title}
          </h4>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
            {b.description}
          </p>
        </div>
      </div>

      {/* Granular Preferences Toggles (Collapsible) */}
      {showPreferences && (
        <div className={`mt-4 pt-4 border-t border-zinc-100 dark:border-zinc-900 space-y-3.5 max-h-[220px] overflow-y-auto pr-1 ${isRtl ? "text-right" : "text-left"}`}>
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-zinc-700 dark:text-zinc-300">{b.preferences}</span>
            <span className="text-[9px] uppercase tracking-wider font-extrabold text-violet-500">Google Consent v2</span>
          </div>

          <div className="space-y-2.5">
            {/* Ad Storage Cookie */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900">
              <div className={`space-y-0.5 ${isRtl ? "text-right" : "text-left"}`}>
                <span className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{b.adCookies}</span>
                <span className="block text-[9px] text-zinc-400 dark:text-zinc-500">{b.adCookiesDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={adStorage}
                onChange={(e) => setAdStorage(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 cursor-pointer"
              />
            </div>

            {/* Ad Personalization */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900">
              <div className={`space-y-0.5 ${isRtl ? "text-right" : "text-left"}`}>
                <span className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{b.adPersonalization}</span>
                <span className="block text-[9px] text-zinc-400 dark:text-zinc-500">{b.adPersonalizationDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={adPersonalization}
                onChange={(e) => setAdPersonalization(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 cursor-pointer"
              />
            </div>

            {/* Ad User Data */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900">
              <div className={`space-y-0.5 ${isRtl ? "text-right" : "text-left"}`}>
                <span className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{b.adUserData}</span>
                <span className="block text-[9px] text-zinc-400 dark:text-zinc-500">{b.adUserDataDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={adUserData}
                onChange={(e) => setAdUserData(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 cursor-pointer"
              />
            </div>

            {/* Analytics Storage */}
            <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-150 dark:border-zinc-900">
              <div className={`space-y-0.5 ${isRtl ? "text-right" : "text-left"}`}>
                <span className="block text-[11px] font-bold text-zinc-800 dark:text-zinc-200">{b.analytics}</span>
                <span className="block text-[9px] text-zinc-400 dark:text-zinc-500">{b.analyticsDesc}</span>
              </div>
              <input
                type="checkbox"
                checked={analyticsStorage}
                onChange={(e) => setAnalyticsStorage(e.target.checked)}
                className="w-4 h-4 rounded text-violet-600 focus:ring-violet-500 dark:bg-zinc-950 border-zinc-300 dark:border-zinc-800 cursor-pointer"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={handleSavePreferences}
              className="w-full py-2 rounded-lg bg-zinc-150 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer"
            >
              {b.save}
            </button>
          </div>
        </div>
      )}

      {/* Buttons Actions Row */}
      <div className="mt-5 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={handleAcceptAll}
            className="flex-1 px-3 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md shadow-violet-600/10 transition-all cursor-pointer flex items-center justify-center gap-1.5 hover:scale-[1.01]"
          >
            <Check className="w-3.5 h-3.5" />
            <span>{b.acceptAll}</span>
          </button>
          <button
            onClick={handleRejectAll}
            className="flex-1 px-3 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
          >
            <X className="w-3.5 h-3.5" />
            <span>{b.rejectAll}</span>
          </button>
        </div>

        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setShowPreferences(!showPreferences)}
            className="text-[10px] font-bold text-zinc-400 hover:text-violet-500 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <SlidersHorizontal className="w-3 h-3" />
            <span>{showPreferences ? b.hideCustomize : b.customize}</span>
          </button>
          <a
            href="/privacy-policy"
            className="text-[10px] font-semibold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline transition-colors flex items-center gap-0.5"
          >
            <Info className="w-3 h-3" />
            <span>{b.privacyPolicy}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
