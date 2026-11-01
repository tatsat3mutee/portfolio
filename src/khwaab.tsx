import './fonts';
import { mount } from './mount';
import { KhwaabApp } from './apps/KhwaabApp';

// /khwaab/<slug>/ (or /khwaab/?ep=<slug>) opens that episode in the player
const slug = location.pathname.match(/^\/khwaab\/([^/]+)\/?$/)?.[1] ?? new URLSearchParams(location.search).get('ep');

mount(<KhwaabApp slug={slug} />);
