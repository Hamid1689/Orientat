export default function Logo({ size = 62 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 243 190" fill="none" xmlns="http://www.w3.org/2000/svg">
      <polygon points="121,0 200,28 121,50 42,28" fill="white"/>
      <polygon points="71,48 121,120 171,48 160,48 121,105 82,48" fill="white"/>
      <line x1="42" y1="28" x2="42" y2="65" stroke="white" strokeWidth="3"/>
      <circle cx="42" cy="70" r="5" fill="white"/>
      <text x="88" y="140" fontSize="14" fill="white" textAnchor="middle">★</text>
      <text x="154" y="140" fontSize="14" fill="white" textAnchor="middle">★</text>
      <text x="50" y="175" fontSize="28" fontWeight="900" fill="white" fontFamily="Arial">Orient</text>
      <text x="163" y="175" fontSize="28" fontWeight="900" fill="#CC0000" fontFamily="Arial">AT</text>
    </svg>
  );
}
