// TODO
import { AuthFormsBox, FormsFieldsBox, FormsHeading, FormsSubmitButton } from '@components/form/styles/common/common';
import { EndAdornment, InputWithEndAdornment, Logo } from '@components/index';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { defaultValues } from './data';

// @ts-ignore
import { ReactComponent as HideIcon } from '@assets/images/common/hide_pass.svg';
// @ts-ignore
import { ReactComponent as ShowIcon } from '@assets/images/common/show_pass.svg';

interface IFormInput {
  new_password: string;
  repeat_password: string;
}

export const ResetPasswordForm = () => {
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
      <FormsHeading>Новый пароль</FormsHeading>
      <FormsFieldsBox>
        <InputWithEndAdornment
          label={'Новый пароль'}
          placeholder={'Введите новый пароль'}
          type={showPassword ? 'text' : 'password'}
          name={'new_password'}
          error={!!errors.new_password}
          helperText={errors.new_password?.message}
          rules={{
            ...register('new_password', {
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
              required: 'Password is required',
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
        Сохранить
      </FormsSubmitButton>
    </AuthFormsBox>
  );
};
