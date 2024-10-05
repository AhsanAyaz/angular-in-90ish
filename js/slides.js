import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';
import 'reveal.js/plugin/highlight/monokai.css';
import * as RevealHighlight from 'reveal.js/plugin/highlight/highlight.js';
import * as RevealMarkdown from 'reveal.js/plugin/markdown/markdown.js';
import * as RevealNotes from 'reveal.js/plugin/notes/notes.js';
import * as RevealMath from 'reveal.js/plugin/math/math.js';
import '../css/slides.scss';

Reveal.initialize({
  controls: true,
  progress: true,
  history: true,
  center: true,

  plugins: [RevealMarkdown, RevealHighlight, RevealNotes, RevealMath.KaTeX],
});
