export async function simplifyExpressions(expressions: string[]) {
  const response = await fetch('http://localhost:8000/simplify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ expressions }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail || 'Simplification failed');
  }

  return response.json(); // [{ original: "...", simplified: "..." }]
}
