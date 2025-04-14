
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Fingerprint } from 'lucide-react';

const Login: React.FC = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginWithBiometric, error } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(id, password);
      navigate('/home');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBiometricLogin = async () => {
    setIsLoading(true);
    
    try {
      await loginWithBiometric();
      navigate('/home');
    } catch (error) {
      console.error('Biometric login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-primary">
      <div className="flex-1 flex flex-col items-center justify-between px-6 py-6">
        <div className="w-full flex flex-col items-center mt-6">
          <img 
            src="/lovable-uploads/507a83d4-90b4-44a6-bd2f-50ae7bb88fb9.png" 
            alt="E-EPI Logo" 
            className="w-56 mb-4"
          />
          <h1 className="text-xl font-bold text-white">Entre no E-epi</h1>
          <p className="text-white text-center mt-2 text-sm">Insira sua "chapa" para acessar</p>
        </div>

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-white text-sm mb-1">ID Sistema Senior</label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-base"
                placeholder="0123456789"
                required
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="password" className="block text-white text-sm">SENHA</label>
                <a href="#" className="text-white text-xs hover:underline">Recuperar Senha</a>
              </div>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md bg-white text-base"
                placeholder="Insira sua senha"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-primary py-3 rounded-md font-bold text-base"
              disabled={isLoading}
            >
              {isLoading ? 'Entrando...' : 'Entrar'}
            </button>

            {error && (
              <p className="text-red-300 text-center text-sm">{error}</p>
            )}
          </form>

          <div className="mt-4 text-center">
            <p className="text-white text-sm">Não tem acesso? <a href="#" className="underline">Solicite aqui</a></p>
          </div>
        </div>

        <div className="w-full max-w-md mt-6 border-t border-white/30 pt-6">
          <button
            onClick={handleBiometricLogin}
            className="w-full bg-white py-3 px-4 rounded-md flex items-center justify-center gap-3"
            disabled={isLoading}
          >
            <Fingerprint size={24} className="text-primary" />
            <div className="text-left">
              <span className="text-primary font-bold text-sm block">Login com Touch ID</span>
              <p className="text-xs text-gray-500">Toque com o dedo no botão iniciar</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
