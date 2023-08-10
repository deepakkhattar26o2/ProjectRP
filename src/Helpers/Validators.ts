import { SignupRequest , LoginRequest, VerifiedEmailUpdateRequest} from "./TypeDefs";

const SignupRequestValidator = (body: SignupRequest): [boolean, string] => {
    if (!body.name) return [false, " name"];
    if (!body.password || body.password.length < 6) return [false, " password"];
    if (!body.email || !body.email.endsWith("@gmail.com")) return [false, "email"];
    return [true, "success"];
};

const LoginRequestValidator = (body: LoginRequest): [boolean, string] => {
    if (!body.email) return [false, 'email'];
    if (!body.password) return [false, 'password'];
    return [true, 'success']
}

const UpdateVerifiedEmailPasswordValidator = (body : VerifiedEmailUpdateRequest) : [boolean, string] =>{
    if(!body.email){
        return [false, 'email']
    }
    if(!body.password || body.password.length <6){
        return [false, 'password']
    }
    return [true, 'success']
}

export { SignupRequestValidator,UpdateVerifiedEmailPasswordValidator, LoginRequestValidator }