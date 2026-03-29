import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";

export default function Certificates({ certificates }) {
  if (!certificates?.length) return null;

  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {certificates.map(({ title, issuer, credentialId, link, photo }, idx) => (
        <motion.a
          key={link}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -4 }}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-[border-color,box-shadow] duration-300 hover:border-[rgba(129,140,248,0.35)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.35),0_0_0_1px_rgba(129,140,248,0.15)]"
        >
          {/* Certificate image */}
          <div className="relative h-[180px] overflow-hidden bg-white/[0.02]">
            <img
              src={photo}
              alt={title}
              className="h-full w-full object-contain p-4 transition-transform duration-[400ms] group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[rgba(129,140,248,0.08)] to-[rgba(34,211,238,0.04)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>

          {/* Info */}
          <div className="flex-1 border-t border-border p-5">
            <div className="mb-3 flex items-center justify-between">
              <div className="inline-flex rounded-lg bg-white/[0.08] px-2 py-1">
                <img src={issuer} alt="Issuer" className="h-7 object-contain" />
              </div>
              <ExternalLink
                size={14}
                className="text-accent-indigo opacity-0 transition-opacity group-hover:opacity-100"
              />
            </div>

            <h3 className="mb-3 text-base font-bold text-foreground">
              {title}
            </h3>

            <div className="flex items-center gap-2">
              <Award size={13} className="text-accent-indigo" />
              <span className="text-xs text-muted">Credential ID: </span>
              <code className="rounded border border-[rgba(129,140,248,0.2)] bg-[rgba(129,140,248,0.1)] px-2 py-0.5 font-mono text-xs text-accent-indigo">
                {credentialId}
              </code>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
