import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

type GoogleAdBlockProps = {
  slot: string;                        // your AdSense slot ID
  test?: boolean;                      // true = test ads in dev
  style?: React.CSSProperties;         // optional inline styles
  className?: string;                  // optional class
};

export default function GoogleAdBlock({
  slot,
  test = false,
  style,
  className,
}: GoogleAdBlockProps) {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // ignore if not ready yet
    }
  }, []);

  return (
    <div
      className={["ad-container", className].filter(Boolean).join(" ")}
      style={{ minHeight: 180, display: "flex", justifyContent: "center", margin: "24px 0", ...style }}
    >
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-6497160008225356"
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(test ? { "data-adtest": "on" } : {})}
      />
    </div>
  );
}
