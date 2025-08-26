// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.className = currentTheme === 'dark' ? 'dark' : '';
themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');
  const isDark = body.classList.contains('dark');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
});

// Active Section Detection
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveLink() {
  const scrollPos = window.scrollY + 100;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    
    if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active-link');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active-link');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveLink);

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navMenu = document.getElementById('nav-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    navMenu.classList.remove('active');
  });
});

// Contact Form Functionality
const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.contact-submit');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

// Form validation
function validateField(field, errorElement) {
  const value = field.value.trim();
  let isValid = true;
  let errorMessage = '';

  // Remove existing error styling
  field.classList.remove('error');
  errorElement.textContent = '';

  // Required field validation
  if (!value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else {
    // Email validation
    if (field.type === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        isValid = false;
        errorMessage = 'Please enter a valid email address';
      }
    }
    
    // Name validation
    if (field.id === 'name') {
      if (value.length < 2) {
        isValid = false;
        errorMessage = 'Name must be at least 2 characters long';
      }
    }
    
    // Message validation
    if (field.id === 'message') {
      if (value.length < 10) {
        isValid = false;
        errorMessage = 'Message must be at least 10 characters long';
      }
    }
  }

  if (!isValid) {
    field.classList.add('error');
    errorElement.textContent = errorMessage;
  }

  return isValid;
}

// Real-time validation
const formFields = contactForm.querySelectorAll('input, textarea');
formFields.forEach(field => {
  const errorElement = document.getElementById(`${field.id}-error`);
  
  field.addEventListener('blur', () => {
    validateField(field, errorElement);
  });
  
  field.addEventListener('input', () => {
    if (field.classList.contains('error')) {
      validateField(field, errorElement);
    }
  });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  // Validate all fields
  let isFormValid = true;
  formFields.forEach(field => {
    const errorElement = document.getElementById(`${field.id}-error`);
    if (!validateField(field, errorElement)) {
      isFormValid = false;
    }
  });
  
  if (!isFormValid) {
    return;
  }
  
  // Show loading state
  submitBtn.disabled = true;
  btnText.style.display = 'none';
  btnLoading.style.display = 'flex';
  
  try {
    // Create a hidden iframe to submit to Google Forms
    const iframe = document.createElement('iframe');
    iframe.style.display = 'none';
    iframe.name = 'google-form-submit';
    document.body.appendChild(iframe);
    
    // Set form target to iframe so it submits in background
    contactForm.target = 'google-form-submit';
    
    // Submit the form to Google Forms
    contactForm.submit();
    
    // Show success message after a short delay
    setTimeout(() => {
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      contactForm.reset();
      
      // Clean up iframe
      document.body.removeChild(iframe);
    }, 2000);
    
  } catch (error) {
    console.error('Form submission error:', error);
    showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
    contactForm.reset();
  } finally {
    // Reset button state
    submitBtn.disabled = false;
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification ${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    ${type === 'success' ? 'background: #10b981;' : 'background: #ef4444;'}
  `;
  
  document.body.appendChild(notification);
  
  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  // Remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 5000);
}

// Console Contact Feature
const consoleContactBtn = document.getElementById('console-contact-btn');
const consoleOutput = document.getElementById('console-output');

consoleContactBtn.addEventListener('click', () => {
  const contactInfo = {
    name: 'Mohit Kumar',
    email: 'mohit.k3089@gmail.com',
    github: 'https://github.com/Mohit-kumar101',
    linkedin: 'https://www.linkedin.com/in/mohit-k-12b941275/',
    location: 'Vancouver, BC',
    skills: ['JavaScript', 'React', 'C++', 'CSS', 'HTML', 'Node.js', 'AWS', 'Docker']
  };
  
  consoleOutput.style.display = 'block';
  consoleOutput.innerHTML = `// Contact Information
const contact = {
  name: "${contactInfo.name}",
  email: "${contactInfo.email}",
  github: "${contactInfo.github}",
  linkedin: "${contactInfo.linkedin}",
  location: "${contactInfo.location}",
  skills: [${contactInfo.skills.map(skill => `"${skill}"`).join(', ')}]
};

// Let's connect!
console.log("Ready to collaborate on amazing projects! 🚀");
console.log("Feel free to reach out at:", contact.email);`;
});

// Interactive Course Details
const interactiveCourses = document.querySelectorAll('.course-title.interactive-course');

interactiveCourses.forEach(course => {
  course.addEventListener('click', () => {
    const details = course.nextElementSibling;
    const isVisible = details.style.display === 'block';
    
    details.style.display = isVisible ? 'none' : 'block';
    
    if (!isVisible) {
      details.style.animation = 'fadeInUp 0.3s ease-out';
    }
  });
  
  // Keyboard accessibility
  course.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      course.click();
    }
  });
});

// Skill Tooltip System
const skillCards = document.querySelectorAll('.skill-advanced');
const tooltipDisplay = document.getElementById('skill-tooltip-display');
const tooltipContent = document.getElementById('tooltip-content');

// Skill icon mapping
const skillIcons = {
  'C++': '<img src="c++.png" alt="C++" style="width: 1.5rem; height: 1.5rem; vertical-align: middle;" />',
  'JavaScript': '<i class="fa-brands fa-js" style="color: #f7df1e;"></i>',
  'CSS': '<i class="fa-brands fa-css3-alt" style="color: #2965f1;"></i>',
  'HTML': '<i class="fa-brands fa-html5" style="color: #e34c26;"></i>',
  'AWS': '<i class="fa-brands fa-aws" style="color: #ff9900;"></i>',
  'Docker': '<i class="fa-brands fa-docker" style="color: #2496ed;"></i>',
  'Python': '<i class="fa-brands fa-python" style="color: #3776ab;"></i>',
  'Node.js': '<i class="fa-brands fa-node-js" style="color: #3c873a;"></i>',
  'Git': '<i class="fa-brands fa-git-alt" style="color: #f34f29;"></i>',
  'Cybersecurity': '<i class="fa-solid fa-shield-halved" style="color: #dc3545;"></i>'
};

skillCards.forEach(card => {
  card.addEventListener('click', () => {
    const skillInfo = card.getAttribute('data-skill-info');
    const [skillName, description] = skillInfo.split(': ');
    
    // Get the appropriate icon for this skill
    const skillIcon = skillIcons[skillName] || '<i class="fa-solid fa-code"></i>';
    
    // Update tooltip display
    tooltipDisplay.classList.add('active');
    tooltipContent.innerHTML = `
      <div class="skill-info">
        <h4>${skillIcon} ${skillName}</h4>
        <p>${description}</p>
      </div>
    `;
  });
  
  // Keyboard accessibility
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.click();
    }
  });
});

// Code Preview Buttons
const codePreviewBtns = document.querySelectorAll('.code-preview-btn');

codePreviewBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const projectCard = btn.closest('.project-card-advanced');
    const codePreview = projectCard.querySelector('.code-preview');
    const isVisible = codePreview.style.display === 'block';
    
    codePreview.style.display = isVisible ? 'none' : 'block';
    btn.textContent = isVisible ? 'Code Preview' : 'Hide Code';
    
    if (!isVisible) {
      codePreview.style.animation = 'fadeInUp 0.3s ease-out';
    }
  });
});

// Typing Animation for Bio - REMOVED (element no longer exists)

// C++ Easter Egg - REMOVED (element no longer exists)

// Enhanced Terminal Functionality
const runDemoBtn = document.getElementById('run-demo');
const clearTerminalBtn = document.getElementById('clear-terminal');
const helpBtn = document.getElementById('help-btn');
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

// Debug logging
console.log('Terminal elements found:', {
  runDemoBtn: !!runDemoBtn,
  clearTerminalBtn: !!clearTerminalBtn,
  helpBtn: !!helpBtn,
  terminalOutput: !!terminalOutput,
  terminalInput: !!terminalInput
});

// Check if elements exist before adding event listeners
if (runDemoBtn && clearTerminalBtn && helpBtn && terminalOutput && terminalInput) {
  console.log('All terminal elements found, initializing...');
  
  // Terminal commands and their outputs
  const terminalCommands = {
    'demo': 'cpp-demo',
    'help': 'help-output',
    'skills': 'skills-output',
    'projects': 'projects-output',
    'contact': 'contact-output',
    'about': 'about-output',
    'clear': 'clear'
  };

  // Add output line to terminal
  function addOutputLine(text, delay = 0) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const line = document.createElement('div');
        line.className = 'output-line';
        line.textContent = text;
        terminalOutput.appendChild(line);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
        console.log('Added output line:', text);
        resolve();
      }, delay);
    });
  }

  // Execute terminal command
  async function executeCommand(command) {
    console.log('Executing command:', command);
    const outputId = terminalCommands[command];
    
    if (!outputId) {
      await addOutputLine(`Command not found: ${command}. Type 'help' for available commands.`);
      return;
    }
    
    if (outputId === 'clear') {
      terminalOutput.innerHTML = '';
      await addOutputLine('Terminal cleared.');
      return;
    }
    
    const outputElement = document.getElementById(outputId);
    console.log('Output element found:', !!outputElement, 'ID:', outputId);
    
    if (outputElement) {
      const lines = outputElement.querySelectorAll('.output-line');
      console.log('Found', lines.length, 'output lines');
      
      for (let line of lines) {
        await addOutputLine(line.textContent, 100);
      }
    } else {
      await addOutputLine(`Error: Output element '${outputId}' not found.`);
    }
  }

  // Handle terminal input
  function handleTerminalInput() {
    const command = terminalInput.value.trim().toLowerCase();
    console.log('Handling input:', command);
    
    if (command) {
      // Show the command that was typed
      addOutputLine(`$ ${command}`);
      
      // Execute the command
      executeCommand(command);
      
      // Clear the input
      terminalInput.value = '';
    }
  }

  // Run demo with typing animation
  async function runDemo() {
    console.log('Running demo...');
    // Clear terminal
    terminalOutput.innerHTML = '';
    
    // Show typing animation
    terminalInput.value = 'g++ portfolio.cpp -o portfolio';
    await addOutputLine('$ g++ portfolio.cpp -o portfolio', 500);
    await addOutputLine('Compilation successful!', 300);
    
    terminalInput.value = './portfolio';
    await addOutputLine('$ ./portfolio', 500);
    
    // Execute the demo command
    await executeCommand('demo');
    
    // Clear input
    terminalInput.value = '';
  }

  // Event listeners
  runDemoBtn.addEventListener('click', () => {
    console.log('Run demo button clicked');
    runDemo();
  });

  clearTerminalBtn.addEventListener('click', async () => {
    console.log('Clear terminal button clicked');
    terminalOutput.innerHTML = '';
    terminalInput.value = '';
    await addOutputLine('Terminal cleared.');
  });

  helpBtn.addEventListener('click', async () => {
    console.log('Help button clicked');
    await executeCommand('help');
  });

  // Handle Enter key in terminal input
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      console.log('Enter key pressed in terminal input');
      handleTerminalInput();
    }
  });

  // Focus terminal input when clicking on terminal
  const terminalContent = document.querySelector('.terminal-content');
  if (terminalContent) {
    terminalContent.addEventListener('click', () => {
      terminalInput.focus();
    });
  }

  // Auto-run demo on page load
  window.addEventListener('load', () => {
    console.log('Page loaded, auto-running demo in 2 seconds...');
    setTimeout(() => {
      runDemo();
    }, 2000);
  });
  
  console.log('Terminal functionality initialized successfully!');
} else {
  console.error('Some terminal elements not found:', {
    runDemoBtn: !!runDemoBtn,
    clearTerminalBtn: !!clearTerminalBtn,
    helpBtn: !!helpBtn,
    terminalOutput: !!terminalOutput,
    terminalInput: !!terminalInput
  });
}

// Scroll-triggered animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add visible class to trigger animation
      entry.target.classList.add('visible');
      console.log('Animation triggered for:', entry.target.tagName, entry.target.className);
    } else {
      // Remove visible class when element goes out of view with a small delay
      // This allows the animation to complete before resetting
      setTimeout(() => {
        if (!entry.isIntersecting) {
          entry.target.classList.remove('visible');
        }
      }, 100);
    }
  });
}, observerOptions);

// Observe elements for animation
const animatedElements = document.querySelectorAll('section, .fade-in, .timeline-item, .fade-in-contact');
console.log('Found', animatedElements.length, 'elements to animate');
animatedElements.forEach(el => {
  observer.observe(el);
  console.log('Observing element:', el.tagName, el.className);
});

// Function to manually reset animations (for testing)
function resetAnimations() {
  animatedElements.forEach(el => {
    el.classList.remove('visible');
  });
  console.log('Animations reset');
}

// Function to manually trigger animations (for testing)
function triggerAnimations() {
  animatedElements.forEach(el => {
    el.classList.add('visible');
  });
  console.log('Animations manually triggered');
}

// Add to window for testing in console
window.resetAnimations = resetAnimations;
window.triggerAnimations = triggerAnimations;

// Skill bar animations
const skillBars = document.querySelectorAll('.skill-bar-inner');

const skillBarObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const skill = entry.target.dataset.skill;
      entry.target.style.width = `${skill}%`;
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillBarObserver.observe(bar);
}); 