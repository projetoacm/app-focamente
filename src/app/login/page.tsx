'use client';

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Zap } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Verificar se usuário já está logado
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/');
      } else {
        setLoading(false);
      }
    });

    // Listener para mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        router.push('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF6B00]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FF6B00]/10 rounded-2xl mb-4">
            <Zap className="w-8 h-8 text-[#FF6B00]" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Bem-vindo ao <span className="text-[#FF6B00]">FocoMente</span>
          </h1>
          <p className="text-white/60">
            Seu espaço premium de produtividade e foco
          </p>
        </div>

        {/* Card de Login */}
        <div className="bg-[#1A1A1A] border border-white/10 rounded-2xl p-8 shadow-2xl">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#FF6B00',
                    brandAccent: '#FF8533',
                    brandButtonText: 'white',
                    defaultButtonBackground: '#1A1A1A',
                    defaultButtonBackgroundHover: '#2A2A2A',
                    defaultButtonBorder: '#FFFFFF20',
                    defaultButtonText: 'white',
                    dividerBackground: '#FFFFFF20',
                    inputBackground: '#0D0D0D',
                    inputBorder: '#FFFFFF20',
                    inputBorderHover: '#FF6B00',
                    inputBorderFocus: '#FF6B00',
                    inputText: 'white',
                    inputLabelText: '#FFFFFF80',
                    inputPlaceholder: '#FFFFFF40',
                    messageText: 'white',
                    messageTextDanger: '#FF4444',
                    anchorTextColor: '#FF6B00',
                    anchorTextHoverColor: '#FF8533',
                  },
                  space: {
                    spaceSmall: '8px',
                    spaceMedium: '16px',
                    spaceLarge: '24px',
                  },
                  fontSizes: {
                    baseBodySize: '14px',
                    baseInputSize: '14px',
                    baseLabelSize: '14px',
                    baseButtonSize: '14px',
                  },
                  borderWidths: {
                    buttonBorderWidth: '1px',
                    inputBorderWidth: '1px',
                  },
                  radii: {
                    borderRadiusButton: '8px',
                    buttonBorderRadius: '8px',
                    inputBorderRadius: '8px',
                  },
                },
              },
              className: {
                container: 'auth-container',
                button: 'auth-button',
                input: 'auth-input',
                label: 'auth-label',
              },
            }}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Entrar',
                  loading_button_label: 'Entrando...',
                  social_provider_text: 'Entrar com {{provider}}',
                  link_text: 'Já tem uma conta? Entre',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  password_input_placeholder: 'Sua senha',
                  button_label: 'Cadastrar',
                  loading_button_label: 'Cadastrando...',
                  social_provider_text: 'Cadastrar com {{provider}}',
                  link_text: 'Não tem uma conta? Cadastre-se',
                },
                forgotten_password: {
                  email_label: 'Email',
                  password_label: 'Senha',
                  email_input_placeholder: 'seu@email.com',
                  button_label: 'Enviar instruções',
                  loading_button_label: 'Enviando...',
                  link_text: 'Esqueceu sua senha?',
                },
                update_password: {
                  password_label: 'Nova senha',
                  password_input_placeholder: 'Sua nova senha',
                  button_label: 'Atualizar senha',
                  loading_button_label: 'Atualizando...',
                },
                verify_otp: {
                  email_input_label: 'Email',
                  email_input_placeholder: 'seu@email.com',
                  phone_input_label: 'Telefone',
                  phone_input_placeholder: 'Seu telefone',
                  token_input_label: 'Código',
                  token_input_placeholder: 'Seu código OTP',
                  button_label: 'Verificar',
                  loading_button_label: 'Verificando...',
                },
              },
            }}
            providers={[]}
            redirectTo={typeof window !== 'undefined' ? window.location.origin : ''}
            view="sign_in"
          />
        </div>

        {/* Footer */}
        <div className="text-center mt-6 text-white/40 text-sm">
          <p>Ao continuar, você concorda com nossos Termos e Política de Privacidade</p>
        </div>
      </div>
    </div>
  );
}
