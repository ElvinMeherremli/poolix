import TextField from '@mui/material/TextField';

function LoginAdmin() {
  return (
    <div className="LoginAdmin-section">
      <div className="container max-w-[1320px]">
        <form className='mt-5 flex flex-col items-center justify-center gap-3'>
        <TextField style={{width: 400}} id="outlined-basic" label="Login" variant="outlined" color='success'/>
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          color='success'
          style={{width: 400}}
        />
        </form>
      </div>
    </div>
  )
}
export default LoginAdmin