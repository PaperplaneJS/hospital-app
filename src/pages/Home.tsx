import { Button, Input } from '@mui/material'

export default function Home(): RC {
  return (
    <div>
      <div>FE Deploy Success!</div>
      <div>
        <Button variant="contained">UI Test</Button>
      </div>
      <div>
        <Input value={'TEST'} />
      </div>
    </div>
  )
}
