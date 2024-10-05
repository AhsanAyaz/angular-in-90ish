const main = async () => {
  const resp = await fetch('data/slides.json');
  const slides = await resp.json();
  const grid = document.getElementById('talksGrid');
  slides.forEach((slide) => {
    const { link, title } = slide;
    const sectionEl = document.createElement('section');
    sectionEl.className =
      'shadow-md border border-slate-300 rounded-md hover:bg-purple-700 duration-200 hover:text-white cursor-pointer';
    const anchorEl = document.createElement('a');
    anchorEl.className = 'p-4 w-full h-full block';
    anchorEl.href = `slides.html?md=${encodeURIComponent(
      link
    )}&title=${encodeURIComponent(title)}`;
    anchorEl.target = '_blank';
    anchorEl.textContent = title;
    sectionEl.appendChild(anchorEl);
    grid.appendChild(sectionEl);
  });
};

main();
