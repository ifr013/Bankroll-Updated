
import { useState, FormEvent } from 'react';
import { useAuth } from '../../context/AuthContext';

type LoginType = 'admin' | 'player1' | 'player2' | 'player3';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login } = useAuth();

  // Função de login
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();

      if (response.status === 200) {
        // Salvar o token no localStorage
        localStorage.setItem('authToken', data.token);
        login(data.token);  // Chamar função de login do contexto
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao fazer login');
    }

    setIsLoggingIn(false);
  };

  // Função de criação de conta (link)
  const handleRegister = () => {
    // Redireciona para a página de registro (precisa de uma página de registro)
    window.location.href = '/register';
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? 'Entrando...' : 'Entrar'}
        </button>
      </form>
      {error && <p>{error}</p>}
      <button onClick={handleRegister}>Criar Conta</button>
    </div>
  );
}
