import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 客户开发助手",
  description: "面向美国内衣与服装客户的 B2B 智能获客平台",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
