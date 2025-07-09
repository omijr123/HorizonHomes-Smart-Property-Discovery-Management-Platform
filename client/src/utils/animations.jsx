import { useEffect, useRef, useState } from 'react';

// Custom hook for intersection observer
export const useInView = (options = {}) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting && !hasBeenSeen) {
          setHasBeenSeen(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px',
        ...options,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [hasBeenSeen, options]);

  return [ref, isInView, hasBeenSeen];
};

// Animated section component
export const AnimatedSection = ({ 
  children, 
  className = '', 
  animation = 'fadeInUp',
  delay = 0,
  duration = 600 
}) => {
  const [ref, isInView, hasBeenSeen] = useInView();

  const animations = {
    fadeInUp: {
      initial: { opacity: 0, transform: 'translateY(30px)' },
      animate: { opacity: 1, transform: 'translateY(0px)' }
    },
    fadeInDown: {
      initial: { opacity: 0, transform: 'translateY(-30px)' },
      animate: { opacity: 1, transform: 'translateY(0px)' }
    },
    fadeInLeft: {
      initial: { opacity: 0, transform: 'translateX(-30px)' },
      animate: { opacity: 1, transform: 'translateX(0px)' }
    },
    fadeInRight: {
      initial: { opacity: 0, transform: 'translateX(30px)' },
      animate: { opacity: 1, transform: 'translateX(0px)' }
    },
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 }
    },
    scaleIn: {
      initial: { opacity: 0, transform: 'scale(0.8)' },
      animate: { opacity: 1, transform: 'scale(1)' }
    },
    slideInUp: {
      initial: { opacity: 0, transform: 'translateY(100px)' },
      animate: { opacity: 1, transform: 'translateY(0px)' }
    },
    rotateIn: {
      initial: { opacity: 0, transform: 'rotate(-10deg) scale(0.8)' },
      animate: { opacity: 1, transform: 'rotate(0deg) scale(1)' }
    }
  };

  const currentAnimation = animations[animation] || animations.fadeInUp;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...currentAnimation.initial,
        ...(hasBeenSeen ? currentAnimation.animate : {}),
        transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </div>
  );
};

// Staggered children animation
export const StaggeredContainer = ({ 
  children, 
  className = '', 
  staggerDelay = 100,
  animation = 'fadeInUp' 
}) => {
  const [ref, isInView, hasBeenSeen] = useInView();

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <AnimatedSection
          animation={animation}
          delay={hasBeenSeen ? index * staggerDelay : 0}
          key={index}
        >
          {child}
        </AnimatedSection>
      ))}
    </div>
  );
};

// Counter animation hook
export const useCountAnimation = (end, duration = 2000, startWhen = true) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startWhen) return;

    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, startWhen]);

  return count;
};

// Parallax scroll effect
export const useParallax = (speed = 0.5) => {
  const [offset, setOffset] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const rate = scrolled * speed;
        setOffset(rate);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [speed]);

  return [ref, offset];
};

// Animated counter component
export const AnimatedCounter = ({ 
  end, 
  duration = 2000, 
  suffix = '', 
  prefix = '',
  className = '' 
}) => {
  const [ref, isInView, hasBeenSeen] = useInView();
  const count = useCountAnimation(end, duration, hasBeenSeen);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

// Scroll progress indicator
export const ScrollProgress = ({ className = '' }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setProgress(scrollPercent);
    };

    window.addEventListener('scroll', updateProgress);
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50 ${className}`}>
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

// Smooth scroll to top button
export const ScrollToTop = ({ showAfter = 500, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > showAfter) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [showAfter]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-40 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      } ${className}`}
    >
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </svg>
    </button>
  );
};

export default {
  useInView,
  AnimatedSection,
  StaggeredContainer,
  useCountAnimation,
  useParallax,
  AnimatedCounter,
  ScrollProgress,
  ScrollToTop
};
