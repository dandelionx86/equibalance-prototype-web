const menuButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('.page-section');
const feedList = document.querySelector('#feed-list');
const addFeedButton = document.querySelector('#add-feed');

const starterFeeds = [
  { item: 'Hay', amount: 20, unit: 'lbs' },
  { item: 'Pasture', amount: 24, unit: 'hours' },
  { item: 'Grain', amount: 2, unit: 'lbs' },
  { item: 'Supplement', amount: 100, unit: 'g' }
];

function toggleMenu() {
  const isOpen = navLinks.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
}

function closeMenu() {
  navLinks.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}

function updateActiveLink() {
  let current = 'home';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 110;
    if (window.scrollY >= sectionTop) current = section.id;
  });
  navItems.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
}

function createFeedRow(feed = { item: '', amount: '', unit: 'lbs' }) {
  const row = document.createElement('div');
  row.className = 'feed-item';
  row.innerHTML = `
    <label>Feed Item<input type="text" value="${feed.item}" /></label>
    <label>Amount<input type="number" value="${feed.amount}" /></label>
    <label>Unit<select>
      <option ${feed.unit === 'lbs' ? 'selected' : ''}>lbs</option>
      <option ${feed.unit === 'kg' ? 'selected' : ''}>kg</option>
      <option ${feed.unit === 'g' ? 'selected' : ''}>g</option>
      <option ${feed.unit === 'hours' ? 'selected' : ''}>hours</option>
    </select></label>
    <button class="delete-feed" type="button" aria-label="Delete feed item">🗑️</button>
  `;
  row.querySelector('.delete-feed').addEventListener('click', () => row.remove());
  return row;
}

function renderFeeds() {
  starterFeeds.forEach(feed => feedList.appendChild(createFeedRow(feed)));
}

menuButton.addEventListener('click', toggleMenu);
navItems.forEach(link => link.addEventListener('click', closeMenu));
window.addEventListener('scroll', updateActiveLink);
addFeedButton.addEventListener('click', () => feedList.appendChild(createFeedRow()));

renderFeeds();
updateActiveLink();
