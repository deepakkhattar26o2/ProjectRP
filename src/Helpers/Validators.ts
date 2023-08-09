import { SignupRequest , LoginRequest} from "./TypeDefs";

const SignupRequestValidator = (body: SignupRequest): [boolean, string] => {
    if (!body.name) return [false, " name"];
    if (!body.password) return [false, " password"];
    if (!body.email) return [false, "email"];
    return [true, "success"];
};

const LoginRequestValidator = (body: LoginRequest): [boolean, string] => {
    if (!body.email) return [false, 'university email'];
    if (!body.password) return [false, 'password'];
    return [true, 'success']
}


export { SignupRequestValidator, LoginRequestValidator }