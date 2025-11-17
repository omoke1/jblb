import AuthLayout from '../AuthLayout/AuthLayout';
import SignInForm from './SignInForm';
import { useState } from 'react';

function SignIn() {
  const [role, setRole] = useState<string>("Provider")
   return (
    <AuthLayout>
        <div className='flex flex-col gap-2 mb-6 justify-center items-center text-center'>
          {/* <img src={logo} className='size-20' alt='logo'/> */}
          <h1>Welcome Back</h1>
          <p>Sign in to your EcoCycle account</p>
        </div>
    </AuthLayout>
  );
}

export default SignIn;