import trans from 'Src/i18n';
import { useState, useCallback, useEffect } from 'react';

export const useLang = () => {
  const [lang, setLang] = useState(trans.language);

  const onLangChanged = useCallback(lang => setLang(lang), [setLang]);

  useEffect(() => {
    trans.on('languageChanged', onLangChanged);

    return () => trans.off('languageChanged', onLangChanged);
  }, [onLangChanged]);

  return lang;
}