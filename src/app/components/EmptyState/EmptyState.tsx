export const EmptyState = () => {
  return (
    <div className="flex flex-col justify-center items-center flex-grow text-neutral-800 py-4 px-8">
      <Illustration />
      <h3 className="text-lg font-medium mt-10">Start by adding time entries</h3>
      <p className="mt-2 text-center">
        Type in task description at the top to add new entry. Jira task number will be automatically changed to link.
      </p>
    </div>
  );
};

const Illustration = () => {
  return (
    <svg
      width="200"
      height="140"
      viewBox="0 0 200 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M162 0H42C36.4772 0 32 4.47715 32 10V130C32 135.523 36.4772 140 42 140H162C167.523 140 172 135.523 172 130V10C172 4.47715 167.523 0 162 0Z"
        fill="url(#paint0_linear_1_301)"
      />
      <g filter="url(#filter0_d_1_301)">
        <path
          d="M146 10H11C8.23858 10 6 12.2386 6 15V40C6 42.7614 8.23858 45 11 45H146C148.761 45 151 42.7614 151 40V15C151 12.2386 148.761 10 146 10Z"
          fill="white"
        />
      </g>
      <path
        d="M75 18H49C47.3431 18 46 19.3431 46 21C46 22.6569 47.3431 24 49 24H75C76.6569 24 78 22.6569 78 21C78 19.3431 76.6569 18 75 18Z"
        fill="#B4DAFF"
      />
      <path
        d="M93 31H49C47.3431 31 46 32.3431 46 34C46 35.6569 47.3431 37 49 37H93C94.6569 37 96 35.6569 96 34C96 32.3431 94.6569 31 93 31Z"
        fill="#DEE9FC"
      />
      <path
        d="M33 13H14C11.2386 13 9 15.2386 9 18V37C9 39.7614 11.2386 42 14 42H33C35.7614 42 38 39.7614 38 37V18C38 15.2386 35.7614 13 33 13Z"
        fill="#1485FD"
      />
      <path
        d="M30 19H18C17.2044 19 16.4413 19.3161 15.8787 19.8787C15.3161 20.4413 15 21.2044 15 22V34C15 34.7956 15.3161 35.5587 15.8787 36.1213C16.4413 36.6839 17.2044 37 18 37H30C30.7956 37 31.5587 36.6839 32.1213 36.1213C32.6839 35.5587 33 34.7956 33 34V22C33 21.2044 32.6839 20.4413 32.1213 19.8787C31.5587 19.3161 30.7956 19 30 19ZM31 34C31 34.2652 30.8946 34.5196 30.7071 34.7071C30.5196 34.8946 30.2652 35 30 35H18C17.7348 35 17.4804 34.8946 17.2929 34.7071C17.1054 34.5196 17 34.2652 17 34V22C17 21.7348 17.1054 21.4804 17.2929 21.2929C17.4804 21.1054 17.7348 21 18 21H30C30.2652 21 30.5196 21.1054 30.7071 21.2929C30.8946 21.4804 31 21.7348 31 22V34Z"
        fill="white"
      />
      <path
        d="M26.7 24.39L22.92 29.39L21.29 27.28C21.1269 27.0705 20.8872 26.9343 20.6237 26.9015C20.3603 26.8687 20.0945 26.9419 19.885 27.105C19.6755 27.2681 19.5393 27.5078 19.5065 27.7713C19.4737 28.0347 19.5469 28.3005 19.71 28.51L22.14 31.62C22.2342 31.7392 22.3543 31.8353 22.4911 31.9012C22.628 31.967 22.7781 32.0008 22.93 32C23.0827 31.9996 23.2333 31.9643 23.3703 31.8967C23.5072 31.8291 23.6268 31.731 23.72 31.61L28.29 25.61C28.4518 25.3978 28.5227 25.1301 28.487 24.8657C28.4514 24.6012 28.3122 24.3618 28.1 24.2C27.8878 24.0382 27.6201 23.9673 27.3557 24.003C27.0912 24.0386 26.8518 24.1778 26.69 24.39H26.7Z"
        fill="white"
      />
      <g filter="url(#filter1_d_1_301)">
        <path
          d="M54 53H189C190.326 53 191.598 53.5268 192.536 54.4645C193.473 55.4021 194 56.6739 194 58V83C194 84.3261 193.473 85.5979 192.536 86.5355C191.598 87.4732 190.326 88 189 88H54C52.6739 88 51.4021 87.4732 50.4645 86.5355C49.5268 85.5979 49 84.3261 49 83V58C49 56.6739 49.5268 55.4021 50.4645 54.4645C51.4021 53.5268 52.6739 53 54 53V53Z"
          fill="white"
        />
      </g>
      <path
        d="M118 61H92C90.3431 61 89 62.3431 89 64C89 65.6569 90.3431 67 92 67H118C119.657 67 121 65.6569 121 64C121 62.3431 119.657 61 118 61Z"
        fill="#B4DAFF"
      />
      <path
        d="M136 74H92C90.3431 74 89 75.3431 89 77C89 78.6569 90.3431 80 92 80H136C137.657 80 139 78.6569 139 77C139 75.3431 137.657 74 136 74Z"
        fill="#DEE9FC"
      />
      <path
        d="M76 56H57C54.2386 56 52 58.2386 52 61V80C52 82.7614 54.2386 85 57 85H76C78.7614 85 81 82.7614 81 80V61C81 58.2386 78.7614 56 76 56Z"
        fill="#1485FD"
      />
      <g filter="url(#filter2_d_1_301)">
        <path
          d="M11 96H146C147.326 96 148.598 96.5268 149.536 97.4645C150.473 98.4021 151 99.6739 151 101V126C151 127.326 150.473 128.598 149.536 129.536C148.598 130.473 147.326 131 146 131H11C9.67392 131 8.40215 130.473 7.46447 129.536C6.52678 128.598 6 127.326 6 126V101C6 99.6739 6.52678 98.4021 7.46447 97.4645C8.40215 96.5268 9.67392 96 11 96V96Z"
          fill="white"
        />
      </g>
      <path
        d="M75 104H49C47.3431 104 46 105.343 46 107C46 108.657 47.3431 110 49 110H75C76.6569 110 78 108.657 78 107C78 105.343 76.6569 104 75 104Z"
        fill="#B4DAFF"
      />
      <path
        d="M93 117H49C47.3431 117 46 118.343 46 120C46 121.657 47.3431 123 49 123H93C94.6569 123 96 121.657 96 120C96 118.343 94.6569 117 93 117Z"
        fill="#DEE9FC"
      />
      <path
        d="M33 99H14C11.2386 99 9 101.239 9 104V123C9 125.761 11.2386 128 14 128H33C35.7614 128 38 125.761 38 123V104C38 101.239 35.7614 99 33 99Z"
        fill="#1485FD"
      />
      <path
        d="M72 61H60C59.2044 61 58.4413 61.3161 57.8787 61.8787C57.3161 62.4413 57 63.2044 57 64V76C57 76.7956 57.3161 77.5587 57.8787 78.1213C58.4413 78.6839 59.2044 79 60 79H72C72.7956 79 73.5587 78.6839 74.1213 78.1213C74.6839 77.5587 75 76.7956 75 76V64C75 63.2044 74.6839 62.4413 74.1213 61.8787C73.5587 61.3161 72.7956 61 72 61ZM73 76C73 76.2652 72.8946 76.5196 72.7071 76.7071C72.5196 76.8946 72.2652 77 72 77H60C59.7348 77 59.4804 76.8946 59.2929 76.7071C59.1054 76.5196 59 76.2652 59 76V64C59 63.7348 59.1054 63.4804 59.2929 63.2929C59.4804 63.1054 59.7348 63 60 63H72C72.2652 63 72.5196 63.1054 72.7071 63.2929C72.8946 63.4804 73 63.7348 73 64V76Z"
        fill="white"
      />
      <path
        d="M68.7 66.39L64.92 71.39L63.29 69.28C63.1269 69.0705 62.8872 68.9343 62.6237 68.9015C62.3603 68.8687 62.0945 68.9419 61.885 69.105C61.6755 69.2681 61.5393 69.5078 61.5065 69.7713C61.4737 70.0347 61.5469 70.3005 61.71 70.51L64.14 73.62C64.2342 73.7392 64.3543 73.8353 64.4911 73.9012C64.628 73.967 64.7781 74.0008 64.93 74C65.0827 73.9996 65.2333 73.9643 65.3703 73.8967C65.5072 73.8291 65.6268 73.731 65.72 73.61L70.29 67.61C70.4518 67.3978 70.5227 67.1301 70.487 66.8657C70.4514 66.6012 70.3122 66.3618 70.1 66.2C69.8878 66.0382 69.6201 65.9673 69.3557 66.003C69.0912 66.0386 68.8518 66.1778 68.69 66.39H68.7Z"
        fill="white"
      />
      <path
        d="M29 105H17C16.2044 105 15.4413 105.316 14.8787 105.879C14.3161 106.441 14 107.204 14 108V120C14 120.796 14.3161 121.559 14.8787 122.121C15.4413 122.684 16.2044 123 17 123H29C29.7956 123 30.5587 122.684 31.1213 122.121C31.6839 121.559 32 120.796 32 120V108C32 107.204 31.6839 106.441 31.1213 105.879C30.5587 105.316 29.7956 105 29 105ZM30 120C30 120.265 29.8946 120.52 29.7071 120.707C29.5196 120.895 29.2652 121 29 121H17C16.7348 121 16.4804 120.895 16.2929 120.707C16.1054 120.52 16 120.265 16 120V108C16 107.735 16.1054 107.48 16.2929 107.293C16.4804 107.105 16.7348 107 17 107H29C29.2652 107 29.5196 107.105 29.7071 107.293C29.8946 107.48 30 107.735 30 108V120Z"
        fill="white"
      />
      <path
        d="M25.7 110.39L21.92 115.39L20.29 113.28C20.1269 113.07 19.8872 112.934 19.6237 112.902C19.3603 112.869 19.0945 112.942 18.885 113.105C18.6755 113.268 18.5393 113.508 18.5065 113.771C18.4737 114.035 18.5469 114.3 18.71 114.51L21.14 117.62C21.2342 117.739 21.3543 117.835 21.4911 117.901C21.628 117.967 21.7781 118.001 21.93 118C22.0827 118 22.2333 117.964 22.3703 117.897C22.5072 117.829 22.6268 117.731 22.72 117.61L27.29 111.61C27.4518 111.398 27.5227 111.13 27.487 110.866C27.4514 110.601 27.3122 110.362 27.1 110.2C26.8878 110.038 26.6201 109.967 26.3557 110.003C26.0912 110.039 25.8518 110.178 25.69 110.39H25.7Z"
        fill="white"
      />
      <defs>
        <filter
          id="filter0_d_1_301"
          x="0"
          y="7"
          width="157"
          height="47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_301"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_301"
            result="shape"
          />
        </filter>
        <filter
          id="filter1_d_1_301"
          x="43"
          y="50"
          width="157"
          height="47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_301"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_301"
            result="shape"
          />
        </filter>
        <filter
          id="filter2_d_1_301"
          x="0"
          y="93"
          width="157"
          height="47"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="3" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.161 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1_301"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1_301"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_1_301"
          x1="102"
          y1="0"
          x2="102"
          y2="140"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#E3ECFA" />
          <stop offset="1" stopColor="#DAE7FF" />
        </linearGradient>
      </defs>
    </svg>
  );
};
