'use client';

import { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';

export default function AlgebraGrapher() {
  const [expression, setExpression] = useState('x^2');
  const [error, setError] = useState('');
  const graphRef = useRef<HTMLDivElement>(null);;
  

  useEffect(() => {
    if (!graphRef.current) return;

    // Clear previous graph
    graphRef.current.innerHTML = '';

    try {
      functionPlot({
        target: graphRef.current!,
        width: 600,
        height: 400,
        grid: true,
        data: [{
          fn: expression,
          sampler: 'builtIn',
          graphType: 'polyline'
        }]
      });

      setError(''); // Clear error if successful
    } catch (e: any) {
      // Show a friendly error message
      setError('Invalid expression. Please check your syntax.');
    }
  }, [expression]);

  return (
    <div className="flex flex-col items-center gap-4 p-4 w-full max-w-3xl mx-auto">
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter an algebraic expression (e.g. x^2 + 3x + 2)"
        className="w-full p-2 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {error && (
        <div className="w-full p-4 text-red-700 bg-red-100 border border-red-300 rounded-md">
          {error}
        </div>
      )}

      <div ref={graphRef} className="mt-4 border rounded-md bg-white shadow-md" />
    </div>
  );
}
