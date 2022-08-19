import { Route, Routes } from 'react-router-dom'

import { Default } from './layouts/Default'

import { History } from './pages/History'

import { Home } from './pages/Home'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Route>
    </Routes>
  )
}
