import React, { useEffect, useRef } from 'react';

const mentorImages = [
  'https://storage.googleapis.com/ignmagazine-assets/uploads/9efb3fd1-0dc1-4c70-a170-540083381c36/images/georgefiuller-1748023339649.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20250615%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250615T155956Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=2de5660377c0cb85c99258663ee1682be7ea124a5f8101b6b6bb3eb509033a3fa8b9786698f029f728d64e3ab788eff0911ad1f6d08cb094d9eebc8782eddac6b4784cf29ea1eb2b3596f1747b8a2e7e6ddf276736c7876fd6d1cfffc49a25bd3347c882c36eb8aa9ff079eab39b3bd91305b768e81f98c60045d1fce18cb96f6826ff69481258debd0641ab6b2ea629752eff5a18ec814d4011acd8f03789bb5d64e6fdb3d4e8a4cf0c2fafc5e7cd254ea7bbde80e958098f7d7908914647268f289c9db32096f4e44a78dff721a943e51ae61b4acd121d5e509e012a39c01b011f4d4f70ca033523c9a504589787bb265e6eb19cafb24ad50a736e8a6e6ec9',
  'https://storage.googleapis.com/ignmagazine-assets/uploads/9efb3f39-cbdb-4d36-bae4-12263934a25b/images/lisachristian-1748023153706.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20250615%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250615T155956Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=4f9790456904a9e9b27643f6ecea5fabad923472e2ba1456f5c1ad6d42ce152024c3c71865fe01ee0ac2615dd86f1eb0cf57643402c381843cc89ab17bf477252fac55c91f8f6d3811c86e7fb3099ef2899790338886cc367ff9f7692a628a4b6d9253e297d0c7c199dae49a448ac8725f8d28ade23fabbdd5f78d3e5083599ab4a360a347c909baabb1d8a21d128c5b46e7ce746df8b2b0155d766225eea53d094460fbc75d8142bfef6d1e07973b6d34463e55dd1430412d8de75c6c929a79d5dc453cb436f975d01992cd2e41e782ac73f30b0fad9d41a56880dfce4a1a9060c1edebd1ef2a0c7c10f6b9ec7cc36282a47919ab82ceef92df09d813ecb237',
  'https://storage.googleapis.com/ignmagazine-assets/uploads/9efb4008-16f6-467d-b2ac-283d23293f57/images/janesmith-1748023090579.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20250615%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250615T155956Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=7b03668816262c6afcb20aca71d8569de0efcde1b624eb900ba40e4cff8e79783f58bb6065b6149aed2610bc91dcb80f6dccc26e9c27f4d320539edb337887f941251c0848c1fae48a45749f7adc12b7e1b9220e5a8910181413f14dd059ad5ba57414922757e84951a6a40b82215555cb462dfc83caf00e7c1b5d49e6fa880ff0075c93eac4431c2ff42174647d75798156f8fa8232d35257b63bbb60bf2432bb1e6ed3640fbca980cfe1d5aa8533788c4db87cefdd20777ea1fa06f7be4b2a4953272a744c129c00156c034b1388be4e6106b88ddc2ec9ca797785711f818f5a25aee1aee8df6905c703ce2855f1bd554973f166c98b0abe45abf961ce2768',
  'https://storage.googleapis.com/ignmagazine-assets/uploads/9efb3f74-760a-4bea-9f2d-440f52ceffdc/images/bradsmith-1748023198754.jpg?X-Goog-Algorithm=GOOG4-RSA-SHA256&X-Goog-Credential=media-upload-manager%40ign-magazine.iam.gserviceaccount.com%2F20250615%2Fauto%2Fstorage%2Fgoog4_request&X-Goog-Date=20250615T155956Z&X-Goog-Expires=604800&X-Goog-SignedHeaders=host&X-Goog-Signature=6de7e36af816a4f864b4f34c58cf188366cc698d519ad1bcce2ae5012279bee0c5ce155d195a5fc9439313feaeb95cea72a198de4e52e954255c3cad4313670988fe6acd86801309f674def3a978210645c2aa1dcda3128804cac839e4d23271f12192d177fd46ee388bd5deb16bbc7c29ee57492fdc816a2de29c561a33842d6e4fbbf4b440ef1e8f03a588b8f478383797e6c4bdf679edb311cead809c1a98c3fbcc37714c8e34c4b4daa6c714099a23d80135a43d21252d2f5bf70707b983a41ba159d4db0281558af5cc8de42ec300bbba87c43eb6c4beb4cb4e81638fd628ab49d9a5704295b684344a8d9d2b204b0eee8b964b8e2c99cbb5506bee8121'
];

const MentorshipHeroSectionV2 = () => {
  const orbitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let angle = 0;
    const interval = setInterval(() => {
      if (orbitRef.current) {
        angle = (angle + 0.5) % 360;
        orbitRef.current.style.transform = `rotate(${angle}deg)`;
      }
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.heroContainer}>
      <div style={styles.heroText}>
        <h1 style={styles.heading}>
          MENTORSHIP THAT <span style={styles.highlight}>ELEVATES</span><br /> YOUR CAREER
        </h1>
        <button style={styles.ctaButton}>Explore Mentors →</button>
      </div>
      <div style={styles.orbitContainer}>
        <div style={styles.orbit} ref={orbitRef}>
          {mentorImages.map((src, index) => (
            <div key={index} style={styles.orbitImageContainer}>
              <img src={src} alt={`mentor-${index}`} style={styles.orbitImage} />
              <div style={styles.reflection}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  heroContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '60px',
    background: '#f8f8f8',
    minHeight: '100vh',
    fontFamily: 'sans-serif',
  },
  heroText: {
    flex: 1,
  },
  heading: {
    fontSize: '48px',
    color: '#111',
    lineHeight: '1.2',
  },
  highlight: {
    color: '#cf2127',
  },
  ctaButton: {
    marginTop: '20px',
    padding: '12px 24px',
    fontSize: '16px',
    background: '#111',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    borderRadius: '4px',
  },
  orbitContainer: {
    flex: 1,
    position: 'relative',
    width: '400px',
    height: '400px',
  },
  orbit: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transformOrigin: 'center',
  },
  orbitImageContainer: {
    position: 'absolute',
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  },
  orbitImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  reflection: {
    position: 'absolute',
    bottom: '-30px',
    left: '0',
    width: '100%',
    height: '30px',
    background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
    transform: 'scaleY(-1)',
    borderRadius: '50%',
  }
};

export default MentorshipHeroSectionV2;
