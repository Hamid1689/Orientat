import { C } from "../constants/colors";

export default function Logo({ size = 38 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="60" cy="60" r="58" fill={C.purple}/>
      <circle cx="60" cy="60" r="58" fill="none" stroke={C.red} strokeWidth="3"/>
      <polygon points="60,18 104,44 60,54 16,44" fill={C.white}/>
      <rect x="57.5" y="54" width="5" height="18" fill={C.white}/>
      <circle cx="60" cy="75" r="4" fill={C.white}/>
      <polygon points="36,57 60,90 84,57 78,57 60,80 42,57" fill={C.red}/>
      <text x="26" y="70" fontSize="10" fill={C.white} textAnchor="middle">★</text>
      <text x="94" y="70" fontSize="10" fill={C.white} textAnchor="middle">★</text>
      <circle cx="60" cy="36" r="9" fill={C.red}/>
      <circle cx="60" cy="36" r="6" fill={C.white}/>
      <circle cx="60" cy="36" r="3" fill={C.purple}/>
    </svg>
  );
}
