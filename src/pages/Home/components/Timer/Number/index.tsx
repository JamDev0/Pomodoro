import { NumberContainer } from './Number.styles'

interface NumberProps {
  text: string
}

export function Number({ text }: NumberProps) {
  return <NumberContainer>{text}</NumberContainer>
}
