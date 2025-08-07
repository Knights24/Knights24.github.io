// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
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
});
    map: starTexture,
    alphaTest: 0.001,
  });

  return new THREE.Points(geometry, material);
};

// Create multiple star layers
starFields.push(createStarField(6000, 1.8, 0xECF0F1, 3500)); // Bright white stars
starFields.push(createStarField(3000, 1.2, 0xBDC3C7, 3000)); // Light gray stars
starFields.push(createStarField(2000, 2.2, 0x7F8C8D, 2500)); // Medium gray stars
starFields.push(createStarField(1500, 1.5, 0xECF0F1, 2000)); // Pure white accent stars

starFields.forEach(field => scene.add(field));

// Create animated particle systems
const particleSystems = [];

// Create circular particle texture
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
  
  return canvas;
}

// Floating particles
const createParticleSystem = (count, size, color, speed, range) => {
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

  const particleTexture = new THREE.CanvasTexture(createParticleTexture(new THREE.Color(color)));

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
  return points;
};

// Create particle systems
particleSystems.push(createParticleSystem(900, 3, 0x7F8C8D, 0.02, 1600)); // Gray particles
particleSystems.push(createParticleSystem(700, 2, 0xBDC3C7, 0.015, 1300)); // Light gray particles
particleSystems.push(createParticleSystem(500, 4, 0xECF0F1, 0.01, 1100)); // White particles

particleSystems.forEach(system => scene.add(system));

// Create nebula clouds
const createNebula = (count, color, range) => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    // Cluster particles
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

    sizes[i] = 5 + Math.random() * 10;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const nebulaTexture = new THREE.CanvasTexture(createParticleTexture(new THREE.Color(color)));

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

  return new THREE.Points(geometry, material);
};

// Create nebula clouds
const nebulaClouds = [];
nebulaClouds.push(createNebula(350, 0x34495E, 900)); // Dark blue-gray nebula
nebulaClouds.push(createNebula(300, 0x7F8C8D, 800)); // Medium gray nebula
nebulaClouds.push(createNebula(250, 0xBDC3C7, 700)); // Light gray nebula

nebulaClouds.forEach(cloud => scene.add(cloud));

// Create shooting stars
const shootingStars = [];
const createShootingStar = () => {
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(6); // 2 points for a line
  
  const startX = (Math.random() - 0.5) * 2000;
  const startY = (Math.random() - 0.5) * 2000;
  const startZ = (Math.random() - 0.5) * 2000;
  
  positions[0] = startX;
  positions[1] = startY;
  positions[2] = startZ;
  positions[3] = startX;
  positions[4] = startY;
  positions[5] = startZ;

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.LineBasicMaterial({
    color: 0xECF0F1,
    transparent: true,
    opacity: 0.9,
    blending: THREE.AdditiveBlending,
  });

  const line = new THREE.Line(geometry, material);
  line.userData = {
    velocity: {
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
    },
    life: 100 + Math.random() * 100,
    maxLife: 100 + Math.random() * 100,
  };

  return line;
};

camera.position.z = 100;

// Mouse interaction with enhanced parallax
let mouseX = 0;
let mouseY = 0;
let targetMouseX = 0;
let targetMouseY = 0;
let time = 0;

document.addEventListener('mousemove', (event) => {
  targetMouseX = (event.clientX / window.innerWidth) * 2 - 1;
  targetMouseY = -(event.clientY / window.innerHeight) * 2 + 1;
});

// Smooth mouse interpolation
function updateMouse() {
  mouseX += (targetMouseX - mouseX) * 0.05;
  mouseY += (targetMouseY - mouseY) * 0.05;
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  time += 0.01;
  updateMouse();

  // Enhanced mouse-based parallax for star fields
  starFields.forEach((field, index) => {
    const parallaxFactor = (index + 1) * 0.1;
    field.rotation.y += 0.0002 * (index + 1) + mouseX * 0.001 * parallaxFactor;
    field.rotation.x += 0.0001 * (index + 1) + mouseY * 0.0005 * parallaxFactor;
    field.rotation.z += 0.00005 * (index + 1);
    
    // Add mouse-influenced position offset
    field.position.x = mouseX * 20 * parallaxFactor;
    field.position.y = mouseY * 10 * parallaxFactor;
  });

  // Animate particle systems with mouse influence
  particleSystems.forEach((system, index) => {
    const positions = system.geometry.attributes.position.array;
    const velocities = system.userData.velocities;
    const range = system.userData.range;

    for (let i = 0; i < positions.length; i += 3) {
      // Add mouse influence to particle movement
      const mouseInfluence = 0.05;
      positions[i] += velocities[i] + mouseX * mouseInfluence;
      positions[i + 1] += velocities[i + 1] + mouseY * mouseInfluence;
      positions[i + 2] += velocities[i + 2];

      // Wrap around
      if (Math.abs(positions[i]) > range / 2) velocities[i] *= -1;
      if (Math.abs(positions[i + 1]) > range / 2) velocities[i + 1] *= -1;
      if (Math.abs(positions[i + 2]) > range / 2) velocities[i + 2] *= -1;
    }

    system.geometry.attributes.position.needsUpdate = true;
    system.rotation.y += 0.001 + mouseX * 0.002;
    system.rotation.x += mouseY * 0.001;
  });

  // Animate nebula clouds with enhanced mouse interaction
  nebulaClouds.forEach((cloud, index) => {
    cloud.rotation.y += 0.0005 * (index + 1) + mouseX * 0.003;
    cloud.rotation.x += 0.0003 * (index + 1) + mouseY * 0.002;
    
    // Pulsing effect enhanced by mouse movement
    const scale = 1 + Math.sin(time * 2 + index) * 0.1 + Math.abs(mouseX) * 0.05 + Math.abs(mouseY) * 0.05;
    cloud.scale.setScalar(scale);
    
    // Mouse-influenced position
    cloud.position.x = mouseX * 15 * (index + 1) * 0.3;
    cloud.position.y = mouseY * 10 * (index + 1) * 0.3;
  });

  // Create occasional shooting stars
  if (Math.random() < 0.01 && shootingStars.length < 5) {
    shootingStars.push(createShootingStar());
    scene.add(shootingStars[shootingStars.length - 1]);
  }

  // Animate shooting stars
  for (let i = shootingStars.length - 1; i >= 0; i--) {
    const star = shootingStars[i];
    const positions = star.geometry.attributes.position.array;
    const userData = star.userData;

    // Update trail
    positions[0] = positions[3];
    positions[1] = positions[4];
    positions[2] = positions[5];

    positions[3] += userData.velocity.x;
    positions[4] += userData.velocity.y;
    positions[5] += userData.velocity.z;

    star.geometry.attributes.position.needsUpdate = true;

    // Fade out
    userData.life--;
    star.material.opacity = userData.life / userData.maxLife;

    if (userData.life <= 0) {
      scene.remove(star);
      shootingStars.splice(i, 1);
    }
  }

  // Enhanced parallax camera movement with smooth mouse tracking
  const targetX = mouseX * 30;
  const targetY = mouseY * 20;
  
  camera.position.x += (targetX - camera.position.x) * 0.03;
  camera.position.y += (targetY - camera.position.y) * 0.03;
  
  // Enhanced subtle camera movement with mouse influence
  camera.position.x += Math.sin(time * 0.5) * 2 + mouseX * 5;
  camera.position.y += Math.cos(time * 0.3) * 1.5 + mouseY * 3;
  
  // Dynamic camera look-at with mouse influence
  const lookAtX = mouseX * 50;
  const lookAtY = mouseY * 30;
  camera.lookAt(lookAtX, lookAtY, 0);

  renderer.render(scene, camera);
}

animate();

// Handle resizing with mobile optimizations
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio for performance
  
  // Adjust particle count based on screen size for performance
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    // Reduce particle opacity and size for mobile
    starFields.forEach(field => {
      if (field.material) {
        field.material.size = Math.min(field.material.size, 3);
        field.material.opacity = Math.min(field.material.opacity, 0.7);
      }
    });
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
      const mobileNav = document.querySelector('.mobile-nav');
      const mobileToggle = document.querySelector('.mobile-menu-toggle');
      if (mobileNav && mobileNav.classList.contains('active')) {
        mobileNav.classList.remove('active');
        mobileToggle.classList.remove('active');
      }
    }
  });
});

// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileToggle = document.querySelector('.mobile-menu-toggle');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', function() {
      mobileToggle.classList.toggle('active');
      mobileNav.classList.toggle('active');
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileToggle.contains(e.target) && !mobileNav.contains(e.target)) {
        mobileToggle.classList.remove('active');
        mobileNav.classList.remove('active');
      }
    });
  }
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  
  lastScrollTop = scrollTop;
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

// Add particle interaction on scroll
window.addEventListener('scroll', () => {
  const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
  
  // Adjust particle speeds based on scroll
  particleSystems.forEach((system, index) => {
    system.rotation.y = scrollPercent * Math.PI * (index + 1) * 0.5;
  });
  
  // Adjust nebula intensity
  nebulaClouds.forEach((cloud, index) => {
    cloud.material.opacity = 0.4 + scrollPercent * 0.3;
  });
});

// Add click interaction - create burst effect
document.addEventListener('click', (event) => {
  if (event.target.tagName === 'CANVAS') {
    createBurstEffect(event.clientX, event.clientY);
  }
});

function createBurstEffect(x, y) {
  const burstGeometry = new THREE.BufferGeometry();
  const burstCount = 50;
  const positions = new Float32Array(burstCount * 3);
  const velocities = [];
  const colors = new Float32Array(burstCount * 3);

  // Convert screen coordinates to world coordinates
  const mouse = new THREE.Vector2();
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);
  const intersectPoint = raycaster.ray.at(100);

  for (let i = 0; i < burstCount; i++) {
    positions[i * 3] = intersectPoint.x;
    positions[i * 3 + 1] = intersectPoint.y;
    positions[i * 3 + 2] = intersectPoint.z;

    velocities.push({
      x: (Math.random() - 0.5) * 20,
      y: (Math.random() - 0.5) * 20,
      z: (Math.random() - 0.5) * 20,
    });

    const color = new THREE.Color();
    color.setHSL(Math.random(), 1, 0.5);
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;
  }

  burstGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  burstGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  const burstMaterial = new THREE.PointsMaterial({
    size: 5,
    sizeAttenuation: true,
    transparent: true,
    opacity: 1,
    vertexColors: true,
    blending: THREE.AdditiveBlending,
    map: starTexture,
    alphaTest: 0.001,
  });

  const burstPoints = new THREE.Points(burstGeometry, burstMaterial);
  burstPoints.userData = { velocities, life: 60 };
  scene.add(burstPoints);

  // Animate burst
  const animateBurst = () => {
    const positions = burstPoints.geometry.attributes.position.array;
    const velocities = burstPoints.userData.velocities;

    for (let i = 0; i < positions.length; i += 3) {
      positions[i] += velocities[i / 3].x;
      positions[i + 1] += velocities[i / 3].y;
      positions[i + 2] += velocities[i / 3].z;

      velocities[i / 3].x *= 0.98;
      velocities[i / 3].y *= 0.98;
      velocities[i / 3].z *= 0.98;
    }

    burstPoints.geometry.attributes.position.needsUpdate = true;
    burstPoints.material.opacity -= 0.016;
    burstPoints.userData.life--;

    if (burstPoints.userData.life > 0) {
      requestAnimationFrame(animateBurst);
    } else {
      scene.remove(burstPoints);
    }
  };

  animateBurst();
}
