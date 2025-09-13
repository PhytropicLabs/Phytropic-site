"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LinkInterceptor({
  allowedPaths = ["/finder"], // 👈 Only allow your quiz
}) {
  const router = useRouter();

  useEffect(() => {
    const handler = (e) => {
      const el = e.target.closest("a,button");
      if (!el) return;

      if (el.hasAttribute("data-allow")) return;

      if (el.tagName === "A") {
        const href = el.getAttribute("href");
        if (!href || href.startsWith("http") || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;
        if (allowedPaths.some((p) => href.startsWith(p))) return;
        e.preventDefault();
        router.push("/coming-soon");
        return;
      }

      if (el.tagName === "BUTTON") {
        e.preventDefault();
        router.push("/coming-soon");
        return;
      }
    };

    document.addEventListener("click", handler, true);
    return () => document.removeEventListener("click", handler, true);
  }, [router, allowedPaths]);

  return null;
}
