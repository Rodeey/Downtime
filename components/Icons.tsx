import * as React from "react";
type Props = React.SVGProps<SVGSVGElement> & { size?: number };

export const MapIcon = ({ size = 22, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M9 18l-6 3V6l6-3 6 3 6-3v15l-6 3-6-3z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M9 3v15M15 6v15" stroke="currentColor" strokeWidth="1.5" />
  </svg>
);
export const ListIcon = ({ size = 22, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M8 6h12M8 12h12M8 18h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    <circle cx="4" cy="6" r="1.5" fill="currentColor"/>
    <circle cx="4" cy="12" r="1.5" fill="currentColor"/>
    <circle cx="4" cy="18" r="1.5" fill="currentColor"/>
  </svg>
);
export const DirectionsIcon = ({ size = 18, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 12l-9 9-9-9 9-9 9 9z" stroke="currentColor" strokeWidth="1.5" />
    <path d="M12 7v10M12 7l-3 3M12 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);
export const GoogleIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 18 18" {...props}>
    <path fill="#4285F4" d="M17.64 9.2045c0-.638-.0573-1.251-.1636-1.836H9v3.472h4.844c-.2093 1.128-.843 2.083-1.798 2.725v2.257h2.908c1.702-1.568 2.686-3.877 2.686-6.618z"/>
    <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.177l-2.908-2.257c-.806.54-1.838.861-3.048.861-2.345 0-4.33-1.583-5.036-3.71H.957v2.332C2.438 15.983 5.481 18 9 18z"/>
    <path fill="#FBBC05" d="M3.964 10.717A5.41 5.41 0 0 1 3.664 9c0-.597.103-1.178.3-1.717V4.95H.957A9.003 9.003 0 0 0 0 9c0 1.45.348 2.819.957 4.05l3.007-2.333z"/>
    <path fill="#EA4335" d="M9 3.58c1.319 0 2.507.454 3.44 1.346l2.58-2.58C13.463.84 11.426 0 9 0 5.481 0 2.438 2.017.957 4.95l3.007 2.333C4.67 5.156 6.655 3.58 9 3.58z"/>
  </svg>
);
export const YelpIcon = ({ size = 16, ...props }: Props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size * 1.8} // a bit wider for spacing
    height={size}
    viewBox="0 0 100 30"
    {...props}
  >
    <text
      x="50%"
      y="50%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontFamily="Arial, Helvetica, sans-serif"
      fontWeight="bold"
      fontSize="32"
      fill="#d32323"
    >
      Yelp
    </text>
  </svg>
);





export const TikTokIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M19.6 7.6a6.6 6.6 0 0 1-3.9-1.3v7.1a5.4 5.4 0 1 1-5.3-5.4c.3 0 .6 0 .9.1v2.4c-.3-.1-.6-.2-.9-.2a2.9 2.9 0 1 0 2.9 2.9V2h2.6c.3 1 1 2 1.8 2.7a4 4 0 0 0 1.9.9v2z"/>
  </svg>
);
export const GlobeIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 2c1.6 0 3.1.5 4.3 1.4l-1 .7.6 1.5-1.5.6-.6 1.5-1.5-.6-.6-1.5-1.5-.6.6-1.5-1-.7A7.99 7.99 0 0112 4zm0 16a8 8 0 01-7.1-4l1.8-.7.8-1.4 1.6.4.9-1.3 1.3.9 1.4-.5.4 1.6 1.5.6.2 1.6 1.5.6c-.9 1.1-2.4 1.8-4.1 1.8z"/>
  </svg>
);
export const PhoneIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 006.6 6.6l2.2-2.2c.3-.3.7-.4 1.1-.3 1.2.4 2.5.6 3.8.6.6 0 1 .4 1 .9v3.5c0 .6-.4 1-1 1C10.5 21.9 2.1 13.5 2.1 3.7c0-.6.4-1 1-1H6.6c.5 0 .9.4.9 1 0 1.3.2 2.6.6 3.8.1.4 0 .8-.3 1.1l-2.2 2.2z"/>
  </svg>
);

/* Category pictograms */
export const ForkKnife = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M7 2c-.6 0-1 .4-1 1v6c0 .6-.4 1-1 1H4v2h5V2H7zm7 0v10h2V8h2V6h-2V3c0-.6-.4-1-1-1h-1z"/>
  </svg>
);
export const TreeIcon = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M12 2l6 10h-4l4 8h-6v-4h-2v4H4l4-8H4L12 2z"/>
  </svg>
);
export const BagIcon = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M7 7V6a5 5 0 0110 0v1h2a2 2 0 012 2v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9a2 2 0 012-2h2zm2 0h6V6a3 3 0 00-6 0v1z"/>
  </svg>
);
export const MasksIcon = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M3 4l8-2 8 2v6c0 5-3.6 8.6-8 10-4.4-1.4-8-5-8-10V4zm4 6h2v2H7v-2zm8 0h2v2h-2v-2z"/>
  </svg>
);
export const DiceIcon = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="4" fill="currentColor"/><circle cx="8" cy="8" r="1.5" fill="#111"/><circle cx="16" cy="8" r="1.5" fill="#111"/><circle cx="8" cy="16" r="1.5" fill="#111"/><circle cx="16" cy="16" r="1.5" fill="#111"/>
  </svg>
);
export const MugIcon = ({ size = 14, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path fill="currentColor" d="M4 6h10a2 2 0 012 2v8a4 4 0 01-4 4H8a4 4 0 01-4-4V6zm12 2h2a3 3 0 010 6h-2V8z"/>
  </svg>
);


export const WalkIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M13 5a2 2 0 11-4 0 2 2 0 014 0z" fill="currentColor"/>
    <path d="M7 22l2-6 2-3 2 2 2 7" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 10l3 1 2-2" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
export const CarIcon = ({ size = 16, ...props }: Props) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...props}>
    <path d="M3 12l2-5a2 2 0 011.9-1.3h10.2a2 2 0 011.9 1.3l2 5v6a1 1 0 01-1 1h-1a2 2 0 01-2-2v-1H7v1a2 2 0 01-2 2H4a1 1 0 01-1-1v-6z" stroke="currentColor" strokeWidth="1.4" fill="none"/>
    <circle cx="8" cy="17" r="1.6" fill="currentColor"/><circle cx="16" cy="17" r="1.6" fill="currentColor"/>
    <path d="M4 12h16" stroke="currentColor" strokeWidth="1.2"/>
  </svg>
);
