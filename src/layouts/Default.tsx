import { Outlet } from 'react-router-dom'
import { BodyContainer } from '../components/Body/Body.styles'
import { Header } from '../components/Header'

export function Default() {
  return (
    <>
      <BodyContainer>
        <Header />
        <Outlet />
      </BodyContainer>
    </>
  )
}
