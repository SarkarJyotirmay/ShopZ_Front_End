// ! To impliment auto login with token data we can use 2 ways =>
    // ? 1. Use Bcript package to decode token from 
    // ? 2. use api auth => get verified token data => update user state with that 
    // ?                                            => if we have userDetails in state
    // ?                                            => sign up page will never be shown 
    // ?                                            => in protected route we are again using userDetails
