import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { MutableRefObject, RefObject } from "react";
import { motion } from "framer-motion";
import { HUB_CENTER_ITEMS, HUB_LEFT_NODES, HUB_RIGHT_NODES } from "../../data/homeCopy";

// --- layout / drawing ---

const GLOW_SEGMENT_RATIO = 0.28;

/** Smooth cubic between two points; works for left→right and right→left. */
function cubicPath(x1: number, y1: number, x2: number, y2: number): string {
  const horizontal = Math.abs(x2 - x1) * 0.55;
  const sx = Math.sign(x2 - x1) || 1;
  const cx1 = x1 + sx * horizontal;
  const cx2 = x2 - sx * horizontal;
  return `M ${x1} ${y1} C ${cx1} ${y1}, ${cx2} ${y2}, ${x2} ${y2}`;
}

type MindMapPath = {
  d: string;
  timingIndex: number;
};

type PathTiming = {
  delay: number;
  duration: number;
  repeatDelay: number;
};

function collectMindMapPaths(
  containerRect: DOMRect,
  centerRect: DOMRect,
  leftNodes: (HTMLElement | null)[],
  rightNodes: (HTMLElement | null)[]
): MindMapPath[] {
  const cx = containerRect.left;
  const cy = containerRect.top;
  const centerY = centerRect.top + centerRect.height / 2 - cy;
  const paths: MindMapPath[] = [];

  leftNodes.forEach((el, i) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x1 = r.right - cx;
    const y1 = r.top + r.height / 2 - cy;
    const x2 = centerRect.left - cx;
    paths.push({
      d: cubicPath(x1, y1, x2, centerY),
      timingIndex: i,
    });
  });

  const leftCount = HUB_LEFT_NODES.length;
  rightNodes.forEach((el, i) => {
    if (!el) return;
    const r = el.getBoundingClientRect();
    // Path runs right card → hub (same dash direction as left: inward along path)
    const x1 = r.left - cx;
    const y1 = r.top + r.height / 2 - cy;
    const x2 = centerRect.right - cx;
    paths.push({
      d: cubicPath(x1, y1, x2, centerY),
      timingIndex: leftCount + i,
    });
  });

  return paths;
}

function createPathTimings(count: number): PathTiming[] {
  return Array.from({ length: count }, () => ({
    delay: Math.random() * 3,
    duration: Math.random() * 1.5 + 1.8,
    repeatDelay: Math.random() * 1.5 + 0.5,
  }));
}

// --- animated connector ---

type AnimatedPathProps = {
  d: string;
  delay: number;
  duration: number;
  repeatDelay: number;
};

function AnimatedPath({ d, delay, duration, repeatDelay }: AnimatedPathProps) {
  const measureRef = useRef<SVGPathElement | null>(null);
  const [pathLen, setPathLen] = useState(0);

  useLayoutEffect(() => {
    const el = measureRef.current;
    if (!el) return;
    setPathLen(el.getTotalLength());
  }, [d]);

  const segLen = pathLen > 0 ? pathLen * GLOW_SEGMENT_RATIO : 0;
  const gapRest = pathLen > 0 ? pathLen - segLen : 0;

  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke="var(--border)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        ref={measureRef}
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={0}
        aria-hidden
      />
      {pathLen > 0 && (
        <motion.path
          d={d}
          fill="none"
          stroke="url(#glowGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          style={{
            strokeDasharray: `${segLen} ${gapRest}`,
          }}
          initial={{ strokeDashoffset: pathLen }}
          animate={{ strokeDashoffset: -pathLen }}
          transition={{
            duration,
            delay,
            ease: "linear",
            repeat: Infinity,
            repeatDelay,
          }}
        />
      )}
    </g>
  );
}

// --- nodes ---

type NodeCardProps = {
  label: string;
};

function NodeCard({ label }: NodeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      className="cursor-default select-none whitespace-nowrap rounded-[10px]  bg-[var(--card-elevated-bg)] px-4 py-2 text-[13px] font-normal tracking-tight text-muted ring-1 ring-inset ring-[var(--card-elevated-border)] transition-colors duration-200 hover:border-border-hover"
    >
      {label}
    </motion.div>
  );
}

type HubNode = { id: string; label: string };

type NodeColumnProps = {
  side: "left" | "right";
  nodes: readonly HubNode[];
  nodeRefs: MutableRefObject<(HTMLDivElement | null)[]>;
};

function NodeColumn({ side, nodes, nodeRefs }: NodeColumnProps) {
  const isLeft = side === "left";
  return (
    <div
      className={`absolute flex flex-col justify-around ${isLeft ? "" : "items-end"}`}
      style={
        isLeft
          ? { left: 0, top: 40, bottom: 40, width: 220 }
          : { right: 0, top: 40, bottom: 40, width: 230 }
      }
    >
      {nodes.map((node, i) => (
        <motion.div
          key={node.id}
          ref={(el) => {
            nodeRefs.current[i] = el;
          }}
          initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 * i + 0.2, duration: 0.5, ease: "easeOut" }}
          className={
            isLeft
              ? "inline-flex items-center self-start"
              : "inline-flex items-center self-end"
          }
        >
          <NodeCard label={node.label} />
        </motion.div>
      ))}
    </div>
  );
}

function CenterHubCard({ centerRef }: { centerRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      className="absolute"
      style={{
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 2,
      }}
    >
      <motion.div
        ref={centerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex w-[280px] flex-col gap-1 rounded-[14px] border border-border bg-[var(--card-elevated-bg)] p-1.5 shadow-[var(--project-card-shadow-idle)] ring-1 ring-inset ring-[var(--card-elevated-border)]"
      >
        {HUB_CENTER_ITEMS.map((item, i) => (
          <motion.div
            key={item.num}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.12, duration: 0.4 }}
            className="flex cursor-pointer items-center gap-3 rounded-[10px] px-3.5 py-2.5 transition-colors duration-200 hover:bg-surface-hover"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border bg-[var(--tag-pill-bg)] text-[11px] font-medium text-muted">
              {item.num}
            </span>
            <span className="text-sm tracking-tight text-foreground">{item.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

function ConnectorsSvg({
  paths,
  timings,
}: {
  paths: MindMapPath[];
  timings: MutableRefObject<PathTiming[]>;
}) {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
      <defs>
        <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="25%" stopColor="var(--accent-indigo)" stopOpacity="0.35" />
          <stop offset="45%" stopColor="var(--accent-indigo)" stopOpacity="1" />
          <stop offset="55%" stopColor="var(--accent-cyan)" stopOpacity="1" />
          <stop offset="75%" stopColor="var(--accent-cyan)" stopOpacity="0.35" />
          <stop offset="100%" stopColor="transparent" />
        </linearGradient>
      </defs>
      {paths.length > 0
        ? paths.map((p) => {
            const t = timings.current[p.timingIndex];
            return (
              <AnimatedPath
                key={`conn-${p.timingIndex}`}
                d={p.d}
                delay={t?.delay ?? 0}
                duration={t?.duration ?? 2.2}
                repeatDelay={t?.repeatDelay ?? 0.8}
              />
            );
          })
        : null}
    </svg>
  );
}

// --- root ---

const PATH_TIMING_COUNT = HUB_LEFT_NODES.length + HUB_RIGHT_NODES.length;

export default function FrontendConceptsMindMap() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const centerRef = useRef<HTMLDivElement | null>(null);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [paths, setPaths] = useState<MindMapPath[]>([]);
  const timings = useRef<PathTiming[]>(createPathTimings(PATH_TIMING_COUNT));

  useEffect(() => {
    function computePaths() {
      const container = containerRef.current;
      const center = centerRef.current;
      if (!container || !center) return;

      setPaths(
        collectMindMapPaths(
          container.getBoundingClientRect(),
          center.getBoundingClientRect(),
          leftRefs.current,
          rightRefs.current
        )
      );
    }

    const t = window.setTimeout(computePaths, 80);
    window.addEventListener("resize", computePaths);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("resize", computePaths);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-center text-foreground">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{ maxWidth: 960, height: 520 }}
      >
        <ConnectorsSvg paths={paths} timings={timings} />

        <NodeColumn side="left" nodes={HUB_LEFT_NODES} nodeRefs={leftRefs} />
        <CenterHubCard centerRef={centerRef} />
        <NodeColumn side="right" nodes={HUB_RIGHT_NODES} nodeRefs={rightRefs} />
      </div>
    </div>
  );
}
