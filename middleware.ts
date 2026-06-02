import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Pega o status do carrinho. Se a variável não existir, assumimos "fechado" por padrão.
  const statusCarrinho = process.env.STATUS_CARRINHO || 'fechado';

  if (statusCarrinho === 'fechado') {
    const { pathname } = request.nextUrl;
    
    // Bloqueia a home (landing page) e a página de diagnóstico
    if (pathname === '/' || pathname === '/diagnostico') {
      return NextResponse.redirect(new URL('/master-class', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|master-class).*)',
  ],
};
