from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from sympy import sympify, simplify, expand, factor, diff, integrate, Symbol
from sympy.core.sympify import SympifyError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow your frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request Models
class ExpressionRequest(BaseModel):
    expressions: List[str]

class DifferentiationRequest(BaseModel):
    expressions: List[str]
    variable: Optional[str] = "x"

# Response Model
class ExpressionResult(BaseModel):
    original: str
    result: str

# Common processing function
def process_expressions(expressions, operation, variable=None):
    results = []
    for expr in expressions:
        try:
            sym_expr = sympify(expr)
            if variable:
                sym_var = Symbol(variable)
                transformed = operation(sym_expr, sym_var)
            else:
                transformed = operation(sym_expr)
            results.append({
                "original": expr,
                "result": str(transformed)
            })
        except SympifyError as e:
            raise HTTPException(status_code=400, detail=f"Invalid expression: {e}")
    return results

# Endpoints
@app.post("/simplify", response_model=List[ExpressionResult])
async def simplify_expressions(request: ExpressionRequest):
    return process_expressions(request.expressions, simplify)

@app.post("/expand", response_model=List[ExpressionResult])
async def expand_expressions(request: ExpressionRequest):
    return process_expressions(request.expressions, expand)

@app.post("/factor", response_model=List[ExpressionResult])
async def factor_expressions(request: ExpressionRequest):
    return process_expressions(request.expressions, factor)

@app.post("/differentiate", response_model=List[ExpressionResult])
async def differentiate_expressions(request: DifferentiationRequest):
    return process_expressions(request.expressions, diff, variable=request.variable)

@app.post("/integrate", response_model=List[ExpressionResult])
async def integrate_expressions(request: DifferentiationRequest):
    return process_expressions(request.expressions, integrate, variable=request.variable)
