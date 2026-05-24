export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="692 0 243 234" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="692" width="243" height="234" fill="white"/>
      <path d="M812.5 86L865.837 103.875L812.5 120.375L759.162 103.875L812.5 86Z" fill="#2D2752"/>
      <path d="M812.376 158.5L822.002 141.884L836 117.5L812.376 124.898L790 117.5L804.374 141.884L812.376 158.5Z" fill="#2D2752"/>
      <path d="M812.5 120.375L836 117.5L812.5 158.5L789 117.5L812.5 120.375Z" fill="white"/>
      <path d="M771 113L775 107" stroke="#2D2752" strokeWidth="2"/>
      <line x1="775" y1="107" x2="775" y2="86" stroke="#2D2752" strokeWidth="2"/>
      <circle cx="775" cy="82" r="4" fill="#2D2752"/>
      <text x="796" y="180" fontSize="18" fontWeight="900" fill="#2D2752" fontFamily="Arial">Orient</text>
      <text x="851" y="180" fontSize="18" fontWeight="900" fill="#CC0000" fontFamily="Arial">AT</text>
      <text x="800" y="170" fontSize="10" fill="#2D2752" textAnchor="middle">★</text>
      <text x="825" y="170" fontSize="10" fill="#2D2752" textAnchor="middle">★</text>
    </svg>
  );
}
