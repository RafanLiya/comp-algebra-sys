from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
from sympy import sympify, simplify
from sympy.core.sympify import SympifyError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 👇 Add this block
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Or ["*"] for dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ExpressionRequest(BaseModel):
    expressions: List[str]


class ExpressionResult(BaseModel):
    original: str
    simplified: str


@app.post("/simplify", response_model=List[ExpressionResult])
async def simplify_expressions(request: ExpressionRequest):
    results = []
    for expr in request.expressions:
        try:
            sym_expr = sympify(expr)
            simplified = simplify(sym_expr)
            results.append({
                "original": expr,
                "simplified": str(simplified)
            })
        except SympifyError as e:
            raise HTTPException(status_code=400, detail=f"Invalid expression: {e}")
    return results
