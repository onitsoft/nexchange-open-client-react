import trans from 'Src/i18n';
import { useState, useCallback, useEffect } from 'react';

const DEFAULT_LANG = 'en';

export const useLang = () => {
  const [lang, setLang] = useState(trans.language || DEFAULT_LANG);

  const onLangChanged = useCallback(lang => setLang(lang || DEFAULT_LANG), [setLang]);

  useEffect(() => {
    trans.on('languageChanged', onLangChanged);

    return () => trans.off('languageChanged', onLangChanged);
  }, [onLangChanged]);

  return lang;
};
