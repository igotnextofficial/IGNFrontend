import { Link } from 'react-router-dom';

export default function HeroSection() {
  const containerStyle = {
    marginTop: 'clamp(1rem, 4vw, 2rem)',
    display: 'flex',
    gap: 'clamp(1rem, 3vw, 1.5rem)',
    flexWrap: 'wrap' as const
  };

  const primaryButtonStyle = {
    display: 'inline-block',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '0.75rem',
    border: '2px solid #000000',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#000000',
    color: '#ffffff',
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  const secondaryButtonStyle = {
    display: 'inline-block',
    padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 4vw, 2rem)',
    fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)',
    fontWeight: 600,
    textDecoration: 'none',
    borderRadius: '0.75rem',
    border: '2px solid #ffffff',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#ffffff',
    color: '#000000',
    position: 'relative' as const,
    overflow: 'hidden' as const
  };

  const headingStyle = {
    fontSize: 'clamp(2.5em, 8vw, 5em)',
    lineHeight: '1em',
    color: '#040404',
    fontWeight: 'bold'
  };

  const paragraphStyle = {
    maxWidth: '540px',
    fontSize: 'clamp(1em, 3vw, 1.5em)',
    color: '#040404'
  };

  return (
    <section 
      className="relative w-full h-screen bg-black text-white overflow-hidden"
      style={{
        backgroundImage: 'url(/images/ign_background_about_v1.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative z-10 flex flex-col justify-end items-start h-full max-w-4xl" style={{ 
        padding: 'clamp(2em, 8vw, 6em) clamp(1em, 6vw, 4em)'
      }}>
        <h1 style={headingStyle}>
          Real Mentors<br />
          <span style={{ color: '#040404' }}>Real Growth</span>
        </h1>
        <p style={paragraphStyle}>
          Connect with industry experts, book one-on-one sessions, and achieve your goals.
        </p>
        <div style={containerStyle}>
          <Link 
            to="/mentors" 
            style={primaryButtonStyle}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-3px) scale(1.05)';
              target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
              target.style.backgroundColor = '#1a1a1a';
              target.style.borderColor = '#333333';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              target.style.backgroundColor = '#000000';
              target.style.borderColor = '#000000';
            }}
          >
            Explore Mentors
          </Link>
          <Link 
            to="/become-a-mentor" 
            style={secondaryButtonStyle}
            onMouseEnter={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(-3px) scale(1.05)';
              target.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.3)';
              target.style.backgroundColor = '#f5f5f5';
              target.style.borderColor = '#e0e0e0';
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLElement;
              target.style.transform = 'translateY(0) scale(1)';
              target.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.2)';
              target.style.backgroundColor = '#ffffff';
              target.style.borderColor = '#ffffff';
            }}
          >
            Become a Mentor
          </Link>
        </div>
      </div>
    </section>
  );
}
