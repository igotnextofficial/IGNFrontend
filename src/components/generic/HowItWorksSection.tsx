import React from 'react';
import { 
  Search as SearchIcon, 
  CalendarToday as CalendarIcon, 
  TrendingUp as TrendingIcon 
} from '@mui/icons-material';

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      icon: <SearchIcon sx={{ fontSize: '3rem', color: '#000000' }} />,
      title: 'Browse',
      description: 'Explore mentors by mastery, skillset, or popularity to find the perfect match for your goals.'
    },
    {
      icon: <CalendarIcon sx={{ fontSize: '3rem', color: '#000000' }} />,
      title: 'Book',
      description: 'Schedule one-on-one sessions with your chosen mentor at times that work for both of you.'
    },
    {
      icon: <TrendingIcon sx={{ fontSize: '3rem', color: '#000000' }} />,
      title: 'Grow',
      description: 'Learn from industry experts, gain valuable insights, and accelerate your career growth.'
    }
  ];

  const containerStyle = {
    padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 6vw, 4rem)',
    backgroundColor: '#f8f9fa'
  };

  const sectionStyle = {
    maxWidth: '1200px',
    margin: '0 auto'
  };

  const titleStyle = {
    textAlign: 'center' as const,
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 'bold',
    color: '#040404',
    marginBottom: 'clamp(1rem, 3vw, 2rem)'
  };

  const subtitleStyle = {
    textAlign: 'center' as const,
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    color: '#666666',
    marginBottom: 'clamp(3rem, 8vw, 5rem)',
    maxWidth: '600px',
    margin: '0 auto clamp(3rem, 8vw, 5rem) auto'
  };

  const stepsContainerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(2rem, 5vw, 4rem)',
    alignItems: 'start'
  };

  const stepCardStyle = {
    textAlign: 'left' as const,
    padding: 'clamp(1.5rem, 4vw, 2.5rem)',
    backgroundColor: 'transparent',
    transition: 'transform 0.3s ease',
    cursor: 'pointer',
    display: 'flex',
    gap: 'clamp(1rem, 3vw, 1.5rem)'
  };

  const stepTitleStyle = {
    fontSize: 'clamp(1.25rem, 3vw, 1.75rem)',
    fontWeight: 'bold',
    color: '#040404',
    marginBottom: '0.5rem'
  };

  const stepDescriptionStyle = {
    fontSize: 'clamp(0.875rem, 2vw, 1rem)',
    color: '#666666',
    lineHeight: '1.6'
  };

  return (
    <section style={containerStyle}>
      <div style={sectionStyle}>
        <h2 style={titleStyle}>
          How It Works
        </h2>
        <p style={subtitleStyle}>
          Get started with mentorship in three simple steps
        </p>
        
        <div style={stepsContainerStyle}>
          {steps.map((step, index) => (
            <div 
              key={index}
              style={stepCardStyle}
              onMouseEnter={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(-8px)';
              }}
              onMouseLeave={(e) => {
                const target = e.currentTarget;
                target.style.transform = 'translateY(0)';
              }}
            >
              <div style={{ flexShrink: 0, alignSelf: 'flex-start' }}>
                {step.icon}
              </div>
              <div>
                <h3 style={stepTitleStyle}>
                  {step.title}
                </h3>
                <p style={stepDescriptionStyle}>
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection; 