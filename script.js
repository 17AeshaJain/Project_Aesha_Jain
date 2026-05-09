function initNav() {
  const burger = document.querySelector('.nav__burger');
  const mobile = document.querySelector('.nav__mobile');
  if (!burger || !mobile) return;
  burger.addEventListener('click', () => {
    mobile.classList.toggle('open');
    burger.setAttribute('aria-expanded', mobile.classList.contains('open'));
  });
  mobile.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => mobile.classList.remove('open'));
  });
}
function initNavToggle() {
  const toggle = document.querySelector('.nav-toggle');
  const links  = document.querySelector('.nav-links');
  if (!toggle || !links) return;
  toggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'absolute';
    links.style.top = '64px';
    links.style.right = '0';
    links.style.background = 'var(--surface)';
    links.style.border = '1px solid var(--border)';
    links.style.borderRadius = '0 0 12px 12px';
    links.style.padding = '12px 0';
    links.style.minWidth = '160px';
    links.style.zIndex = '200';
  });
}

function initGoBack() {
  document.querySelectorAll('.go-back').forEach(btn => {
    btn.addEventListener('click', () => history.back());
  });
}

function initBMI() {
  const form = document.getElementById('bmiForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const weight = parseFloat(document.getElementById('bmiWeight').value);
    const height = parseFloat(document.getElementById('bmiHeight').value);
    const unit   = document.getElementById('bmiUnit').value;

    if (!weight || !height || weight <= 0 || height <= 0) return;

    let bmi;
    if (unit === 'imperial') {
      bmi = (703 * weight) / (height * height);
    } else {
      const hMeters = height / 100;
      bmi = weight / (hMeters * hMeters);
    }

    bmi = Math.round(bmi * 10) / 10;

    let category, tip, color;
    if (bmi < 18.5) {
      category = 'Underweight';
      tip      = '💡 Focus on calorie-dense whole foods and strength training to build healthy mass.';
      color    = '#29b6f6';
    } else if (bmi < 25) {
      category = 'Normal Weight ✅';
      tip      = '🎉 Great work! Maintain with balanced meals, regular cardio, and strength training.';
      color    = '#4caf50';
    } else if (bmi < 30) {
      category = 'Overweight';
      tip      = '💡 Consider adding 30 min cardio daily and reducing processed foods. Start small!';
      color    = '#ffb300';
    } else {
      category = 'Obese';
      tip      = '💡 Begin with low-impact exercises like walking or swimming. Consult a doctor.';
      color    = '#ff5722';
    }

    const result = document.getElementById('bmiResult');
    result.classList.add('visible');
    result.querySelector('.bmi-result__value').textContent    = bmi;
    result.querySelector('.bmi-result__category').textContent = category;
    result.querySelector('.bmi-result__tip').textContent      = tip;
    result.style.borderLeftColor = color;
    result.querySelector('.bmi-result__value').style.color = color;
  });
}
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  function showError(field, msg) {
    let err = field.parentElement.querySelector('.form-error');
    if (!err) {
      err = document.createElement('p');
      err.className = 'form-error';
      field.parentElement.appendChild(err);
    }
    err.textContent = msg;
    err.style.display = 'block';
    field.style.borderColor = '#f44336';
  }
  function clearError(field) {
    const err = field.parentElement.querySelector('.form-error');
    if (err) err.style.display = 'none';
    field.style.borderColor = '';
  }

  form.querySelectorAll('input, textarea, select').forEach(field => {
    field.addEventListener('input', () => {
      if (field.value.trim()) clearError(field);
    });
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    let valid = true;

    const name  = document.getElementById('cName');
    const email = document.getElementById('cEmail');
    const goal  = document.getElementById('cGoal');
    const msg   = document.getElementById('cMessage');

    if (!name || !email || !goal || !msg) return;

    if (!name.value.trim() || name.value.trim().length < 2) {
      showError(name, 'Please enter your full name (at least 2 characters).'); valid = false;
    } else clearError(name);

    const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRx.test(email.value)) {
      showError(email, 'Please enter a valid email address.'); valid = false;
    } else clearError(email);

    if (!goal.value) {
      showError(goal, 'Please select your fitness goal.'); valid = false;
    } else clearError(goal);

    if (!msg.value.trim() || msg.value.trim().length < 10) {
      showError(msg, 'Message should be at least 10 characters.'); valid = false;
    } else clearError(msg);

    if (valid) {
      const success = document.getElementById('formSuccess');
      if (success) {
        success.classList.add('visible');
        form.reset();
        setTimeout(() => success.classList.remove('visible'), 6000);
      }
    }
  });
}

function initAccordion() {
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', function() {
      const item   = this.closest('.accordion__item');
      const isOpen = item.classList.contains('open');
      const group  = item.closest('.accordion');
      if (group) {
        group.querySelectorAll('.accordion__item.open').forEach(i => i.classList.remove('open'));
      }
      if (!isOpen) item.classList.add('open');
    });
  });
}
function initAOS() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity    = '1';
        entry.target.style.transform  = 'translateY(0)';
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.card, .plan-card, .yoga-card, .diet-card, .day-card, .accordion__item, .exercise-item, .tip-card, .feature-card'
  ).forEach(el => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
  });
}
function initStatBars() {
  const fills = document.querySelectorAll('.stat-bar__fill');
  if (!fills.length) return;
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = el.dataset.width || '0%';
        setTimeout(() => { el.style.width = target; }, 100);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => { f.style.width = '0%'; observer.observe(f); });
}

function initActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll(
    '.nav__links a, .nav__mobile a, .nav-links a'
  ).forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initNavToggle();
  initGoBack();
  initBMI();
  initContactForm();
  initAccordion();
  initAOS();
  initStatBars();
  initActiveNav();
});
