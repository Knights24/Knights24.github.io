// Three.js Background Animation
let scene, camera, renderer;
let starFields = [];
let particleSystems = [];
let nebulaClouds = [];
let shootingStars = [];
let time = 0;
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;

// Initialize Three.js
function initThreeJS() {
  // Scene setup
  scene = new THREE.Scene();
  
  // Camera setup
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
  camera.position.z = 100;
  
  // Renderer setup
  const canvas = document.getElementById('bg-canvas');
  renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  // Create star texture
  const starTexture = createStarTexture();
  
  // Create star fields
  createStarField(6000, 1.8, 0xECF0F1, 3500, starTexture);
  createStarField(3000, 1.2, 0xBDC3C7, 3000, starTexture);
  createStarField(2000, 2.2, 0x7F8C8D, 2500, starTexture);
  createStarField(1500, 1.5, 0xECF0F1, 2000, starTexture);
  
  // Create particle systems
  createParticleSystems();
  
  // Create nebula clouds
  createNebulaClouds();
  
  // Start animation
  animate();
}

// Create star texture
function createStarTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.4, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  
  return new THREE.CanvasTexture(canvas);
}

// Create star field
function createStarField(count, size, color, range, texture) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = (Math.random() - 0.5) * range;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.8,
    color: color,
    blending: THREE.AdditiveBlending,
    map: texture,
    alphaTest: 0.001,
  });
  
  const starField = new THREE.Points(geometry, material);
  starFields.push(starField);
  scene.add(starField);
}

// Create particle texture
function createParticleTexture(color) {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const context = canvas.getContext('2d');
  
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 1)`);
  gradient.addColorStop(0.4, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0.8)`);
  gradient.addColorStop(1, `rgba(${color.r * 255}, ${color.g * 255}, ${color.b * 255}, 0)`);
  
  context.fillStyle = gradient;
  context.fillRect(0, 0, 32, 32);
  
  return new THREE.CanvasTexture(canvas);
}

// Create particle systems
function createParticleSystems() {
  // Create different particle systems
  createParticleSystem(900, 3, 0x7F8C8D, 0.02, 1600);
  createParticleSystem(700, 2, 0xBDC3C7, 0.015, 1300);
  createParticleSystem(500, 4, 0xECF0F1, 0.01, 1100);
}

function createParticleSystem(count, size, color, speed, range) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const velocities = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = (Math.random() - 0.5) * range;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range;

    velocities[i * 3] = (Math.random() - 0.5) * speed;
    velocities[i * 3 + 1] = (Math.random() - 0.5) * speed;
    velocities[i * 3 + 2] = (Math.random() - 0.5) * speed;

    const particleColor = new THREE.Color(color);
    particleColor.multiplyScalar(0.3 + Math.random() * 0.7);
    colors[i * 3] = particleColor.r;
    colors[i * 3 + 1] = particleColor.g;
    colors[i * 3 + 2] = particleColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const particleTexture = createParticleTexture(new THREE.Color(color));

  const material = new THREE.PointsMaterial({
    size: size,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.6,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    map: particleTexture,
    alphaTest: 0.001,
  });

  const points = new THREE.Points(geometry, material);
  points.userData = { velocities, range, speed };
  particleSystems.push(points);
  scene.add(points);
}

// Create nebula clouds
function createNebulaClouds() {
  createNebula(350, 0x34495E, 900);
  createNebula(300, 0x7F8C8D, 800);
  createNebula(250, 0xBDC3C7, 700);
}

function createNebula(count, color, range) {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.random() * range * 0.3;
    positions[i * 3] = Math.cos(angle) * radius + (Math.random() - 0.5) * range;
    positions[i * 3 + 1] = Math.sin(angle) * radius + (Math.random() - 0.5) * range;
    positions[i * 3 + 2] = (Math.random() - 0.5) * range * 0.5;

    const nebulaColor = new THREE.Color(color);
    nebulaColor.multiplyScalar(0.2 + Math.random() * 0.3);
    colors[i * 3] = nebulaColor.r;
    colors[i * 3 + 1] = nebulaColor.g;
    colors[i * 3 + 2] = nebulaColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const nebulaTexture = createParticleTexture(new THREE.Color(color));

  const material = new THREE.PointsMaterial({
    size: 8,
    sizeAttenuation: true,
    transparent: true,
    opacity: 0.4,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    map: nebulaTexture,
    alphaTest: 0.001,
  });

  const nebula = new THREE.Points(geometry, material);
  nebulaClouds.push(nebula);
  scene.add(nebula);
}

// Mouse interaction
document.addEventListener('mousemove', (event) => {
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Update mouse position smoothly
function updateMouse() {
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;
  updateMouse();

  // Animate star fields
  starFields.forEach((field, index) => {
    const parallaxFactor = (index + 1) * 0.1;
    field.rotation.y += 0.0002 * (index + 1) + mouseX * 0.001 * parallaxFactor;
    field.rotation.x += 0.0001 * (index + 1) + mouseY * 0.0005 * parallaxFactor;
    field.rotation.z += 0.00005 * (index + 1);
    
    field.position.x = mouseX * 20 * parallaxFactor;
    field.position.y = mouseY * 10 * parallaxFactor;
  });

  // Animate particle systems
  particleSystems.forEach((system, index) => {
    const positions = system.geometry.attributes.position.array;
    const velocities = system.userData.velocities;
    const range = system.userData.range;

    for (let i = 0; i < positions.length; i += 3) {
      const mouseInfluence = 0.05;
      positions[i] += velocities[i] + mouseX * mouseInfluence;
      positions[i + 1] += velocities[i + 1] + mouseY * mouseInfluence;
      positions[i + 2] += velocities[i + 2];

      if (Math.abs(positions[i]) > range / 2) velocities[i] *= -1;
      if (Math.abs(positions[i + 1]) > range / 2) velocities[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > range / 2) velocities[i + 2] *= -1;
    }

    system.geometry.attributes.position.needsUpdate = true;
    system.rotation.y += 0.001 + mouseX * 0.002;
    system.rotation.x += mouseY * 0.001;
  });

  // Animate nebula clouds
  nebulaClouds.forEach((cloud, index) => {
    cloud.rotation.y += 0.0005 * (index + 1) + mouseX * 0.003;
    cloud.rotation.x += 0.0003 * (index + 1) + mouseY * 0.002;
    
    const scale = 1 + Math.sin(time * 2 + index) * 0.1 + Math.abs(mouseX) * 0.05 + Math.abs(mouseY) * 0.05;
    cloud.scale.setScalar(scale);
    
    cloud.position.x = mouseX * 15 * (index + 1) * 0.3;
    cloud.position.y = mouseY * 10 * (index + 1) * 0.3;
  });

  // Camera movement
  const targetX = mouseX * 30;
  const targetY = mouseY * 20;
  
  camera.position.x += (targetX - camera.position.x) * 0.03;
  camera.position.y += (targetY - camera.position.y) * 0.03;
  
  camera.position.x += Math.sin(time * 0.5) * 2 + mouseX * 5;
  camera.position.y += Math.cos(time * 0.3) * 1.5 + mouseY * 3;
  
  const lookAtX = mouseX * 50;
  const lookAtY = mouseY * 30;
  camera.lookAt(lookAtX, lookAtY, 0);

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Standard website functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize Three.js
  initThreeJS();
  
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  const navbar = document.getElementById('navbar');

  // Mobile menu toggle
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });
  }

  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Close mobile menu if open
        if (mobileNav) {
          mobileNav.classList.remove('active');
          if (mobileToggle) {
            mobileToggle.classList.remove('active');
          }
        }
      }
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (mobileNav && mobileToggle) {
      if (!mobileNav.contains(e.target) && !mobileToggle.contains(e.target)) {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    }
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  // Observe all sections for scroll animations
  document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'all 0.8s ease-out';
    observer.observe(section);
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero h1');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';

    let i = 0;
    const typeWriter = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
  }
});
