import CountUp from 'react-countup'

interface PressureCountProperties {
  value?: number;
  color: string;
  text?: string;
  startCounting?: boolean;
}

const PressureCount = ({
  value = 0,
  color,
  text = 'pressões feitas',
  startCounting = false
}: PressureCountProperties): React.ReactElement => {
  /* TODO: support all browser
   * -webkit-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * -moz-box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   * box-shadow: inset 0px 15px 18px -10px rgba(227,224,227,1);
   */
  const pressureCount = {
    boxShadow: 'inset 0px 15px 18px -10px rgba(227,224,227,1)'
  }

  return (
    <div className='pressure-count p3 bg-white rounded-bottom' style={pressureCount}>
      <div className='center m0'>
        <div className='h1' style={{ color }}>
          <CountUp
            start={0}
            end={value !== undefined && startCounting ? Number(value) : 0}
            duration={5}
          />
        </div>
        <span className='black bold h3 ml1'>
          {text}
        </span>
      </div>
    </div>
  )
}

export default PressureCount
