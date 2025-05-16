'use client'

import { useState } from 'react';
import "./globals.css";
import ExpressionInput from '@/components/ExpressionInput';
import GraphOutput from '@/components/GraphOutput';


export default function Home() {
  const [expressions, setExpressions] = useState<string[]>(['x^2', 'sin(x)']);

  return (
    <div className="flex flex-col items-center gap-6 p-4 w-full max-w-3xl mx-auto">
      <ExpressionInput expressions={expressions} setExpressions={setExpressions} />
      <GraphOutput expressions={expressions} />
    </div>
  );
}
