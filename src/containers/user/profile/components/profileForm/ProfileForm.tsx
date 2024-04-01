import { Input } from '@components/index';
import { Box, styled } from '@mui/material';
import { FC, useEffect } from 'react';

const ProfileFormContent = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProfileFormContentField = styled(Box)`
  max-width: 430px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  & input {
    width: 100%;
  }
`;

interface ProfileFormProps {
  register: any;
  errors: any;
  watch: any;
  trigger: any;
}

export const ProfileForm: FC<ProfileFormProps> = ({ register, errors, watch, trigger }) => {
  const passwordValue = watch('password');

  useEffect(() => {
    trigger(['repeat_password']);
  }, [passwordValue, trigger]);

  return (
    <ProfileFormContent>
      <ProfileFormContentField className="form">
        <Input
          label={'Имя'}
          placeholder={'Введите имя'}
          name={'name'}
          type={'text'}
          rules={{
            ...register('name', {
              required: 'Обязательное поле',
              minLength: {
                value: 2,
                message: 'Имя должно содержать минимум 2 символа',
              },
              maxLength: {
                value: 24,
                message: 'Имя должно содержать меньше 24 символов',
              },
              pattern: {
                value: /(.*[а-яА-ЯёЁ].*){2,}|(.*[a-zA-Z].*){2,}/,
                message: 'Имя должно содержать хотя бы 2 буквы',
              },
            }),
          }}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
      </ProfileFormContentField>
      <ProfileFormContentField className="form">
        <Input
          label={'E-mail'}
          placeholder={'E-mail'}
          name={'email'}
          type={'email'}
          rules={{ ...register('email', { required: 'Email is required' }) }}
          error={!!errors.email}
          helperText={errors.email?.message}
          disabled
        />
      </ProfileFormContentField>
      <ProfileFormContentField className="form">
        <Input
          label={'Новый пароль'}
          placeholder={'Введите пароль'}
          type={'text'}
          name={'password'}
          error={!!errors.password}
          helperText={errors.password?.message}
          rules={{
            ...register('password', {
              required: false,
              minLength: {
                value: 8,
                message: 'Пароль должен быть длиннее 8 символов',
              },
              maxLength: {
                value: 64,
                message: 'Пароль должен быть меньше 64 символов',
              },
              pattern: {
                value: /^[A-Za-z0-9~`!@#$%^&*()_\-+={[}\]|:;"'<,>.?/]+$/,
                message: 'Пароль может содержать латинские буквы, цифры и некоторые специальные символы',
              },
            }),
          }}
        />
      </ProfileFormContentField>
      <ProfileFormContentField className="form">
        <Input
          label={'Повторите пароль'}
          placeholder={'Повторите пароль'}
          type={'text'}
          name={'repeat_password'}
          error={!!errors.repeat_password}
          helperText={errors.repeat_password?.message}
          rules={{
            ...register('repeat_password', {
              required: passwordValue ? 'Обязательное поле' : false,
              validate: (value) => value === passwordValue || 'Пароли не совпадают',
            }),
          }}
        />
      </ProfileFormContentField>
    </ProfileFormContent>
  );
};
