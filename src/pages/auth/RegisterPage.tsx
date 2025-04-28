
import { useState, FormEvent } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    setIsRegistering(true);
    setError('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();

      if (response.status === 201) {
        window.location.href = '/login'; // Redireciona para a página de login
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Erro ao criar conta');
    }

    setIsRegistering(false);
  };

  return (
    <div>
      <h2>Criar Conta</h2>
      <form onSubmit={handleRegister}>
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
        <input
          type="password"
          placeholder="Confirmar Senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit" disabled={isRegistering}>
          {isRegistering ? 'Criando...' : 'Criar Conta'}
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
}
