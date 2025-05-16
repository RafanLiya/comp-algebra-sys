'use client';

import { useEffect, useRef, useState } from 'react';
import functionPlot from 'function-plot';

export default function AlgebraGrapher() {
  const [expression, setExpression] = useState('x^2');
  const graphRef = useRef(null);

  useEffect(() => {
    try {
      functionPlot({
        target: graphRef.current!,
        width: 600,
        height: 400,
        grid: true,
        data: [{
          fn: expression,
          sampler: 'builtIn', // fastest
          graphType: 'polyline'
        }]
      });
    } catch (e) {
      console.error('Invalid expression', e);
    }
  }, [expression]);

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <input
        type="text"
        value={expression}
        onChange={(e) => setExpression(e.target.value)}
        placeholder="Enter an algebraic expression (e.g. x^2 + 3x + 2)"
        className="w-full max-w-md p-2 border rounded-md text-lg"
      />
      <div ref={graphRef} className="mt-4 border rounded-md" />
    </div>
  );
}
