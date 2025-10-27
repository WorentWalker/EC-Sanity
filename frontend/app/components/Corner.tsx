type RotatePosition = 'left-top' | 'right-top' | 'left-bottom' | 'right-bottom';

interface CornerProps {
  top?: number | string;
  left?: number | string;
  rotatePosition?: RotatePosition;
  color?: string;
  size?: number;
  maxWidth?: number; // Максимальная ширина экрана, при которой углы скрываются
}

function Corner({top=0, left=0, rotatePosition='left-top' as RotatePosition, color='var(--dark-green)', size=24, maxWidth }: CornerProps) {

  const rotatePositionMap: Record<RotatePosition, string> = {
    'left-top': 'rotate(0deg)',
    'right-top': 'rotate(90deg)',
    'left-bottom': 'rotate(180deg)',
    'right-bottom': 'rotate(270deg)',
  }

  return (
    <div 
      className="corner" 
      style={{
        display: 'flex',
        position: 'absolute',
        width: size,
        height: size,
        top: top,
        left: left,
        backgroundColor: color,
        transform: rotatePositionMap[rotatePosition],
        clipPath: `path("M 0 0 L ${size} 0 Q 0 0 0 ${size} Z")`,
      }}
      data-max-width={maxWidth}
    >
    </div>
  )
}

export default Corner
