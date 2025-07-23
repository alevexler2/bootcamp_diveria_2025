const card = document.querySelector('.card');
const img = card.querySelector('.img2'); // selector con clase

card.addEventListener('mousemove', (e) => {
  const rect = card.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;

  img.style.transformOrigin = `${x}% ${y}%`;
  img.style.transform = 'scale(1.2)';
});

card.addEventListener('mouseleave', () => {
  img.style.transformOrigin = 'center center';
  img.style.transform = 'scale(1)';
});
