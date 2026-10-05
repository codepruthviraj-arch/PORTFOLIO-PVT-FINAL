import { useNavigate, useRouterState } from "@tanstack/react-router";
import type { MouseEvent, ReactNode } from "react";
import { scroller } from "react-scroll";

type SectionLinkProps = {
  to: string;
  className?: string;
  onClick?: () => void;
  children: ReactNode;
};

export function SectionLink({ to, className, onClick, children }: SectionLinkProps) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const navigate = useNavigate();

  return (
    <a
      href={pathname === "/" ? `#${to}` : `/#${to}`}
      className={className}
      onClick={(event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        onClick?.();

        void navigate({ to: "/", hash: to, resetScroll: false }).then(() => {
          scroller.scrollTo(to, { smooth: true, duration: 600, offset: -96 });
        });
      }}
    >
      {children}
    </a>
  );
}
