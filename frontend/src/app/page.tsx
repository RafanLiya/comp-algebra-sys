'use client'
import { useState } from 'react';
import { simplifyExpressions } from '@/lib/api';
import ExpressionInput from '@/components/ExpressionInput'; // Adjust this path if needed

export default function SimplifierPage() {
  const [expressions, setExpressions] = useState<string[]>(['']);
  const [results, setResults] = useState<{ original: string; simplified: string }[]>([]);
  const [error, setError] = useState('');

  const handleSimplify = async () => {
    try {
      const data = await simplifyExpressions(expressions);
      setResults(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
      setResults([]);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Symbolic Simplifier</h1>

      {/* 👇 This is where your existing component goes */}
      <ExpressionInput expressions={expressions} setExpressions={setExpressions} />

      <button
        onClick={handleSimplify}
        className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Simplify
      </button>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <ul className="space-y-2">
            {results.map((res, idx) => (
              <li key={idx} className="border p-2 rounded bg-gray-50">
                <strong>Input:</strong> {res.original} <br />
                <strong>Simplified:</strong> {res.simplified}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
