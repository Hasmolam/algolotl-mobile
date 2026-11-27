import { createContext, use, useMemo, useState, type PropsWithChildren } from 'react';

// Oturum durumu: kullanıcı misafir mi, giriş yapmış mı?
//
// Şimdilik yalnızca bellekte tutulur ve uygulama kapanınca sıfırlanır.
// Gerçek kayıt/giriş ve token'ın expo-secure-store'da saklanması #9 ile gelecek;
// ekranlar yalnızca bu dosyadaki useSession() arayüzünü kullandığı için
// o değişiklik ekranlara dokunmadan yapılabilir.
type SessionStatus = 'guest' | 'signed-in';

type SessionContextValue = {
  status: SessionStatus;
  isSignedIn: boolean;
  signIn: () => void;
  signUp: () => void;
  signOut: () => void;
};

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: PropsWithChildren) {
  const [status, setStatus] = useState<SessionStatus>('guest');

  const value = useMemo<SessionContextValue>(
    () => ({
      status,
      isSignedIn: status === 'signed-in',
      signIn: () => setStatus('signed-in'),
      signUp: () => setStatus('signed-in'),
      signOut: () => setStatus('guest'),
    }),
    [status],
  );

  return <SessionContext value={value}>{children}</SessionContext>;
}

export function useSession() {
  const value = use(SessionContext);
  if (!value) {
    throw new Error('useSession, SessionProvider içinde kullanılmalı.');
  }
  return value;
}
