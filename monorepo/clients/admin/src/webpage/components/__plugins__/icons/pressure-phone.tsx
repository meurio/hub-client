/* eslint-disable */


export default ({ size }) => (
    <svg width={size || '39'} height={size || '37'} viewBox='0 0 39 37' xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'>
        <defs>
            <path d='M12.5,10 C17.65625,10 21.875,14.05 21.875,19 C21.875,23.95 17.65625,28 12.5,28 C7.34375,28 3.125,23.95 3.125,19 C3.125,14.05 7.34375,10 12.5,10 L12.5,10 Z M12.5,7 C5.625,7 0,12.4 0,19 C0,25.5999992 5.625,31 12.5,31 C19.375,31 25,25.5999992 25,19 C25,12.4 19.375,7 12.5,7 L12.5,7 L12.5,7 Z'
                id='path-1' />
            <filter x='-20%' y='-20.8%' width='156%' height='158.3%' filterUnits='objectBoundingBox'
                id='filter-2'>
                <feMorphology radius='1' operator='dilate' in='SourceAlpha' result='shadowSpreadOuter1'>
                    <feOffset dx='2' dy='2' in='shadowSpreadOuter1' result='shadowOffsetOuter1'>
                        <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'>
                            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0' in='shadowBlurOuter1'
                            />
                        </feGaussianBlur>
                    </feOffset>
                </feMorphology>
            </filter>
            <path d='M13,16 C14.65,16 16,17.35 16,19 C16,20.65 14.65,22 13,22 C11.35,22 10,20.65 10,19 C10,17.35 11.35,16 13,16 L13,16 Z M13,13 C9.7,13 7,15.7 7,19 C7,22.3 9.7,25 13,25 C16.3,25 19,22.3 19,19 C19,15.7 16.3,13 13,13 L13,13 L13,13 Z'
                id='path-3' />
            <filter x='-41.7%' y='-41.7%' width='216.7%' height='216.7%' filterUnits='objectBoundingBox'
                id='filter-4'>
                <feMorphology radius='1' operator='dilate' in='SourceAlpha' result='shadowSpreadOuter1'>
                    <feOffset dx='2' dy='2' in='shadowSpreadOuter1' result='shadowOffsetOuter1'>
                        <feGaussianBlur stdDeviation='1' in='shadowOffsetOuter1' result='shadowBlurOuter1'>
                            <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.17 0' in='shadowBlurOuter1'
                            />
                        </feGaussianBlur>
                    </feOffset>
                </feMorphology>
            </filter>
        </defs>
        <g id='Symbols' fill='none' fillRule='evenodd'>
            <g id='Block-choose' transform='translate(-214 -287)'>
                <g id='Group' transform='translate(216 287)'>
                    <path d='M35.5151247,18.9828435 L31.8003009,15.2676051 C31.0603768,14.5306526 29.8350482,14.5530431 29.0693474,15.3190204 L27.1978032,17.1901499 C27.0795618,17.1249824 26.9571741,17.0569124 26.8284976,16.9846961 C25.6466371,16.3298422 24.0290595,15.432286 22.3268955,13.7288781 C20.6196868,12.0218767 19.7213013,10.4018113 19.0644434,9.21919055 C18.9951295,9.09390033 18.9287181,8.97310204 18.8631359,8.85838513 L20.119217,7.60416995 L20.7367533,6.98587345 C21.5036289,6.2187905 21.5247756,4.9938074 20.7865791,4.25471261 L17.0717554,0.539059548 C16.333559,-0.198998643 15.1076775,-0.176608114 14.3408018,0.590474837 L13.2938373,1.64345168 L13.3224474,1.67185448 C12.971386,2.11980328 12.6780286,2.63644401 12.4597209,3.1935812 C12.2584826,3.72390503 12.1331924,4.22997246 12.075903,4.73707649 C11.5853846,8.80358362 13.4436603,12.520066 18.4867815,17.5632563 C25.457907,24.533898 31.0757185,24.0073059 31.3180752,23.9815983 C31.8459112,23.918504 32.3517713,23.7923845 32.8658551,23.5927356 C33.4181548,23.3769849 33.93445,23.0840421 34.3821224,22.7337409 L34.4049967,22.7540582 L35.4656444,21.7154556 C36.2309305,20.9485108 36.2529755,19.7231131 35.5151247,18.9828435 Z'
                        id='Shape' fill='#FFF' fillRule='nonzero' />
                    <g id='Fill-1'>
                        <use fill='#000' filter='url(#filter-2)' xlinkHref='#path-1' />
                        <use fill='#FFF' xlinkHref='#path-1' />
                    </g>
                    <g id='Fill-3'>
                        <use fill='#000' filter='url(#filter-4)' xlinkHref='#path-3' />
                        <use fill='#FFF' xlinkHref='#path-3' />
                    </g>
                </g>
            </g>
        </g>
    </svg>
)
