'use client';

import { useState } from 'react';

export default function ExpressionInput({
  expressions,
  setExpressions
}: {
  expressions: string[];
  setExpressions: (expressions: string[]) => void;
}) {
  const handleChange = (index: number, value: string) => {
    const newExpressions = [...expressions];
    newExpressions[index] = value;
    setExpressions(newExpressions);
  };

  const addExpression = () => {
    setExpressions([...expressions, '']);
  };

  const removeExpression = (index: number) => {
    const newExpressions = expressions.filter((_, i) => i !== index);
    setExpressions(newExpressions);
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <h2 className="text-xl font-semibold">Expressions</h2>
      {expressions.map((expr, index) => (
        <div key={index} className="flex gap-2 items-center">
          <input
            value={expr}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder={`Expression ${index + 1}`}
            className="flex-1 p-2 border border-gray-300 rounded-md text-black"
          />
          <button
            onClick={() => removeExpression(index)}
            className="px-2 py-1 text-red-600 hover:text-red-800"
            title="Remove"
          >
            ✕
          </button>
        </div>
      ))}
      <button
        onClick={addExpression}
        className="mt-2 self-start px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Add Expression
      </button>
    </div>
  );
}
