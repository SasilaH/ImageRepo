import React from 'react'

const LoginForm = () => {
    return (
        <div>
            <form action="">
                <div class="form-group row mt-3 col-md-12">
                    <label for="inputEmail3" class="col-sm-2 col-form-label">Email</label>
                    <div class="col-sm-10">
                        <input type="email" class="form-control" id="inputEmail3" placeholder="Email" />
                    </div>
                </div>
                <div class="form-group row mt-3 col-md-12">
                    <label for="inputPassword3" class="col-sm-2 col-form-label">Password</label>
                    <div class="col-sm-10">
                        <input type="password" class="form-control" id="inputPassword3" placeholder="Password" />
                    </div>
                </div>
                <div class="form-group row mt-4 col-md-12">
                    <div class="col-sm-10">
                        <button type="submit" class="btn btn-primary">Sign in</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default LoginForm
