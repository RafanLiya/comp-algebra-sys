'use client';

import { useState } from 'react';
import ExpressionInput from '@/components/ExpressionInput';
import { sendExpressions } from '@/lib/api';

const OPERATIONS = ['simplify', 'expand', 'factor', 'differentiate', 'integrate'] as const;

export default function Main() {
  const [expressions, setExpressions] = useState<string[]>(['']);
  const [operation, setOperation] = useState<typeof OPERATIONS[number]>('simplify');
  const [results, setResults] = useState<{ original: string; result: string }[]>([]);
  const [error, setError] = useState('');
  const [variable, setVariable] = useState('x');
  const [loading, setLoading] = useState(false);

  const validExpressions = expressions.map(e => e.trim()).filter(e => e.length > 0);

  const handleRun = async () => {
    if (validExpressions.length === 0) {
      setError('Please enter at least one valid expression.');
      setResults([]);
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await sendExpressions(operation, validExpressions, variable);
      setResults(data);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred');
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Symbolic Math Tool</h1>

      <ExpressionInput expressions={expressions} setExpressions={setExpressions} />

      <div className="mt-4 flex flex-wrap gap-4 items-center">
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value as typeof OPERATIONS[number])}
          className="p-2 border rounded"
        >
          {OPERATIONS.map(op => (
            <option key={op} value={op}>{op}</option>
          ))}
        </select>

        {(operation === 'differentiate' || operation === 'integrate') && (
          <input
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            placeholder="Variable (e.g. x)"
            className="p-2 border rounded w-32"
          />
        )}

        <button
          onClick={handleRun}
          disabled={loading || validExpressions.length === 0}
          className={`px-4 py-2 text-white rounded ${
            loading ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {loading ? 'Running...' : 'Run'}
        </button>
      </div>

      {error && <div className="mt-4 text-red-600">{error}</div>}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Results</h2>
          <ul className="space-y-2">
            {results.map((res, idx) => (
              <li key={idx} className="border p-2 rounded bg-gray-50">
                <strong>Input:</strong> {res.original} <br />
                <strong>Result:</strong> {res.result}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
