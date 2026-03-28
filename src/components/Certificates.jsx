import { motion } from "framer-motion";
import { ExternalLink, Award } from "lucide-react";

export default function Certificates({ certificates }) {
  if (!certificates?.length) return null;

  return (
    <div className="grid sm:grid-cols-2 gap-6">
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
          className="group relative rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            transition: "border-color 0.3s, box-shadow 0.3s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "rgba(129,140,248,0.35)";
            e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.35), 0 0 0 1px rgba(129,140,248,0.15)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          {/* Certificate image */}
          <div
            className="relative overflow-hidden"
            style={{ height: "180px", background: "rgba(255,255,255,0.02)" }}
          >
            <img
              src={photo}
              alt={title}
              className="w-full h-full object-contain p-4 transition-transform duration-400 group-hover:scale-[1.03]"
            />
            {/* Gradient overlay on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: "linear-gradient(135deg, rgba(129,140,248,0.08), rgba(34,211,238,0.04))",
              }}
            />
          </div>

          {/* Info */}
          <div
            className="flex-1 p-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Issuer logo — show naturally; the namastedev.webp has its own branding */}
            <div className="flex items-center justify-between mb-3">
              <div
                className="rounded-lg px-2 py-1"
                style={{ background: "rgba(255,255,255,0.08)", display: "inline-flex" }}
              >
                <img
                  src={issuer}
                  alt="Issuer"
                  className="h-7 object-contain"
                />
              </div>
              <ExternalLink
                size={14}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ color: "var(--accent-indigo)" }}
              />
            </div>

            <h3
              className="text-base font-bold mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              {title}
            </h3>

            {/* Credential ID */}
            <div className="flex items-center gap-2">
              <Award size={13} style={{ color: "var(--accent-indigo)" }} />
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>
                Credential ID:{" "}
              </span>
              <code
                className="text-xs font-mono px-2 py-0.5 rounded"
                style={{
                  background: "rgba(129,140,248,0.1)",
                  border: "1px solid rgba(129,140,248,0.2)",
                  color: "var(--accent-indigo)",
                }}
              >
                {credentialId}
              </code>
            </div>
          </div>
        </motion.a>
      ))}
    </div>
  );
}
