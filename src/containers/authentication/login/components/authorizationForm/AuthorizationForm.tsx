// TODO
import {
  AuthFormsBox,
  FormLink,
  FormsFieldsBox,
  FormsFooterBox,
  FormsFooterText,
  FormsHeading,
  FormsSubmitButton,
} from '@components/form/styles/common/common';
import { EndAdornment, Input, InputWithEndAdornment, LinkTo, Logo } from '@components/index';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './data';

// @ts-ignore
import { ReactComponent as HideIcon } from '@assets/images/common/hide_pass.svg';
// @ts-ignore
import { ReactComponent as ShowIcon } from '@assets/images/common/show_pass.svg';

interface IFormInput {
  email: string;
  password: string;
}

export const AuthorizationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const { handleSubmit, register, formState } = useForm<IFormInput>({ defaultValues });
  const { errors } = formState;

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <AuthFormsBox component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <FormsHeading>Вход в систему</FormsHeading>
      <FormsFieldsBox>
        <Input
          label={'E-mail'}
          placeholder={'E-mail'}
          name={'email'}
          type={'email'}
          rules={{ ...register('email', { required: 'Email is required' }) }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <InputWithEndAdornment
          label={'Пароль'}
          placeholder={'Введите пароль'}
          type={showPassword ? 'text' : 'password'}
          name={'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
          rules={{
            ...register('password', {
              required: 'Password is required',
              pattern: {
                value: /d+/,
                message: 'This input is number only.',
              },
            }),
          }}
          endAdornment={
            <EndAdornment
              state={showPassword}
              handleClickIcon={handleClickShowPassword}
              icon1={<HideIcon />}
              icon2={<ShowIcon />}
            />
          }
        />
      </FormsFieldsBox>
      <LinkTo />
      <FormsSubmitButton type={'submit'} variant={'contained'}>
        Войти
      </FormsSubmitButton>
      <FormsFooterBox>
        <FormsFooterText>Нет аккаунта?</FormsFooterText>
        <FormLink href={'/register'} underline="none">
          Регистрация
        </FormLink>
      </FormsFooterBox>
    </AuthFormsBox>
  );
};
