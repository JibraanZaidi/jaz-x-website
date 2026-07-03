import type { Metadata } from "next";
import StartProjectClient from "./StartProjectClient";

export const metadata: Metadata = {
  title: "Start Your Project | JAZ-X Innovation",
  description:
    "Start your next AI, Web, Mobile or Software project with JAZ-X Innovation.",
};

export default function StartProjectPage() {
  return <StartProjectClient />;
}
