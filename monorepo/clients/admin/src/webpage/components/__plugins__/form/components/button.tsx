import type { Mobilization } from "../../../../reducers";

interface ButtonProperties {
  mobilization: Mobilization
  // eslint-disable-next-line react/require-default-props
  handleClick?: () => void
  buttonText: React.ReactElement | string
}

const Button = ({
  buttonText,
  handleClick,
  mobilization: { body_font: bodyFont }
}: ButtonProperties): React.ReactElement => (
  <div style={{ fontFamily: bodyFont }}>
    <button
      type="button"
      className='caps btn bg-darken-4 p2 col-12 mt1 mb2 rounded white'
      onClick={handleClick}>
      {buttonText}
    </button>
  </div>
)

export default Button
