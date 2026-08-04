import type { SVGProps } from "react"

export default function ArrowLeftIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" focusable="false" {...props} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  )
}
