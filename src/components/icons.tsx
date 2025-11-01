import type { SVGProps } from 'react';

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
        <path d="M12 21c-4.2 0-8-3.2-8-7.5c0-4.2 8-11.5 8-11.5s8 7.3 8 11.5c0 4.3-3.8 7.5-8 7.5Z" className="fill-primary stroke-primary" />
        <path d="M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" className="fill-background stroke-background" />
        <path d="M14.12 14.12a3 3 0 1 0-4.24-4.24" className="stroke-primary" />
        <path d="M16.24 16.24a6 6 0 1 0-8.48-8.48" className="stroke-primary"/>
    </svg>
  );
}
