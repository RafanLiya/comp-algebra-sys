export async function sendExpressions(
  operation: 'simplify' | 'expand' | 'factor' | 'differentiate' | 'integrate',
  expressions: string[],
  variable?: string
) {
  const url = `http://localhost:8000/${operation}`;
  const payload =
    operation === 'differentiate' || operation === 'integrate'
      ? { expressions, variable }
      : { expressions };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Error processing expressions');
  }

  return response.json();
}
