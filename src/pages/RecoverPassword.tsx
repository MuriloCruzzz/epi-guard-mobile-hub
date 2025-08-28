import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const RecoverPassword: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState<'email' | 'code'>('email');
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [confirmEmail, setConfirmEmail] = useState('');
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmitEmail = (e: React.FormEvent) => {
        e.preventDefault();
        if (email !== confirmEmail) {
            toast.error('Os e-mails não coincidem', {
                style: {
                    background: '#FF3B30',
                    color: 'white',
                    border: 'none',
                },
            });
            return;
        }
        setIsLoading(true);
        // Simulando envio do e-mail
        setTimeout(() => {
            setStep('code');
            setIsLoading(false);
            toast.success('Código enviado com sucesso!', {
                style: {
                    background: '#34C759',
                    color: 'white',
                    border: 'none',
                },
            });
        }, 1500);
    };

    const handleSubmitCode = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulando validação do código
        setTimeout(() => {
            toast.success('Código validado com sucesso! Uma nova senha será enviada para seu e-mail.', {
                style: {
                    background: '#34C759',
                    color: 'white',
                    border: 'none',
                },
                duration: 4000,
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        }, 1500);
    };

    return (
        <div className="flex flex-col min-h-screen bg-primary">
            <div className="flex-1 flex flex-col items-center px-6 py-6">
                <div className="w-full flex flex-col items-center mt-4">
                    <img
                        src="/lovable-uploads/logo_epi.png"
                        alt="E-EPI Logo"
                        className="w-56 mb-12"
                    />
                    <h1 className="text-xl font-bold text-white">Recuperação de Senha</h1>
                    <p className="text-white text-center mt-1 text-sm">
                        {step === 'email'
                            ? 'Insira sua chapa e e-mail para recuperar sua senha'
                            : 'Digite o código enviado para seu e-mail'}
                    </p>
                </div>

                <div className="w-full max-w-md mt-4">
                    {step === 'email' ? (
                        <form onSubmit={handleSubmitEmail} className="space-y-3">
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
                                <label htmlFor="email" className="block text-white text-sm mb-1">E-mail</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-white text-base"
                                    placeholder="seu.email@exemplo.com"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="confirmEmail" className="block text-white text-sm mb-1">Confirme seu E-mail</label>
                                <input
                                    id="confirmEmail"
                                    type="email"
                                    value={confirmEmail}
                                    onChange={(e) => setConfirmEmail(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-white text-base"
                                    placeholder="seu.email@exemplo.com"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-primary py-3 rounded-md font-bold text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Enviando...' : 'Enviar Código'}
                            </button>
                        </form>
                    ) : (
                        <form onSubmit={handleSubmitCode} className="space-y-3">
                            <div>
                                <label htmlFor="code" className="block text-white text-sm mb-1">Código de Verificação</label>
                                <input
                                    id="code"
                                    type="text"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    className="w-full px-4 py-3 rounded-md bg-white text-base"
                                    placeholder="Digite o código recebido"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-primary py-3 rounded-md font-bold text-base"
                                disabled={isLoading}
                            >
                                {isLoading ? 'Validando...' : 'Validar Código'}
                            </button>
                        </form>
                    )}

                    <div className="mt-4 text-center">
                        <button
                            onClick={() => navigate('/login')}
                            className="text-white text-sm hover:underline"
                        >
                            Voltar para o Login
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full text-center py-4">
                <p className="text-white text-sm">Desenvolvido por FOX INNOVATION © 2025</p>
            </div>
        </div>
    );
};

export default RecoverPassword; 