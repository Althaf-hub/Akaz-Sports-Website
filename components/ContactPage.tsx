/* Additional styles for the contact page */
.contact-hero {
    position: relative;
    overflow: hidden;
  }
  
  .contact-hero::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("/placeholder.svg?height=600&width=1200&text=Contact") center / cover no-repeat;
    opacity: 0.1;
    z-index: 0;
  }
  
  .contact-hero .container {
    position: relative;
    z-index: 1;
  }
  
  .contact-form-container {
    position: relative;
    overflow: hidden;
  }
  
  .contact-form-container::before {
    content: "";
    position: absolute;
    top: -50px;
    right: -50px;
    width: 100px;
    height: 100px;
    background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
    border-radius: 50%;
    opacity: 0.1;
  }
  
  .contact-form-container::after {
    content: "";
    position: absolute;
    bottom: -50px;
    left: -50px;
    width: 100px;
    height: 100px;
    background: linear-gradient(to right, var(--secondary-color), var(--primary-color));
    border-radius: 50%;
    opacity: 0.1;
  }
  
  .contact-method {
    transition: all 0.3s ease;
  }
  
  .contact-method:hover {
    transform: translateY(-5px);
  }
  
  .social-link {
    transition: all 0.3s ease;
  }
  
  .social-link:hover {
    transform: translateY(-3px) rotate(10deg);
  }
  
  .faq-item {
    transition: all 0.3s ease;
  }
  
  .faq-item:hover {
    transform: translateX(5px);
  }
  
  .map-container {
    position: relative;
    overflow: hidden;
  }
  
  .map-container::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, var(--primary-color), transparent 70%);
    opacity: 0.2;
    z-index: 1;
    pointer-events: none;
  }
  
  /* Pulsing dot animation for the map marker */
  .map-marker {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    background-color: var(--primary-color);
    border-radius: 50%;
    z-index: 2;
  }
  
  .map-marker::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary-color);
    border-radius: 50%;
    animation: pulse 2s infinite;
    z-index: -1;
  }
  
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    100% {
      transform: scale(3);
      opacity: 0;
    }
  }
  