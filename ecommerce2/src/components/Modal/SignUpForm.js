


export default function SignUpForm(props) {
    const {changeAuthMode} = props;
    return (

        <>
            <div className='changeAuthFormBtn'>
                <p>Already registered?</p>
                <button onClick={changeAuthMode}>Sign In</button>
            </div>
            <form autoComplete="off">
                <label>
                    Name:
                    <input type="text" name="name" placeholder='username' />
                </label>
                <label>
                    Email:
                    <input type="email" name="email" placeholder='example@email.com' />
                </label>
                <label>
                    Password:
                    <input type="password" placeholder='password' required />
                </label>

                <button className="submitBtn" type="submit">Sign Up</button>
            </form>
        </>



    )
}