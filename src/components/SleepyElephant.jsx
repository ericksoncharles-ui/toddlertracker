import '../styles/SleepyElephant.css'

function SleepyElephant({ size = 'large', animated = true }) {
  return (
    <div className={`sleepy-elephant-container ${size} ${animated ? 'animated' : ''}`}>
      <svg
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        className="sleepy-elephant"
      >
        {/* Left Ear */}
        <ellipse
          cx="70"
          cy="60"
          rx="35"
          ry="50"
          fill="#E8D4F8"
          className="ear left-ear"
        />
        <ellipse
          cx="70"
          cy="70"
          rx="22"
          ry="35"
          fill="#D4B5F0"
          className="ear-inner left-ear-inner"
        />

        {/* Right Ear */}
        <ellipse
          cx="130"
          cy="60"
          rx="35"
          ry="50"
          fill="#E8D4F8"
          className="ear right-ear"
        />
        <ellipse
          cx="130"
          cy="70"
          rx="22"
          ry="35"
          fill="#D4B5F0"
          className="ear-inner right-ear-inner"
        />

        {/* Head */}
        <circle
          cx="100"
          cy="100"
          r="45"
          fill="#D4B5F0"
          className="head"
        />

        {/* Snout/Face area */}
        <ellipse
          cx="100"
          cy="115"
          rx="30"
          ry="25"
          fill="#E8D4F8"
          className="snout"
        />

        {/* Trunk */}
        <path
          d="M 100 135 Q 95 155 90 170 Q 88 175 92 177 Q 97 175 99 170 Q 104 155 110 135 Z"
          fill="#C9A0E8"
          className="trunk"
        />

        {/* Trunk tip curl */}
        <path
          d="M 90 170 Q 75 175 70 165"
          stroke="#C9A0E8"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          className="trunk-curl"
        />

        {/* Left Eye (Closed/Sleepy) */}
        <g className="left-eye">
          {/* Eye closed line */}
          <path
            d="M 85 95 Q 85 100 90 100"
            stroke="#4A3F5C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="eyelash"
          />
          {/* Eyelid top */}
          <path
            d="M 80 92 Q 85 90 90 92"
            stroke="#4A3F5C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Right Eye (Closed/Sleepy) */}
        <g className="right-eye">
          {/* Eye closed line */}
          <path
            d="M 110 95 Q 110 100 115 100"
            stroke="#4A3F5C"
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            className="eyelash"
          />
          {/* Eyelid top */}
          <path
            d="M 110 92 Q 115 90 120 92"
            stroke="#4A3F5C"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
        </g>

        {/* Cute nose */}
        <ellipse
          cx="100"
          cy="108"
          rx="4"
          ry="5"
          fill="#4A3F5C"
          className="nose"
        />

        {/* Sleepy blush marks */}
        <circle
          cx="70"
          cy="105"
          r="6"
          fill="#F0B8D8"
          opacity="0.7"
          className="blush left-blush"
        />
        <circle
          cx="130"
          cy="105"
          r="6"
          fill="#F0B8D8"
          opacity="0.7"
          className="blush right-blush"
        />

        {/* Body */}
        <ellipse
          cx="100"
          cy="170"
          rx="40"
          ry="45"
          fill="#E8D4F8"
          className="body"
        />

        {/* Left Front Leg */}
        <rect
          x="75"
          y="190"
          width="15"
          height="35"
          rx="8"
          fill="#D4B5F0"
          className="leg left-leg"
        />

        {/* Right Front Leg */}
        <rect
          x="110"
          y="190"
          width="15"
          height="35"
          rx="8"
          fill="#D4B5F0"
          className="leg right-leg"
        />

        {/* Tail */}
        <path
          d="M 135 160 Q 155 150 160 130"
          stroke="#C9A0E8"
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          className="tail"
        />

        {/* Tail tuft */}
        <circle
          cx="165"
          cy="125"
          r="5"
          fill="#F0B8D8"
          className="tail-tuft"
        />

        {/* Peaceful expression - small smile */}
        <path
          d="M 95 120 Q 100 123 105 120"
          stroke="#4A3F5C"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          className="smile"
        />

        {/* Zzz sleep symbols */}
        <g className="zzz-marks">
          <text x="30" y="50" fontSize="24" fontWeight="bold" fill="#A78BD8" opacity="0.6">
            z
          </text>
          <text x="155" y="40" fontSize="20" fontWeight="bold" fill="#A78BD8" opacity="0.5">
            z
          </text>
          <text x="20" y="100" fontSize="18" fontWeight="bold" fill="#A78BD8" opacity="0.4">
            z
          </text>
        </g>
      </svg>
    </div>
  )
}

export default SleepyElephant
