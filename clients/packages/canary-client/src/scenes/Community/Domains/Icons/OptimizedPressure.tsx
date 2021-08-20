import React from "react";

const Icon: React.FC = () => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
			width="109"
			height="87"
			fill="none"
			viewBox="0 0 90 87"
		>
			<path
				fill="#50E3C2"
				d="M55.947 67.79C74.754 67.79 90 52.616 90 33.896 90 15.175 74.754 0 55.947 0 37.141 0 21.895 15.175 21.895 33.895c0 18.72 15.247 33.896 34.053 33.896z"
				opacity="0.297"
			></path>
			<path
				fill="#50E3C2"
				d="M55.799 60.893c15.045 0 27.242-12.14 27.242-27.116 0-14.976-12.197-27.116-27.242-27.116-15.045 0-27.242 12.14-27.242 27.116 0 14.976 12.197 27.116 27.242 27.116z"
				opacity="0.3"
			></path>
			<path
				fill="#50E3C2"
				d="M55.649 53.996c11.284 0 20.431-9.105 20.431-20.337S66.933 13.32 55.65 13.32c-11.285 0-20.432 9.106-20.432 20.338 0 11.232 9.147 20.337 20.432 20.337z"
			></path>
			<path
				fill="url(#pattern0)"
				d="M0 13.944H72.254V86.19800000000001H0z"
			></path>
			<defs>
				<pattern
					id="pattern0"
					width="1"
					height="1"
					patternContentUnits="objectBoundingBox"
				>
					<use transform="scale(.00195)" xlinkHref="#image0"></use>
				</pattern>
				<image
					id="image0"
					width="512"
					height="512"
					xlinkHref="data:image/png;base64,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"
				></image>
			</defs>
		</svg>
	);
}

Icon.displayName = 'OptimizedPressure';

export default Icon;
