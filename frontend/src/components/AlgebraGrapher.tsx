'use client';

import { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';

export default function AlgebraGrapher() {
  const [input, setInput] = useState('x^2\nsin(x)');
  const [error, setError] = useState('');
  const graphRef = useRef<HTMLDivElement>(null);
  const [expressionList, setExpressionList] = useState<string[]>([]);

  const handleGraph = () => {
    const lines = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (!graphRef.current) return;
    graphRef.current.innerHTML = '';

    try {
      functionPlot({
        target: graphRef.current,
        width: 600,
        height: 400,
        grid: true,
        data: lines.map(expr => ({
          fn: expr,
          sampler: 'builtIn',
          graphType: 'polyline'
        }))
      });

      setError('');
      setExpressionList(lines);
    } catch (e) {
      setError('One or more expressions are invalid. Please check your syntax.');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-3xl mx-auto">
      <textarea
        rows={5}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter one algebraic expression per line (e.g.\nx^2\nsin(x)\nx^3 - x)"
        className="w-full p-2 border border-gray-300 rounded-md text-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={handleGraph}
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Graph
      </button>

      {error && (
        <div className="w-full p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      <div className="w-full flex justify-center">
        <div
            ref={graphRef}
            className="mt-4 border rounded-md bg-white shadow-md"
            style={{ width: '100%', maxWidth: '600px', height: '400px' }}
        />
      </div>

    </div>
  );
}
