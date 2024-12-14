import { header } from './js/header';
import { hero } from './js/hero';
import { upcoming } from './js/upcoming';
import theme from './js/theme';
import './js/scrollUp'
if (window.location.pathname.includes('category.html')) {
  header();
  hero();
  theme();
}
else {
header();
hero();
upcoming();
theme();
}