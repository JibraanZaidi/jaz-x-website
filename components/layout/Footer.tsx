import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Twitter, Youtube, ArrowRight, Facebook } from "lucide-react";

const SERVICES = [
  { label: "AI Development", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Mobile App Development", href: "/services" },
  { label: "UI / UX Design", href: "/services" },
  { label: "Custom Software", href: "/services" },
  { label: "Cloud Solutions", href: "/services" },
];

const QUICK_LINKS = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Packages", href: "/packages" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-6 md:px-16 pt-20 pb-8 mt-32">
      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.2fr] gap-12 mb-16">

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center mb-5">
            <Image
              src="/logo.png"
              alt="JAZ-X"
              width={180}
              height={55}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-6">
            JAZ-X builds AI-powered software, modern websites,
            mobile apps and scalable digital solutions that help
            businesses grow faster.
          </p>

          <div className="flex items-center gap-4 text-white/40">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-secondary transition-colors"
            >
              <Twitter size={17} />
            </a>

            <a
              href="https://www.instagram.com/jazxinnovation"
              aria-label="Instagram"
              className="hover:text-secondary transition-colors"
            >
              <Instagram size={17} />
            </a>

            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-secondary transition-colors"
            >
              <Linkedin size={17} />
            </a>

            <a
              href="https://facebook.com/JAZXInnovation"
              aria-label="Facebook"
              className="hover:text-secondary transition-colors"
            >
              <Facebook size={17} />
            </a>
          </div>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
            Services
          </h4>

          <ul className="space-y-3">
            {SERVICES.map((service) => (
              <li key={service.label}>
                <Link
                  href={service.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {service.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
            Quick Links
          </h4>

          <ul className="space-y-3">
            {QUICK_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-xs uppercase tracking-widest text-white/40 mb-5">
            Get In Touch
          </h4>

          <p className="text-sm text-white/40 mb-4">
            Have an idea? Let's build something amazing together.
          </p>

          <form className="flex items-center border border-white/10 rounded-full overflow-hidden bg-white/[0.03]">
            <input
              type="email"
              placeholder="Your Email"
              className="bg-transparent px-4 py-3 text-sm flex-1 outline-none placeholder:text-white/30"
            />

            <button
              type="submit"
              aria-label="Subscribe"
              className="w-10 h-10 flex items-center justify-center mr-1 rounded-full bg-gradient-primary text-black shrink-0"
            >
              <ArrowRight size={15} />
            </button>
          </form>

          <div className="mt-6 text-sm text-white/40 space-y-1">
            <p>jibraanali@gmail.com</p>
            <p>+92 326 4380397</p>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-white/5 text-xs text-white/30">
        <span>© 2026 JAZ-X. All Rights Reserved.</span>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hover:text-white/60 transition-colors"
          >
            Privacy Policy
          </a>

          <a
            href="#"
            className="hover:text-white/60 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}