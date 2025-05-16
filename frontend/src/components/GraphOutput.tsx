'use client';

import { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';

export default function GraphOutput({ expressions }: { expressions: string[] }) {
  const graphRef = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!graphRef.current) return;
    graphRef.current.innerHTML = '';

    const validExpressions = expressions
      .map(line => line.trim())
      .filter(line => line.length > 0);

    if (validExpressions.length === 0) return;

    try {
      functionPlot({
        target: graphRef.current,
        width: 800,
        height: 500,
        grid: true,
        data: validExpressions.map(expr => ({
          fn: expr,
          sampler: 'builtIn',
          graphType: 'polyline'
        }))
      });
      setError('');
    } catch (e) {
      setError('One or more expressions are invalid. Please check your syntax.');
    }
  }, [expressions]);

  return (
    <div className="w-full flex flex-col items-center mt-6">
      {error && (
        <div className="w-full p-4 text-red-700 bg-red-100 border border-red-300 rounded-md mb-4">
          {error}
        </div>
      )}
      <div
        ref={graphRef}
        className="border rounded-md bg-white shadow-md"
        style={{ width: '100%', maxWidth: '800px', height: '500px' }}
      />
    </div>
  );
}
