# My Slides

Here goes some content in first

--

## Second Slide (vertical)

more content

---

## Horizontal slide 
### (horizontal separated)

Yeah, that can happen

--

This is some code

```js
const foo = 'bar';
```

Code step highlighting 

```ts [1-3]
const main = async () => {
  const resp = await fetch('data/slides.json');
  const slides = await resp.json();
  const grid = document.getElementById('talksGrid');
  slides.forEach((slide) => {
    // ...
  });
};

main();


```