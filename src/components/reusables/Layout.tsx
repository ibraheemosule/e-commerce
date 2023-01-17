import Link from "next/link";
import { ReactElement } from "react";

interface ILayout {
  children: ReactElement;
}

export default function Layout({ children }: ILayout) {
  return (
    <main>
      <nav>
        <Link href="/">home</Link> | <Link href="/about/about">2 abouts</Link> |
        <Link href="/about">about</Link>
      </nav>
      {children}
    </main>
  );
}
