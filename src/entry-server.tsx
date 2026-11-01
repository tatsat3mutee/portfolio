// Build-time only: renders each page to HTML so search engines and link
// previews see the full content without running JavaScript.
import { renderToString } from 'react-dom/server';
import { StrictMode } from 'react';
import { HomeApp } from './apps/HomeApp';
import { KhwaabApp } from './apps/KhwaabApp';

export const renderHome = () => renderToString(<StrictMode><HomeApp /></StrictMode>);
export const renderKhwaab = (slug: string | null) => renderToString(<StrictMode><KhwaabApp slug={slug} /></StrictMode>);
