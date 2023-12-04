import { Input, Logo } from '@components/index';
// TODO
import {
  AuthFormsBox,
  FormLink,
  FormsFieldsBox,
  FormsFooterBox,
  FormsFooterText,
  FormsHeading,
  FormsSubHeading,
  FormsSubmitButton,
} from '@components/form/styles/common/common';
import { useForm } from 'react-hook-form';
import { defaultValues } from './data';

interface IFormInput {
  email: string;
}

export const ForgotPasswordForm = () => {
  const { handleSubmit, register, formState } = useForm<IFormInput>({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <AuthFormsBox component={'form'} onSubmit={handleSubmit(onSubmit)}>
      <Logo />
      <FormsHeading>Забыл пароль</FormsHeading>
      <FormsSubHeading>
        Введите ваш E-mail, по которому вы регистрировались и мы отправим инструкцию по восстановлению пароля
      </FormsSubHeading>
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
      </FormsFieldsBox>
      <FormsSubmitButton type={'submit'} variant={'contained'}>
        Восстановить пароль
      </FormsSubmitButton>
      <FormsFooterBox>
        <FormsFooterText>Вспомнили пароль?</FormsFooterText>
        <FormLink href={'/'} underline="none">
          Вход
        </FormLink>
      </FormsFooterBox>
    </AuthFormsBox>
  );
};
