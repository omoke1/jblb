import AuthLayout from '../AuthLayout/AuthLayout';
import SignUpForm from './SignUpForm';
import { useState } from 'react';

function SignUp() {
  const [_role, setRole] = useState<string>("Vendor")
   return (
    <AuthLayout>
        <div className='flex flex-col gap-2 mb-6 justify-center items-center text-center'>
          {/* <img src={logo} className='size-20' alt='logo'/> */}
          <h1>Join EcoCycle</h1>
          <p>Create your account and start your circular journey towards smarter, greener product use</p>
        </div>
    </AuthLayout>
  );
}

export default SignUp;
