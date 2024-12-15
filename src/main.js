import { header } from './js/header';
import { hero } from './js/hero';
import { upcoming } from './js/upcoming';
import theme from './js/theme';
import './js/scrollUp'
import './js/addRemove';
if (window.location.pathname.includes('category.html')) {
  header();
  hero();
  theme();
}
if (window.location.pathname.includes('mylibrary.html')) {
header();
theme();
}
if (window.location.pathname.includes('index.html')) {
header();
hero();
upcoming();
theme();
}
