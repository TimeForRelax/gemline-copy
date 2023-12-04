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
import { EndAdornment, Input, InputWithEndAdornment, Logo } from '@components/index';
import { defaultValues } from './data';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

// @ts-ignore
import { ReactComponent as HideIcon } from '@assets/images/common/hide_pass.svg';
// @ts-ignore
import { ReactComponent as ShowIcon } from '@assets/images/common/show_pass.svg';

interface IFormInput {
  name: string;
  reference: string;
  email: string;
  password: string;
  repeat_password: string;
}

export const RegistrationForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((show) => !show);

  const { handleSubmit, register, formState } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <AuthFormsBox component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <FormsHeading>Регистрация</FormsHeading>
      <FormsFieldsBox>
        <Input
          label={'Имя'}
          placeholder={'Введите имя'}
          name={'name'}
          type={'text'}
          rules={{ ...register('name', { required: 'Name is required' }) }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <Input
          label={'Реферальный код'}
          placeholder={'Введите код'}
          name={'reference'}
          type={'text'}
          rules={{ ...register('reference', { required: false }) }}
          error={!!errors.reference}
          helperText={errors.reference?.message}
        />
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
        <InputWithEndAdornment
          label={'Повторите пароль'}
          placeholder={'Повторите пароль'}
          type={showRepeatPassword ? 'text' : 'password'}
          name={'repeat_password'}
          error={!!errors.repeat_password}
          helperText={errors.repeat_password?.message}
          rules={{
            ...register('repeat_password', {
              required: 'RepeatPassword is required',
              pattern: {
                value: /d+/,
                message: 'This input is number only.',
              },
            }),
          }}
          endAdornment={
            <EndAdornment
              state={showRepeatPassword}
              handleClickIcon={handleClickShowRepeatPassword}
              icon1={<HideIcon />}
              icon2={<ShowIcon />}
            />
          }
        />
      </FormsFieldsBox>
      <FormsSubmitButton type={'submit'} variant={'contained'}>
        Зарегистрироваться
      </FormsSubmitButton>
      <FormsFooterBox>
        <FormsFooterText>Уже есть аккаунт?</FormsFooterText>
        <FormLink href={'/'} underline="none">
          Вход
        </FormLink>
      </FormsFooterBox>
    </AuthFormsBox>
  );
};
