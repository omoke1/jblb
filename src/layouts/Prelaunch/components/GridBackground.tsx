const GridBackground = () => {
  return (
    <svg
      className="absolute top-[-100px] inset-0 w-full h-[130vh] sm:h-[150vh] md:h-[130vh]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Grid pattern */}
        <pattern id="grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <rect
            width="36"
            height="36"
            stroke="#A9EF2E"
            strokeWidth="0.5"
            fill="none"
            opacity="0.6"
          />
        </pattern>

        {/* Fade-out mask */}
        <linearGradient id="fadeMask" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="25%" stopColor="white" stopOpacity="1" />
          <stop offset="75%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id="mask" maskUnits="objectBoundingBox">
          <rect width="100%" height="100%" fill="url(#fadeMask)" />
        </mask>
      </defs>

      {/* Apply the fade mask to the grid */}
      <rect
        width="100%"
        height="100%"
        fill="url(#grid)"
        mask="url(#mask)"
      />
    </svg>
  );
};

export default GridBackground;
