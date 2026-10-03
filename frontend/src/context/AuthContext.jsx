import React, { createContext, useContext, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials, setRole, logout as logoutAction, updateUser } from '../redux/slices/authSlice';
import { authService } from '../services/authService';
import { ROLES } from '../constants/roles';

const AuthContext = createContext(null);
const TRANSLATIONS = {
  English: {},
  Hindi: { Dashboard: 'डैशबोर्ड', 'AI Advisory': 'एआई सलाह', 'Disease Scanner': 'रोग स्कैनर', 'Soil Health': 'मृदा स्वास्थ्य', Weather: 'मौसम', Marketplace: 'बाज़ार', 'Expert Call': 'विशेषज्ञ कॉल', 'Gov Schemes': 'सरकारी योजनाएँ', 'Farm Diary': 'फार्म डायरी', 'My Farm': 'मेरा खेत', 'Live Weather Alert': 'लाइव मौसम चेतावनी' },
  Punjabi: { Dashboard: 'ਡੈਸ਼ਬੋਰਡ', 'AI Advisory': 'ਏਆਈ ਸਲਾਹ', 'Disease Scanner': 'ਰੋਗ ਸਕੈਨਰ', 'Soil Health': 'ਮਿੱਟੀ ਦੀ ਸਿਹਤ', Weather: 'ਮੌਸਮ', Marketplace: 'ਬਾਜ਼ਾਰ', 'Expert Call': 'ਮਾਹਿਰ ਕਾਲ', 'Gov Schemes': 'ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ', 'Farm Diary': 'ਫਾਰਮ ਡਾਇਰੀ', 'My Farm': 'ਮੇਰਾ ਖੇਤ', 'Live Weather Alert': 'ਲਾਈਵ ਮੌਸਮ ਚੇਤਾਵਨੀ' }
};

export { ROLES };

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const [language, setLanguageState] = React.useState(localStorage.getItem('agrismart_lang') || 'English');

  const isAuthenticated = status === 'authenticated' && !!user;
  const t = useCallback((text) => TRANSLATIONS[language]?.[text] || text, [language]);

  React.useEffect(() => {
    document.documentElement.lang = language === 'Hindi' ? 'hi' : language === 'Punjabi' ? 'pa' : 'en';
  }, [language]);

  const login = useCallback(
    async (credentials) => {
      const data = await authService.login(credentials);
      if (!data.success) {
        throw new Error(data.message || 'Login failed');
      }
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );
      return data.user;
    },
    [dispatch]
  );

  const register = useCallback(
    async (payload) => {
      const data = await authService.register(payload);
      if (!data.success) {
        throw new Error(data.message || 'Registration failed');
      }
      dispatch(
        setCredentials({
          user: data.user,
          token: data.token,
          refreshToken: data.refreshToken,
        })
      );
      return data.user;
    },
    [dispatch]
  );

  const switchRole = useCallback(
    (newRole) => {
      dispatch(setRole(newRole));
    },
    [dispatch]
  );

  const switchLanguage = useCallback((lang) => {
    setLanguageState(lang);
    localStorage.setItem('agrismart_lang', lang);
  }, []);

  const logout = useCallback(() => {
    dispatch(logoutAction());
  }, [dispatch]);

  const refreshProfile = useCallback(async () => {
    const data = await authService.me();
    if (data.success && data.user) {
      dispatch(updateUser(data.user));
    }
  }, [dispatch]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      login,
      register,
      switchRole,
      language,
      switchLanguage,
      t,
      logout,
      refreshProfile,
    }),
    [user, isAuthenticated, login, register, switchRole, language, switchLanguage, t, logout, refreshProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
